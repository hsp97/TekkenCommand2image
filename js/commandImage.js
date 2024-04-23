//import  html2canvas  from './html2canvas.min1.4.1.js';


let keywordTable = {
    "벽꽝": 2,
    "히트버스트 캔슬":8,
    "히트버스트":5,
    "히트 버스트":6,
    "월바운드":4,
    "월 바운드":5,
    "월블래스트":5,
    "월 블래스트":6,
    "월블레스트":5,
    "월 블레스트":6,
    "레아":2,
    "레이지 아츠": 6,
    "레이지아츠":5,
    "히트스매시":5,
    "히트 스매시":6,
    "바운드":3,
    "히트 인게이저":7,
    "히트인게이저":6,
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
    //resultContent.className="py-3"
    resultContent.style="padding-top:13px;padding-bottom:18px"
    

    resultContentCotainer.appendChild(resultContent)

    resultElement.appendChild(resultContentCotainer)

    let downloadButton = document.createElement('button')
    downloadButton.className= "btn btn-success"
    downloadButton.innerText = "다운로드"
    
    let downloadFunction = function(){

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
                link.download = "tekkenCommandImage.png";
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
    else if ('▶'== command){
        child = document.createElement('span');
        child.className = "mx-2 h5"
        child.style="color:black"
        child.innerText = command
    }
    else if (['[',']','~'].includes(command)){
        child = document.createElement('span');
        child.className = "h2 mx-1"
        child.style="color:black"
        child.innerText = command
    }
    else{
        child = document.createElement('span');
        child.className = "misc_button"
        child.innerText = command
        child.disabled = true
        
    }

    result.appendChild(child)
}


function clearAllImage(){
    let resultList = document.getElementById("resultList");

    while (resultList.firstChild) {
        resultList.removeChild(resultList.firstChild);
    }
}

function checkKeywordTable(i,len,commandInputContent , notSymbolList,commandElementList ){

    for (let key in keywordTable){
        let wordLen = keywordTable[key]
        if (i + wordLen <= len){
            const temp = commandInputContent.substr(i,wordLen)

            if (temp in  keywordTable){
                if (notSymbolList.length > 0){
                    const notSymbolWord = notSymbolList.join("")
                    console.log(notSymbolWord)
                    commandElementList.push(notSymbolWord)
                    notSymbolList = []
                }
                doneIndex = i + wordLen -1
                commandElementList.push(temp)
                recentElement = temp
                return [true, doneIndex,recentElement]
            }
            else{}

        }
        else{}
    }

    return [false,undefined,undefined]
}




function drawAllImage(){
    clearAllImage()
    const resultList = processCommandPara()
    print("=====",resultList,"========")
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