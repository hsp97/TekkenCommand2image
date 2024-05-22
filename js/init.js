let main = {
    init : function (){
        const _this = this
        let btnExcute = document.getElementById("btnExcute");
        btnExcute.onclick = _this.execute


        const offcanvasHistory = document.getElementById("offcanvasHistory");
        offcanvasHistory.addEventListener("show.bs.offcanvas", function (){
            setRecentCommandHistory()
        })
    } 
    , execute : function (){
        const commandParaResult = processCommandPara();
        executeDraw(commandParaResult)
    }
    , recent : function (){
        
        setRecentCommand()
    }
    , commandHistory : function (){
        //setRecentCommandHistory()
    }

}




main.init();