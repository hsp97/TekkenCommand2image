let main = {
    init : function (){
        const _this = this
        let btnExcute = document.getElementById("btnExcute");
        btnExcute.onclick = _this.execute

        const btnLoadRecent = document.getElementById("btnLoadRecent");
        btnLoadRecent.onclick = _this.recent
    } 
    , execute : function (){
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)
    }
    , recent : function (){
        setRecentCommand()
    }

}




main.init();