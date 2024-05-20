function getCommandInput(){
    const commandInput = document.getElementById("commandInput")
    return commandInput.value
}

function setCookie(cookieNum){

    const cookieName = "RecentCommand";
    let content = getCommandInput()    
    content = content.replaceAll("\n","{}")
    let cookieValue = content

    let date = new Date(Date.now() + 86400e3);       
    
    let cookieCotent = cookieName+"="+cookieValue 
                    + "; expires="+ date
                    + "; secure"

    document.cookie=cookieCotent
    console.log(cookieValue,cookieName,cookieCotent)
}


function getCookieValue(){
    let baseCookieName = "RecentCommand"
    let cookieData = document.cookie;

    let cookieList = cookieData.split(";")
    let cookieListNum = cookieList.length
    

    for (var i = 0 ;  i  < cookieListNum ; i ++){
        var cookieListElem = cookieList[i]
        let cookieListRaw = cookieListElem.split("=")
        let cookieName = cookieListRaw[0].trim()
        let cookieValue = cookieListRaw[1].trim()

        if (cookieName == baseCookieName){
            cookieValue = cookieValue.replaceAll("{}","\n")
            console.log(cookieValue)
            return cookieValue
        }
        
    }
    
    return undefined

}

function deleteCookie(){
    document.cookie = "RecentCommand" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setRecentCommand(){
    const recentValue = getCookieValue()
    console.log(recentValue)
    if (recentValue == undefined){
        return
    }
    else{
        const commandInput = document.getElementById("commandInput")
        commandInput.value = recentValue
        console.log(recentValue)
    }

}


