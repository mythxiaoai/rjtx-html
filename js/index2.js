(function(){
/**
   * tabs
   * 1.支持多页面切换
   * 2.横向滚动条
   * 3.左右Tabs点击滚动居中
   * 4.支持右键
   * 5.支持自适应
   * 6.刷新子页面 F5同样有效
   * */
  var tabs={
   /* menus:"#js_menuBox",//所有菜单项盒子
    menu:".js_menu",//所有菜单项*/
    navs:$("#js_nav"),//tabs
    navl:$("#js_navl"),//左切换tab
    navr:$("#js_navr"),//右切换tab
    iframes:$(".js_index_content"),
    refdom:$("#js_reflush"),
    contmenu:$("#js_contmenu"),
    prevLeft:0,//位移上一次的距离
    callback:null,
    init:function(){
      //1.点击加载ifeame和nav
      //this.addtab();
      //2.nav-click  单击事件-1.关闭 2.focurs和切换
      this.clicktab();
      this.clickclose();
      //3.nav-contextmenu  右键选项卡
      this.contextmenu();
      //4.nav-left/right 定位移动   选项卡移动
      this.navRight();
      this.navLeft();
      //5.刷新
      this.reflush();
    },
    addtab:function(opts,callback){
      opts = $.extend(true,{
        name:"tab",
        src:"doing.html",
        showclosebtn:true,
        active:true,
      }, opts);
      var $this =this,boo =false;
      //验证navs唯一
      $this.navs.children().each(function(){
        if($(this).data("src")==opts.src){
          boo=true;
          $(this).trigger("click");
          return false;
        }
      });
      var htmlDom=null;
      var iframeDom=null;
      if(!boo){//不存在重复的才添加
        htmlDom=$(`<a href="javascript:;" class="nav_item ${opts.active?"action":""}" data-text="${opts.name}" data-src="${opts.src}">
        ${opts.name}
        ${opts.showclosebtn?'<i class="fa fa-close nav_close" title="关闭"></i>':""}
        </a>`);
        iframeDom =$(`<div style="height:100%;width:100%" data-src="${opts.src}"></div>`)
        $this.navs.append(htmlDom);
        $this.iframes.append(iframeDom);
        htmlDom.trigger("click");
        rj.load(iframeDom,opts.src,callback||null);
      }
      $this.callback = callback;
    },
    clicktab:function(){
      var $this =this;
      this.navs.on("click",".nav_item",function(e){
        e.preventDefault();
        var $nav =this;
        //添加样式
        $(this).addClass("action").siblings().removeClass("action");
        //显示对应的iframe
        $this.iframes.children().each(function(){
          if($(this).data("src")==$($nav).data("src")){
            $(this).show().siblings().hide();
            return false;
          }
        });
        //调整actionTab的位置
        $this._showTabByAction();
      })
    },
    clickclose:function(){
      var $this =this;
      this.navs.on("click",".nav_close",function(e){
        e.stopPropagation();
        var $nav =this.parentElement;
        //改变样式
        if($($nav).hasClass("action")){
          $($nav).prev().addClass("action").end().remove();
        }else{
          //删除当前
          $(this).parent().remove();
        }
        //删除对应的iframe
        $this.iframes.children().each(function(){
          if($(this).data("src")==$($nav).data("src")){
            if($(this).css("display")!="none"){
              $(this).prev().show();
              $(this).remove();
            }else{
              $(this).remove();
            }
            return false;
          }
        });
        //调整actionTab的位置
        $this._showTabByAction();
      })
    },
    contextmenu:function(){
      var $this=this;
      this.navs.on("contextmenu",".nav_item",function(e){
        e.preventDefault();
        var $event=e;
        $this.contmenu.fadeIn();
        $this.contmenu.css({"left":e.pageX,"top":e.pageY});
        //关闭当前
        $this.contmenu.on("click",".js_remove",function(){
          $($event.target).find(".nav_close").trigger("click");
        });
        //关闭其他
        $this.contmenu.on("click",".js_other",function(){
          $($event.target).siblings().find(".nav_close").trigger("click");
          //调整actionTab的位置
        $this.prevLeft=0;
        $this._showTabByAction();
        });
        //关闭右侧
        $this.contmenu.on("click",".js_moveright",function(){
          $($event.target).nextAll().find(".nav_close").trigger("click");
        });
      });
      $("body").click(function(e){
        $this.contmenu.fadeOut().unbind("click");
      });
    },
    navLeft:function(){
      var $this =this;
      this.navl.on("click",function(e){
        e.preventDefault();
        var winPosition=$this.navr.position().left-40;
        if($this.prevLeft<winPosition){
          $this.prevLeft=0;
          $this.navs.css("left",0);
          return false;
        }
        $this.navs.children().each(function(index,val){
          if($(val).position().left>=($this.prevLeft-winPosition)){
            var left=$(val).position().left;
            $this.navs.css("left",-left);
            $this.prevLeft=left;
            return false;
          }
        });
      })
    },
    navRight:function(){
      var $this =this;
      this.navr.on("click",function(e){
        e.preventDefault();
        var winPosition=$this.navr.position().left-40;
        //最后一个页面tab的结束位置
        var maxLeft =$this.navs.children().last().position().left+$this.navs.children().last().outerWidth();
        if((maxLeft-$this.prevLeft)<winPosition){
          return false;
        }
        $this.navs.children().each(function(index,val){
          if($(val).position().left>=(winPosition+$this.prevLeft)){
            var left=$(val).prev().prev().position().left;
            $this.navs.css("left",-left);
            $this.prevLeft=left;
            return false;
          }
        });
      })
    },
    reflush:function(){
      var $this = this;
      this.refdom.on("click",reflushIfram);
      function  reflushIfram(){
        $this.iframes.children().each(function(){
          if($(this).css("display")!="none"){
            //this.contentWindow.location.reload(true);
            rj.load($(this),$(this).data("src"),$this.callback||null);
            return false;
          }
        });
      }
    },
    _showTabByAction:function(){
      var $this =this;
      var actionDom =$this.navs.find(".action");
      var winPosition=$this.navr.position().left-40;
      var actionLeft=actionDom.position().left;
      var maxLeft =$this.navs.children().last().position().left+$this.navs.children().last().outerWidth();//最后一个页面tab的结束位置
      var prevDom =null;
      var lastDom =null;
      //拿到第一个到最左边的距离
      $this.navs.children().each(function(index,val){
        var left=$(val).position().left;
        if(left>=$this.prevLeft){
          prevDom=$(val);
          return false;
        }
      });
      //拿到最后一个到左边的距离  
      $this.navs.children().each(function(index,val){
        var left=$(val).position().left+$(val).outerWidth();
        if(left>($this.prevLeft+winPosition)){
          lastDom=$(val).prev().prev();
          return false;
        }
      });
      //如果是最后一页所做的事
      if((maxLeft-$this.prevLeft)<winPosition){
        if(prevDom.next().length>0&&actionLeft<=prevDom.next().position().left){
          $this.navs.children().each(function(index,val){
            if($(val).position().left>=(actionLeft-winPosition/2)){
              var left=$(val).position().left;
              $this.navs.css("left",-left);
              $this.prevLeft=left;
              return false;
            }
          }); 
        }else{
          return false;
        }
      }
      //不是最后一页  点击 不是最左边两个或者最右边两个就不执行  写在上面一个if后面是防止lastDom不报错，因为最后一页拿不到最后的两个dom
      if(actionLeft>prevDom.next().position().left&&actionLeft<lastDom.position().left){
        return false;
      }
      //点击左边两个 或右边两个做的事情 action居中
      $this.navs.children().each(function(index,val){
        if($(val).position().left>=(actionLeft-winPosition/2)){
          var left=$(val).position().left;
          $this.navs.css("left",-left);
          $this.prevLeft=left;
          return false;
        }
      }); 
        
    }
  }
  tabs.init();
  window.tabs = tabs;
})()
