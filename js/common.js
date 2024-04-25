/**
 * console.log 하기 귀찮아서 만든 log용 함수
 * console.log를 사용하고 있어서 강제 개행 되는건 슬픈 포인트
 */



function print(a,b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,w,x,y,z){
    
    for (let i = 0 ; i < 9 ; i++){
        if (arguments[i] != undefined){
            console.log(arguments[i])
        }
        else{
            break
        }
    }

}

function printa(a){
    print("===============",a,"===============")
}
