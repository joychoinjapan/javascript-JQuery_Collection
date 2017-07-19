/**
 * Created by baobaochu on 2017/07/19.
 */
//module

//すぐ執行
(function () {
    //大文字でコンストラクターを定義
    var Sidebar=function (eId,closeBarId) {
        this.state = "opened";
        this.el=document.getElementById(eId||"sidebar");
        this.closeBarEl=document.getElementById(closeBarId||"closeBar");
        var self=this;
        this.el.addEventListener("click",function (event) {
            //eventに対応しているobjもしクリックされたのはサイドバー自身じゃなかったら
            if(event.target!==self.el){
                // console.log(self);
                self.triggerSwitch();
            }
        });
        

    };

    //閉じると展開を定義
    Sidebar.prototype.close=function () {
        console.log("閉じる");
        this.state="closed";
        
    };
    Sidebar.prototype.open=function () {
        console.log("展開");
        this.state="opened";
        
    };
    Sidebar.prototype.triggerSwitch=function () {
        if(this.state==="opened") {
            this.close();
        } else if(this.state==="closed"){
            this.open();
        }
    };

    var sidebar=new Sidebar();
    
    
    var Menubar=function () {
        
    }


})();