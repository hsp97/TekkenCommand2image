//import  html2canvas  from './html2canvas.min1.4.1.js';


let table = {
    LP:"images/c2.png",
    RP:"images/c3.png",
    LK:"images/c5.png",
    RK:"images/c9.png",
    AP:"images/c4.png",
    AK:"images/c13.png",
    AL:"images/c6.png",
    AR:"images/c11.png",
    'LP+RK':"images/c10.png",
    'RK+LP':"images/c10.png",
    'RP+LK':"images/c7.png",
    'LK+RP':"images/c7.png",
    'LP+AK':"images/c14.png",
    'AK+LP':"images/c14.png",
    'AL+RK':"images/c14.png",
    'RK+AL':"images/c14.png",
    'RP+AK':"images/c15.png",
    'AK+RP':"images/c15.png",
    'LK+AR':"images/c15.png",
    'AR+LK':"images/c15.png",
    'AP+LK':"images/c8.png",
    'LK+AP':"images/c8.png",
    'AL+RP':"images/c8.png",
    'RP+AL':"images/c8.png",
    'AP+RK':"images/c12.png",
    'RK+AP':"images/c12.png",
    'AR+LP':"images/c12.png",
    'LP+AR':"images/c12.png",
    'ALL':"images/c16.png",
    1:"images/w1.png",
    2:"images/w2.png",
    3:"images/w3.png",
    4:"images/w4.png",
    N:"images/w5.png",
    5:"images/w5.png",
    6:"images/w6.png",
    7:"images/w7.png",
    8:"images/w8.png",
    9:"images/w9.png",
}

function addResultElement(resultNum,title){
    let resultId= 'result'+ String(resultNum);
    let resultList = document.getElementById('resultList');


    let resultElement = document.createElement('div');
    resultElement.className = "my-4"
    
    let label = document.createElement('div')
    label.className = "h3 border border border-3 border-dark "
    label.style="text-align:center; background-color: white; "
    label.innerHTML = resultNum + ".  "+ title
    resultElement.appendChild(label)

    let resultContentCotainer = document.createElement('div')
    resultContentCotainer.className = "my-2"

    let resultContent = document.createElement('span')
    resultContent.id = resultId
    resultContent.className="py-3 "
    

    resultContentCotainer.appendChild(resultContent)

    resultElement.appendChild(resultContentCotainer)

    let downloadButton = document.createElement('button')
    downloadButton.className= "btn btn-success"
    downloadButton.innerText = "다운로드"
    
    let downloadFunction = function(){
        console.log("ONCLICK")


        html2canvas(document.getElementById(resultId),
            {
                allowTaint: true,
                logging: true,
                useCORS:true,
                backgroundColor:null,
            })
            .then(canvas => {

                let image = canvas.toDataURL("image/png");
                image.crossOrigin = 'anonymous';

                const link = document.createElement("a");
                link.href = image;
                link.download = "paintJS.png";
                link.click();
          
        });
    }
    downloadButton.onclick = downloadFunction
    resultElement.appendChild(downloadButton)

    resultList.appendChild(resultElement)
    return [resultId, downloadFunction]
}   

function addOneImage(resultId, command){
    let result = document.getElementById(resultId);
    let child = undefined

    if (command in table){
        child = document.createElement('img');
        child.crossorigin='anonymous'
        child.src= table[command]
    }
    else if (command == "T"){
        child = document.createElement('span');
        child.className = "misc_button"
        child.innerText = '토네이도'
    }
    else if (command == '▶'){
        child = document.createElement('span');
        child.className = "mx-2 h5"
        child.innerText = '▶'
    }
    else{
        child = document.createElement('span');
        child.className = "misc_button"
        child.innerText = command
        child.disabled = true
        
    }

    result.appendChild(child)
}

function clearImage(){
    let result = document.getElementById("result");

    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

function clearAllImage(){
    let resultList = document.getElementById("resultList");

    while (resultList.firstChild) {
        resultList.removeChild(resultList.firstChild);
    }
}

function processCommandLine(commandLine){
    
    commandInputContent = commandLine
    console.log(commandInputContent)
    let commandElementList = []
    const len = commandInputContent.length
    
    let doneIndex = -1
    let recentElement = undefined
    let notSymbolList = []
    for (let i = 0 ; i < len; i++){
        if (i > doneIndex){
            let cur = commandInputContent[i]
        // cur is number 12346789
            //구분자 예외 처리
            if( ['1','2','3','4','6','7','8','9'].includes(cur) ){
                if (notSymbolList.length > 0){
                    const notSymbolWord = notSymbolList.join("")
                    console.log(notSymbolWord)
                    commandElementList.push(notSymbolWord)
                    notSymbolList = []
                }
                commandElementList.push(cur)
                doneIndex = i    
                recentElement = cur
                
            }
            else{
                // N은 중립 따라서 그냥 처리
                if (['N','T'].includes(cur)){
                    //alert("N")
                    commandElementList.push(cur)
                    recentElement = cur
                    
                    doneIndex = i
                }
                else if (['-',' '].includes(cur)){
                    // 구분자리스트 일단 -만 넣었음. 공백이 숫자로 걸렸는데 그냥 리스트 만들어서 해결
                    let isflush = false
                    if (notSymbolList.length > 0){
                            const notSymbolWord = notSymbolList.join("")
                            console.log(notSymbolWord)
                            commandElementList.push(notSymbolWord)
                            notSymbolList = []
                            isflush = true
                    }                       
                    if (isflush == true || recentElement != "▶"){
                        
                        commandElementList.push("▶")
                        recentElement = "▶"
                    }
                    else{}
                    
                    doneIndex = i
                }
                else{
                    while (1){
                        //alert("else")
                        if (i + 5 <= len){
                            
                            const temp = commandInputContent.substr(i,5)
                            //console.log(temp)
                            if (temp in table) {
                                if (notSymbolList.length > 0){
                                    const notSymbolWord = notSymbolList.join("")
                                    console.log(notSymbolWord)
                                    commandElementList.push(notSymbolWord)
                                    notSymbolList = []
                                }
                                doneIndex = i + 4
                                commandElementList.push(temp)
                                recentElement = temp
                                break
                            }
                            else{}
                        }
                        if (i + 3 <= len){
                            
                            const temp = commandInputContent.substr(i,3)
                            //console.log(temp)
                            if (temp in table) {
                                if (notSymbolList.length > 0){
                                    const notSymbolWord = notSymbolList.join("")
                                    console.log(notSymbolWord)
                                    commandElementList.push(notSymbolWord)
                                    notSymbolList = []
                                }
                                doneIndex = i + 2
                                commandElementList.push(temp)
                                recentElement = temp
                                break
                            }
                            else{}
                        }
                        if (i+ 2 <= len){
                            
                            const temp = commandInputContent.substr(i,2)
                            //console.log(temp)
                            if (temp in table) {
                                if (notSymbolList.length > 0){
                                    const notSymbolWord = notSymbolList.join("")
                                    console.log(notSymbolWord)
                                    commandElementList.push(notSymbolWord)
                                    notSymbolList = []
                                }
                                doneIndex = i + 1
                                commandElementList.push(temp)
                                recentElement = temp
                                break
                            }
                            else{}
                        }
                        else{
                            ;//console.log(i,cur)
                        }
                        
                        notSymbolList.push(cur)
                        doneIndex = i
                        console.log("NOTSYMBOLIST",notSymbolList, commandElementList)
                        break
                    }   
                }
            }            
            
        }
        else{

        }                
    }
    console.log(commandElementList)
    if (notSymbolList.length > 0){
        const notSymbolWord = notSymbolList.join("")
        console.log(notSymbolWord)
        commandElementList.push(notSymbolWord)
        notSymbolList = []
    }
    return commandElementList
}

function processCommandPara(){
    let commandInputContent = commandInput.value
    commandInputContent = commandInputContent.toUpperCase();
    
    let commandLineList = commandInputContent.split('\n')
    return commandLineList
}

function drawAllImage(){
    clearAllImage()
    const resultList = processCommandPara()
    const len = resultList.length
    let downloadFuncList = []

    let resultIndex = 1 
    for (let i = 0; i < len; i ++){
        let curCommandLine = resultList[i]
        if (resultList[i].length > 0 ){
            
            let [curResultId,curDownloadFunc] = addResultElement(i,curCommandLine)
            console.log(resultList[i], resultList[i].length)
            drawImage(curResultId, curCommandLine)
            downloadFuncList.push(curDownloadFunc)
        }
        else{}
    }

    let downloadAllBtn = document.getElementById('downloadAll');
    downloadAllBtn.onclick = function(){
        const len = downloadFuncList.length
        for (let i = 0 ; i < len; i++){
            downloadFuncList[i]();
        }
    }
}


function drawImage(curResultId, curCommandLine){
    
    const result = processCommandLine(curCommandLine)

    const len = result.length
    for (let i = 0; i < len; i ++){
        addOneImage(curResultId,result[i])
    }
}