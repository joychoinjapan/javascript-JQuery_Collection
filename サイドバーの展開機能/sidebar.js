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

                    //コンテンツを隠す状態を設置
                    menuContentEl.style.top="0";
                    menuContentEl.style.left="-165px";
                    //コンテンツのクラスを初期化
                    menuContentEl.className="nav-content";
                    menuContentEl.classList.add("menuContent-move-right");
                    self.state="hasOpened";
                    self.currentOpenedMenuContent=menuContentEl;
                    console.log("open "+menuContentEl.id);
                }else if(self.state==="hasOpened"){

                    //元のコンテンツを隠す

                    self.currentOpenedMenuContent.className="nav-content";
                    self.currentOpenedMenuContent.style.top="0";
                    self.currentOpenedMenuContent.style.left="35px";
                    self.currentOpenedMenuContent.classList.add("menuContent-move-left");
                    console.log("close "+self.currentOpenedMenuContent.id);

                    //新しいコンテンツを展開
                    if(menuContentEl!==self.currentOpenedMenuContent){
                        menuContentEl.className="nav-content";
                        menuContentEl.style.top="0";
                        menuContentEl.style.left="-165px";
                        menuContentEl.classList.add("menuContent-move-right");
                        self.state="hasOpened";
                        self.currentOpenedMenuContent=menuContentEl;
                        console.log("opened "+menuContentEl.id);
                    }else if(menuContentEl===self.currentOpenedMenuContent){
                        self.state="allClosed";
                        console.log("close all");
                    }



                }
            });
        }


        //矢印をクリックすると、コンテンツが閉じる
        this.menuContentList=document.querySelectorAll(".nav-content>div.nav-con-close");
        for(i=0;i<this.menuContentList.length;i++){
            this.menuContentList[i].addEventListener("click",function (e) {
                // コンテンツdivを取得
               var menuContent=e.currentTarget.parentNode;
                menuContent.className="nav-content";
                menuContent.style.top="0";
                menuContent.style.left="35px";
                menuContent.classList.add("menuContent-move-left");
                self.state="allClosed";
                console.log("close "+self.currentOpenedMenuContent.id);

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


        //サイドバーとコンテンツを全部閉じる
        if(menubar.status="hasOpened"){
            menubar.currentOpenedMenuContent.className="nav-content";
            menubar.currentOpenedMenuContent.style.top="0";
            menubar.currentOpenedMenuContent.style.left="35px";
            menubar.currentOpenedMenuContent.classList.add("menuContent-move-left");
            console.log("close "+menubar.currentOpenedMenuContent.id);
            menubar.state="allClosed";
            console.log("close all");

        }
        console.log("閉じる");
        this.el.className="sidebar-move-left";
        this.closeBarEl.className="closeBar-move-right";
        this.state="closed";
    };
    Sidebar.prototype.open=function () {
        console.log("展開");
        this.el.style.left="-120px";
        this.closeBarEl.style.left="160px";
        this.el.className="sidebar-move-right";
        this.closeBarEl.className="openBar-move-left";
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
    var menubar=new Menubar();



})();