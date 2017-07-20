/**
 * Created by baobaochu on 2017/07/19.
 */
//module

//すぐ執行
(function () {

    //メニューバーのオブジェクト
    //コンストラクター
    var Menubar=function () {
        this.el = document.querySelector("#sidebar ul");
        this.state = "allClosed";//hasOpened
        this.el.addEventListener("click", function (e) {
            //メニューバーのクリックイベントを停止
            e.stopPropagation();
        });

        var self=this;
        this.currentOpenedMenuContent=null;
        this.menuList=document.querySelectorAll("#sidebar ul>li");
        for(var i=0;i<this.menuList.length;i++){
            this.menuList[i].addEventListener("click",function (e) {
                //メニューに対応しているコンテンツを探す
                var menuContentEl=document.getElementById(e.currentTarget.id+"-content");
                //console.log(menuContentEl);
                if(self.state==="allClosed"){
                    console.log("open "+menuContentEl.id);
                    self.state="hasOpened";
                    self.currentOpenedMenuContent=menuContentEl;
                }else if(self.state==="hasOpened"){
                    console.log("close "+self.currentOpenedMenuContent.id);
                    self.state="hasOpened";
                    console.log("opened "+menuContentEl.id);
                    self.currentOpenedMenuContent=menuContentEl;

                }
            });
        }

    };

    //大文字でコンストラクターを定義
    var Sidebar=function (eId,closeBarId) {
        this.state = "opened";
        this.el=document.getElementById(eId||"sidebar");
        this.closeBarEl=document.getElementById(closeBarId||"closeBar");
        var self=this;
        this.menubar=new Menubar();
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



})();