
const ElemType = getElemType()

const arrowTable = getArrowTable()

const buttonTable = getButton2BitTable()

const symbolTable = getSymbolTable()


/**
 * comment :plainTextList가 있을 경우 join 하여 문자열로 만든 후 합치고, 
 *          빈 plainTextList를 반환함.
 *          따라서 해당 함수 쓸 때는 호출하는 곳에서 다음과 같이 사용해야함.
 *          plainTextList = pushPlainTextList(plainTextList , wordResult)
 * @param {*} para 
 * @returns 
 */

function pushPlainTextList(plainTextList , wordResult){
    if (plainTextList.length > 0 ){
        let target= plainTextList.join("")
        target = target.trim()
        wordResult.push([target,ElemType.PLAIN])
    }

    console.log("pushPlainText:",plainTextList, wordResult)
    return []
    
}


/**
 * 홈페이지에서 가져온 커맨드를 전부 대문자로 올리고 개행으로 나누어 리스트로 반환
 * @param {*} para 
 * @returns 
 */
function prepareCommandpara(para){
    let commandInputContent = para
    commandInputContent = commandInputContent.toUpperCase();

    let commandLineList = commandInputContent.split('\n')
    return commandLineList
}


/**
 * word를 처리하여 반환함.
 * @param {*} word 
 * @returns 
 */
function processWord (word){
    word = word.trim()

    let wordLen = word.length
    let wordResult = []

    let i = 0
    let plainTextList = []

    while(i < wordLen){

        if (word[i] in arrowTable){ //word.slice(i,i+1)
            plainTextList = pushPlainTextList(plainTextList,wordResult)
            
            wordResult.push([arrowTable[word[i]],ElemType.FILE])
            i += 1
        }
        else if (word[i] in symbolTable){    
            plainTextList = pushPlainTextList(plainTextList,wordResult)

            wordResult.push([word[i],ElemType.SYMBOL])
            i += 1
        }
        else if (word.slice(i,i+2) in buttonTable){
            plainTextList = pushPlainTextList(plainTextList,wordResult)

            buttons = word.slice(i,i+2).split("")
            i += 2

            while (i < wordLen){
            
                if (word[i] == "+"){
                    buttons.push(word[i])
                    i += 1
                    buttons = buttons.concat(word.slice(i,i+2).split(""))
                    i += 2
                }
                else{
                    break
                }
            }

            curButton = buttons.join("")
            savetarget = processButtonElement(curButton)
            wordResult.push([savetarget,ElemType.FILE])
            
        }
        else if (word[i] == " "){
            if (word[i-1] != " "){
                if (plainTextList.length > 0 ){
                    plainTextList.push(word[i])
                }
                else{
                    ;//wordResult.push([word[i],ElemType.BLANK])
                }
                
            }
            else{;}
            i += 1
        }
        else{ 
            plainTextList.push(word[i])
            i += 1
        }
    }

    //plainTextList = pushPlainTextList(plainTextList,wordResult)
    return wordResult
}


/**
 * 
 * @param {*} line 
 */
function processCommandLine(line){
    
    wordList = line.split('-')
    let lineResult = []

    let isFirst = true
    for (const wordIndex in wordList){
        const word = wordList[wordIndex]
        
        if (isFirst == true){
            isFirst = false
        }
        else{
            lineResult.push([["▶",ElemType.SYMBOL]])
        }
        lineResult.push(processWord(word))
    }
    
    return lineResult;
}

/**
 * 코맨트 : 최종적으로 외부에선 얘 하나 호출하면 처리된 결과값을 받을 수 있음.
 * @returns list of [처리된 라인값, 원본]
 */
function processCommandPara(){
    const commandInput = document.getElementById("commandInput")
    let commandInputContent = commandInput.value    

    if (commandInputContent.trim() != ""){
        setCookie(commandInputContent)
    }

    let commandLineList = prepareCommandpara(commandInputContent)
    
    let resultList = []
    for (const commandLineIndex in commandLineList){
        const commandLine = commandLineList[commandLineIndex]
        if (commandLine != ""){
            let lineResult = processCommandLine(commandLine) 
            resultList.push([lineResult,commandLine])
        }
    }

    return resultList;
}


function init(){
    
}

function keyProcessTest(){
    if (isDebug() == false ){return}
    
    console.log("commandProcess START")

    answer= [
        [
            "부보",
            "plain"
        ],
        [
            "images/w2.png",
            "file"
        ],
        [
            "images/w3.png",
            "file"
        ],
        [
            "images/w6.png",
            "file"
        ],
        [
            "[",
            "symbol"
        ],
        [
            "lkrk",
            "plain"
        ],
        [
            "]",
            "symbol"
        ]
    ]
    result = processWord("부보   236[lkrk]")
    testProcessWordResult = true
    while (true){
        if (answer.length != result.length){
            testProcessWordResult = false;
            break
        }

        for (var i  = 0 ; i < answer.length ; i ++){
            if (!(answer[i][0] == result[i][0] && answer[i][1] == result[i][1])){
                testProcessWordResult = false
                break
            }
        }

        break
    }

    if (testProcessWordResult == false){
        print("Process Word function has something wrong")
    }


    console.log("commandProcess End")

}

init()
//keyProcessTest()
