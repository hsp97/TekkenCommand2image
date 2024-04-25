
const elemType = {
    FILE: "file" ,
    SYMBOL: "symbol",
    BLANK: "blank" ,
    PLAIN: "plain"
}


const arrowTable = {
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

const buttonTable = getButtonTable()

const symbolList = {}

function initSymbolTable (symbols){

    for (const symbol in symbols){
        symbolList[symbol] =  symbol
    }

}


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
        wordResult.push([target,elemType.PLAIN])
    }

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
            
            wordResult.push([arrowTable[word[i]],elemType.FILE])
            i += 1
        }
        else if (word[i] in symbolList){
            plainTextList = pushPlainTextList(plainTextList,wordResult)

            wordResult.push([word[i],elemType.SYMBOL])

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
            wordResult.push([savetarget,elemType.FILE])

        }
        else if (word[i] == " "){
            if (word[i-1] != " "){
                if (plainTextList.length > 0 ){
                    plainTextList.push(word[i])
                }
                else{
                    wordResult.push([word[i],elemType.BLANK])
                }
                i += 1
            }
            else{;}
        }
        else{ 
            plainTextList.push(word[i])
            i += 1

        }
    }


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
            lineResult.push(["▶"])
        }
        lineResult.push(processWord(word))
    }
    
    return lineResult;
}

/**
 * 코맨트 : 최종적으로 외부에선 얘 하나 호출하면 처리된 결과값을 받을 수 있음.
 * @returns 
 */
function processCommandPara(){
    let commandInputContent = commandInput.value
    
    let commandLineList = prepareCommandpara(commandInputContent)
    let resultList = []
    for (const commandLineIndex in commandLineList){
        const commandLine = commandLineList[commandLineIndex]
        let lineResult = processCommandLine(commandLine) 
        print(lineResult)
        resultList.push(lineResult)
    }

    return resultList;
}


function init(){
    
    initSymbolTable(['[',']','~','N','T'])
}

function keyProcessTest(){
    console.log("commandProcess START")

    print(processWord("달려가서 부보 RP"))
    //print(processCommandLine("금계 LP2 - 부보 RP"))
    console.log("commandProcess End")

}

init()
keyProcessTest()
