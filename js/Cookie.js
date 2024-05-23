const COOKIE_NAME = "RecentCommand"
const MAX_COOKIE_NUM = 10

function getCommandInput(){
    const commandInput = document.getElementById("commandInput")
    return commandInput.value
}

function setCommandInput(contents){
    const commandInput = document.getElementById("commandInput")
    contents = contents.replaceAll("<br>","\n")    
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
    let result = []
    let oldestName = undefined
    let lastestNum = 0
    let count = 0

    if (cookieOrigin != ""){

        let cookieList = cookieOrigin.split(";")

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
                count += 1
                lastestNum= cookieNum
            }
            else{;}        
        }

        //print(result)
    }

    return [result,oldestName,lastestNum,count]


}
function getNextCookieNumber(num){
    return (num + 1) % MAX_COOKIE_NUM
}

function setCookie(cookieValue){

    cookieValue = cookieValue.replaceAll("\n","<br>")

    //[result,oldestName,lastestNum,count]
    let cookieListInfo = getCookieList();
    let cookieList = cookieListInfo[0]
    let oldestName = cookieListInfo[1]
    let lastestNum = cookieListInfo[2]
    let count = cookieListInfo[3]
    let nextCookieName ;

    if ( count == MAX_COOKIE_NUM){
        nextCookieName = oldestName
    }
    else if (count == 0){
        nextCookieName = COOKIE_NAME + "_0"
    }
    else{
        nextCookieName = COOKIE_NAME+"_"+String(getNextCookieNumber(lastestNum))
    }

    //let nextCookieName = COOKIE_NAME+"_"+String(getNextCookieNumber(cookieListInfo[2]))

    createCookie(nextCookieName,cookieValue)
}


function setRecentCommand(){
    // [result,oldestName,lastestNum]
    const cookieListInfo = getCookieList()
    let cookieList = cookieListInfo[0]
    let oldestName = cookieListInfo[1]
    let lastestNum = cookieListInfo[2]
    let count = cookieListInfo[3]

    
    if (count > 0){
        setCommandInput(cookieList[0][2])
    }
    else{;}

}

function setRecentCommandByNum(Num){
    // [result,oldestName,lastestNum]
    const cookieList= getCookieList()[0]

    for (let i = 0 ; i < cookieList.length ; i++){
        // [name, number, value] 
        const cookie = cookieList[i]
        const cookieNum = cookie[1]
        let cookieValue = cookie[2]
        if (cookieNum == Num){
            
            setCommandInput(cookieValue)
            return
        }
    }
}





function setRecentCommandHistory(){
    // [result,oldestName,lastestNum]

    const cookieListInfo = getCookieList()
    let cookieList = cookieListInfo[0]
    let oldestName = cookieListInfo[1]
    let lastestNum = cookieListInfo[2]
    let count = cookieListInfo[3]

    const commandHistoryList = document.getElementById("commandHistoryList");
    //const commandHistoryList = document.getElementById("offcanvasHistory");
    print(commandHistoryList.childNodes)
    commandHistoryList.innerHTML = "";

    if (count == 0){
        let tempBtn = document.createElement("button")
        tempBtn.type= "button"
        tempBtn.className = "list-group-item list-group-item-action"
        tempBtn.innerHTML = "최근 작성한 커맨드 목록이 없습니다."
        tempBtn.disabled = true;
        commandHistoryList.appendChild(tempBtn)
    }
    else{
        let rowNum = 1
        for (let i = cookieList.length -1 ; i >= 0  ; i--){
            // [name, number, value] 
            const cookie = cookieList[i]
            let cookieValue = cookie[2]

            let historyRow = document.createElement("div")
            historyRow.className= "d-flex flex-row mb-3"

            let numberLabel = document.createElement("button")
            numberLabel.type= "button"
            numberLabel.className = "btn btn-primary me-2"
            numberLabel.innerHTML = rowNum
            numberLabel.onclick = function(){ setCommandInput(cookieValue)}
            historyRow.appendChild(numberLabel)
            //<button type="button" class="list-group-item list-group-item-action">A second button item</button>
            let tempBtn = document.createElement("button")
            tempBtn.type= "button"
            tempBtn.className = "list-group-item list-group-item-action"
            tempBtn.innerHTML = cookieValue
            tempBtn.onclick = function(){ setCommandInput(cookieValue)}
            historyRow.appendChild(tempBtn)
            commandHistoryList.appendChild(historyRow)
            rowNum += 1
        }

    }

    
}


