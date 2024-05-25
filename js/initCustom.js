let customs = {
    keysPressed: {}, // 동시키입력체크

    init : function (){
        const _this = this;
        const commandBox = document.getElementById("commandInput");
        commandBox.addEventListener("keydown", _this.commandKeyPress.bind(_this));
        commandBox.addEventListener("keyup", _this.commandKeyUp.bind(_this));
        commandBox.addEventListener("compositionend", _this.commandKorText.bind(_this));
    } 
    
    , commandKeyPress : function(event) {

        if(liveBtnCheck){
            console.log(event.key)

            this.keysPressed[event.key] = true; 
    
            if (this.keysPressed['Shift'] && this.keysPressed['a']) {
                console.log('Shift와 A가 동시에 눌렸습니다!');
            }
    
            if (this.keysPressed['a'] && this.keysPressed['b']) {
                console.log('a와 b가 동시에 눌렸습니다!');
            }
            
            if(event.key === 'Process'){
                console.log("한글입력");
            }
        }
        
    }

    , commandKeyUp : function(event) {
        if(liveBtnCheck){
            delete this.keysPressed[event.key];
        }
        
    }

    , commandKorText(event) {
        // 한글 입력이 완료될 때 실행할 코드를 작성
        if(liveBtnCheck){
            console.log("Completed input: ", event.data);
        }
        
    }
}

// 초기화 호출
customs.init();