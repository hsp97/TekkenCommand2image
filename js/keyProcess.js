const button2BitTable = getButton2BitTable()


const bit2FileTable = getBit2FileTable()


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




