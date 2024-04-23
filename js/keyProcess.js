button2BitTable = {
    "LP" : 8,
    "RP" : 4,
    "LK" : 2,
    "RK" : 1,
    "AP" : 12,
    "AK" : 3,
    "AL" : 10,
    "AR" : 5
}

bit2FileTable = {
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


function processButtonElement(command){
    let buttonList = command.split("+")
    let result = 0
    
    for (const buttonIndex in buttonList){
        const button = buttonList[buttonIndex]
    
        result = result | button2BitTable[button]
    }
    
    
    result = bit2FileTable[result]
    
    return result

}


function getButtonTable(){
    return button2BitTable
}




function init(){

}

function debug_keyProcess(){
    console.log("keyProcess debug START")
    processButtonElement("RK+AL")
    console.log("keyProcess debug END")
}


init()
//debug_keyProcess()