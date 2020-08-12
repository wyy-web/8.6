function wheel(wins,opts,runopts){
    this.init(wins,opts,runopts);
    this.getwindow();
    this.creatbox();
    this.creatlist();
    this.creatbtn();
    this.lunbo();
    this.clicklunbo();
    }
    wheel.prototype={
    init(wins,opts,runopts){
        var wins = document.querySelector(wins);
        this.opts=opts;
        this.runopts=runopts;
        if (!(wins && wins.nodeType == 1)) {
            console.error("窗口元素not find");
            return;
        }
         this.wins=wins;
        opts.imgs.push(opts.imgs[0])
       this.imglength=opts.imgs.length;
       if(this.imglength==0){
         console.error("没有传入轮播内容")
         return;
       }
      this.imgsize=opts.imgsize;
       if(!(this.imgsize instanceof Array)){
           console.error("请传入合法的尺寸")
           
       }
    
       if(this.imgsize.length==0)
    {
       this.imgsize[0]=document.documentElement.clientWidth;
       this.imgsize[1]=400;
    }
    if(this.imgsize.some(function(val){
        return val=0;
    })){
       for(var i=0;i<imgsize.length;i++){
           if(this.imgsize[i]==0){
               this.imgsize[i]=500;
           }
       }
       
    }
    this.btncolor=opts.btncolor||"#fffbc3";
    this.btnactive=opts.btnactive||"#c65f00";
    this.btnpos=opts.btnpos||["center",""];
    this.time=0;
    this.runopts=runopts||{};
    if(this.runopts.time){
        this.time=runopts.time*1000;
    }else{
        this.time=5000;
    }
    
    this. yxtime=0;
    if(this.runopts.yxtime){
        this.yxtime=runopts.yxtime*1000;
    }else{
        this.yxtime=500;
    }
    
    
    this. runfs="null";
    if(runopts.runfs=="linear"||runopts.runfs){
        this.runfs=Tween.linear;
    }else if(runopts.runfs=="in"){
        this.runfs=Tween.easein;
    }else if(runopts.runfs=="out"){
        this.runfs=Tween.easeout;
    }
    
    },
    getwindow(){
       this. wins.style.cssText = "width:100%;height:16rem;overflow:hidden;position:relative;";
    },
    creatbox(){
    this. box=document.createElement("div");
    this.box.style.cssText="width:"+this.imglength*100+"%;height:100%;"
    this.wins.appendChild(this.box);
    },
    creatlist(){
        for (var i = 0; i < this.imglength; i++) {
            var list=document.createElement("div")
            list.style.cssText=`float:left;width:${100/this.imglength}%;height:100%;`;
            this.box.appendChild(list);
    
            var link=document.createElement("a")
            link.href=this.opts.links[i];
            link.style.cssText = "width:100%;height:" + this.imgsize[1] + "rem;display:block;margin:auto;background:url(" + this.opts.imgs[i] + ") ;"        
            list.appendChild(link);
            this.box.appendChild(list);
            
            } 
    },
    creatbtn(){
    var btnbox=document.createElement("div")
    btnbox.style.cssText = "position: absolute;z-index: 50;width: 80px;left: 0px;right: 0px;bottom: 24%;padding:10px 0px;margin: auto;";
    this.wins.appendChild(btnbox)
    this.btns=[]
    for(i=0;i<this.imglength-1;i++){
        if(i==0){
            this. btcolor=this.btnactive;
        }else{
            this. btcolor=this.btncolor;
        }
        this.btn=document.createElement("div");
        this.btn.style.cssText="width: 12px;height: 12px;border-radius: 90px;overflow: hidden;margin: 0 2px 0 2px;line-height: 99em;text-align: center;cursor: pointer;display: inline-block;background:"+this.btcolor+";float:left;opacity:0.5"
        btnbox.appendChild(this.btn);
        this.btns.push(this.btn);
        
    }
    
    
    },
    //btns的获取有问题  控制台报错btns未被定义
    
        //私有
        _setval(){
         this._winw=parseInt(getComputedStyle(this.wins,null).width);   
         this._num=0;
         this.t=0;
        
          },
          _move(){
            var that=this;
          return function(){
          that._num++;
          if(that._num>that.btns.length-1){
              animate(that.box,{
              "margin-left":-that._num*that._winw
          },that.yxtime,that.runfs,function(){
              
              that.box.style.marginLeft=0;
              
          })
          that._num=0;
          }
          else{
          animate(that.box,{
              "margin-left":-that._num*that._winw
          },that.yxtime,that.runfs)}
         for(var i=0;i<that.btns.length;i++){
             that.btns[i].style.background=that.btncolor;
         }
      that. btns[that._num].style.background=that.btnactive
          }
    },
    
    
    lunbo(){
    this._setval()
    this.t=setInterval(this._move.call(this),this.time)
    },
    
    
    clicklunbo(){
        var that=this;
        this.wins.onmouseover=function(){
            clearInterval(that.t);
          }
         
          this.wins.onmouseout=function(){
            that.t=setInterval(that._move.call(that),that.time)
          }
          
        for(let i=0;i<that.btns.length;i++){
            that. btns[i].onclick=function(){
               that._num=i;
               animate(that.box,{
               "margin-left":-that._num*that._winw
               },that.yxtime,that.runfs)
       
               for(var j=0;j<that.btns.length;j++){
                that.btns[j].style.background=that.btncolor;
            }
          that.btns[that._num].style.background=that.btnactive
         }
             
       }
      
    }
    
    }
    