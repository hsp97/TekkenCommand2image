let main = {
    init : function (){
        const _this = this
        let btnExcute = document.getElementById("btnExcute");
        btnExcute.onclick = _this.execute
    } 
    , execute : function (){
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)
    }

}




main.init();