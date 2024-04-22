let _commandTable = {
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

const buttonTable = {
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

const symbolList = {}

function initSymbolTable (symbols){

    for (const symbol in symbols){
        symbolList[symbol] =  symbol
    }

}




function getCommandTable(){
    return _commandTable;
}

/**
 * comment : 입력값을 읽어서 전부 대문자로 만들고 개행으로 분리함.
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
 * 
 * @param {*} line 
 */
function processCommandLine2(line){
    wordList = line.split('-')
    let lineResult = []

    let isFirst = true
    for (const word in wordList){
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

function processWord(word){
    word = word.trim()

    let wordLen = word.length
    let wordResult = []

    let i = 0
    while (i < wordLen){
        const cur = word[i]

        if (cur in arrowTable){            
            wordResult.push(arrowTable[cur])
            i += 1
        }
        else if (cur in symbolList){
            wordResult.push(symbolList[cur])
            i += 1
        }
        else{
            while (true){
                let targetLen = 5 + 1
                let wordSliced = word.slice(i,targetLen)
                if (i + targetLen <= wordLen && wordSliced in buttonTable){
                    wordResult.push(buttonTable[wordSliced])
                    i += targetLen
                    break
                }

                targetLen = 3 + 1
                wordSliced = word.slice(i,targetLen)
                if (i + targetLen <= wordLen && wordSliced in buttonTable){
                    wordResult.push(buttonTable[wordSliced])
                    i += targetLen
                    break
                }

                targetLen = 2 + 1
                wordSliced = word.slice(i,targetLen)
                console.log("Result : " , wordSliced)
                if (i + targetLen <= wordLen && wordSliced in buttonTable){
                    wordResult.push(buttonTable[wordSliced])
                    i += targetLen
                    
                    break
                }

                if (cur == " " && wordResult[wordResult.length-1] == " "){
                    
                }
                else{
                    wordResult.push(cur)
                }
                
                i += 1
                break
            }
        }

    }

    return wordResult;
    

}


function processCommandPara2(para){
    let commandInputContent = commandInput.value
    
    let commandLineList = prepareCommandpara(commandInputContent)
    let resultList = []
    for (const commandLine in commandLineList){
        resultList.push(processCommandLine2(commandLine))
    }

    return resultList;
}


function init(){
    initSymbolTable(['[',']','~','N','T'])
}

function keyProcessTest(){
    console.log("keyProcessTEST START")

    console.log(processWord("부보          6rk"))
    console.log("keyProcessTEST End")
}

init()
keyProcessTest()
