const COOKIE_NAME = "RecentCommand"
const MAX_COOKIE_NUM = 7

function getCommandInput(){
    const commandInput = document.getElementById("commandInput")
    return commandInput.value
}

function setCommandInput(contents){
    const commandInput = document.getElementById("commandInput")
    commandInput.value = contents;

}

const COOKIE_OPTION = {
    "expires" : 86400e3+Date.now(),
    "secure" : true,
    "SameSite" : "Strict",
    "path" : "/"
}


function mapNameValue(name,value){
    return name + "="+value
}
function createCookie(name,value){
    let cookieCotent = mapNameValue(name,value)
        +"; expires=" + new Date(COOKIE_OPTION.expires)
        +"; secure"
        +"; path=" + COOKIE_OPTION.path
        +"; Samesite=" + COOKIE_OPTION.SameSite
        +";"

    //print(cookieCotent)
    document.cookie = cookieCotent 
}

/**
 * 
 * @returns [result,oldestName,lastestNum,cookieCount]
 * result는 오리지날 쿠키 리스트, 
 * olderst 는 가장 오래된 쿠키 이름
 * lastestNum은 가장 최근 쿠키의 넘버링
 * cookiecount는 저장된 쿠키 개수
 */
function getCookieList(){
    let cookieOrigin = document.cookie
    let cookieList = cookieOrigin.split(";")
    let result = []
    
    let oldestName = undefined
    let lastestNum = 0
    
    for (let i = 0 ; i < cookieList.length ; i++){
        const entry = cookieList[i].split("=")
        const name = entry[0].trim()
        const value = entry[1].trim()

        if (name.indexOf(COOKIE_NAME) != -1){
            if (oldestName == undefined){
                oldestName = name
            }
            //print(name, value)
            let cookieNum =Number(name.split("_")[1])
            result.push([name,cookieNum,value])

            lastestNum= cookieNum
        }
        else{;}        
    }

    print(result)

    return [result,oldestName,lastestNum]

}
function getNextCookieNumber(num){
    return (num + 1) % MAX_COOKIE_NUM
}

function setCookie(cookieValue){

 
    cookieValue = cookieValue.replaceAll("\n","{}")

    // [result,oldestName,lastestNum]
    let cookieListInfo = getCookieList();
    let nextCookieName = COOKIE_NAME+"_"+String(getNextCookieNumber(cookieListInfo[2]))

    createCookie(nextCookieName,cookieValue)
}


function setRecentCommand(){
    // [result,oldestName,lastestNum]
    const cookieList= getCookieList()[0]
    
    if (cookieList.length > 0){
        setCommandInput(cookieList[0][2])
    }

}

function setRecentCommandByNum(Num){
    // [result,oldestName,lastestNum]
    const cookieList= getCookieList()[0]

    for (let i = 0 ; i < cookieList.length ; i++){
        // [name, number, value] 
        const cookie = cookieList[i]
        const cookieNum = cookie[1]
        const cookieValue = cookie[2]
        if (cookieNum == Num){
            setCommandInput(cookieValue)
            return
        }
    }
}





function setRecentCommandHistory(){
    // [result,oldestName,lastestNum]
    const cookieList= getCookieList()[0]
    const commandHistoryList = document.getElementById("commandHistoryList");
    //const commandHistoryList = document.getElementById("offcanvasHistory");
    print(commandHistoryList.childNodes)
    commandHistoryList.innerHTML = "";
    
    for (let i = 0 ; i < cookieList.length ; i++){
        // [name, number, value] 
        const cookie = cookieList[i]
        const cookieValue = cookie[2]
        //<button type="button" class="list-group-item list-group-item-action">A second button item</button>
        let tempBtn = document.createElement("button")
        tempBtn.type= "button"
        tempBtn.className = "list-group-item list-group-item-action"
        tempBtn.innerHTML = cookieValue
        tempBtn.onclick = function(){ setCommandInput(cookieValue)}
        
        commandHistoryList.appendChild(tempBtn)

        print("Call history function : ", cookie)
        
    }

}


