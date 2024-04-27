/**
 * @see 방향키 이미지 주소가 담긴 테이블
 * @see commandProcess.js에서 사용
 */
const _arrowTable = {
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

/**
 * CommandProcess.js
 * @returns Object of 방향키 - 방향키 이미지 주소
 */
function getArrowTable(){
    return _arrowTable;
}


/**
 * @see LPRPLKRK를 비트에 매핑함.
 * @see keyProcess.js에서 사용
 */
const _button2BitTable = {
    "LP" : 8,
    "RP" : 4,
    "LK" : 2,
    "RK" : 1,
    "AP" : 12,
    "AK" : 3,
    "AL" : 10,
    "AR" : 5
}

function getButton2BitTable () {
    return _button2BitTable
}


/**
 * @see 커맨드 워드의 원소들의 ENUM TYPE
 */
const _ElemType = {
    FILE: "file" ,
    SYMBOL: "symbol",
    BLANK: "blank" ,
    PLAIN: "plain"
}
function getElemType(){
    return _ElemType
}

/**
 * @see keyProcess.js에서 사용
 * @see 비트값을 커맨드 이미지로 변환하는 테이블
 */
const _bit2FileTable = {
    8 : "images/c2.png", // 1000
    4 : "images/c3.png", // 0100
    2 : "images/c5.png", // 0010
    1 : "images/c9.png", // 0001
    12: "images/c4.png", // 1100
    3 : "images/c13.png",// 0011
    10: "images/c6.png", // 1010
    5 : "images/c11.png",// 0101
    6 : "images/c7.png", // 0110
    7 : "images/c15.png",// 0111
    9 : "images/c10.png",// 1001
    11: "images/c14.png",// 1011
    13: "images/c12.png",// 1101
    14: "images/c8.png", // 1110
    15: "images/c16.png",// 1111
}

function getBit2FileTable(){
    return _bit2FileTable
}



let _symbolTable = {}

/**
 * @see 별다른 처리 없이 그대로 내보낼 symbol값을 삽입
 * @see 구현상 ▶는 해당 리스트에서 찾지는 않지만 symbol이므로 넣음. 
 */
const _symbolList = ['[',']','~','▶']


/**
 * @see 추후 symbol 이 추가될 경우를 대비하여 업데이트 해줌.
 */
function initSymbolTable (symbols){

    for (const symbolIndex in symbols){
        const symbol = symbols[symbolIndex]
        _symbolTable[symbol] =  symbol
    }

}
initSymbolTable(_symbolList)

function getSymbolTable(){
    print(_symbolTable)
    return _symbolTable
}

