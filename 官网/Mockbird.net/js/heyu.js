
(function(scope,important,assistant){
	
	"use strict";//进入严格模式
	
	var gb=Array();
	
	var Browser;
	var version;//判断浏览器版本
	
	var wm="wming";//缓存全局对象变量
	var objects=Array();gb['os']=wm;objects[wm]=Array();
	var objectx=Array();gb['ox']=wm;objectx[wm]=Array();
	
	var transition=Array();

	var the=scope[important]=init;  // open interface
	
	var screenw,screenh;
	
	function oneself(){
		     this.speed=9;
			 this.time=50;
			 this.opx=1000;//针对opacity系数		
		              }//该对象属性可暴露到实例外
	
	function init(id,label){return new base(id,label)};
	
	function arring(arr,num){
		    var value;
		switch(typeof(arr)){
			case 'string':value=arr;break;
			case 'object':if(num<arr.length){value=arr[num]}else{value=''};break;
			default:value='';break;
			               };return value;
		                    };
	
	function compa(name,value){
		var arr=Array();arr.push(name,value);
		var ie={};
		var gg={};
		var ff={'background-image':'backgroundImage','z-index':'zIndex'};
        switch(Browser){
			case 1:if(version<10){switch(name){
				case 'opacity':arr[0]='filter';arr[1]='alpha(opacity='+value*100+')';break;
				                 }}else{arr[0]=ie[name]||name};break;
			case 4:arr[0]=ff[name]||name;break;
			           };return arr;
		                      }//加入兼容性考量
	
	function object(id,obj){
	var bak;var arr=Array();arr[0]=0;var elements=Array();var obect=obj||document;var oba=Array();
	var reg=[/^#(\w+)\s([a-zA-Z]+)\(([0-9]*)\)/,/^([a-zA-Z]+)\(([0-9]*)\)/,/^#(\w+)/];
	arr[4]=function(){if(arr[3]){if(arr[3].length){elements=arr[3]}else if(arr[3].length !== 0){elements.push(arr[3])}};}
	do{arr[1]=false;var bak=id.match(reg[arr[0]]);try{switch(arr[0]){
		case 0:arr[2]=obect.getElementById(bak[1]).getElementsByTagName(bak[2]);
			 if(bak[3]!==''){arr[3]=arr[2][bak[3]]}else{arr[3]=arr[2]};break;		  
	    case 1:arr[2]=obect.getElementsByTagName(bak[1]);
			 if(bak[2]!==''){arr[3]=arr[2][bak[2]]}else{arr[3]=arr[2]};break;
		case 2:arr[3]=obect.getElementById(bak[1]);break;
	               };arr[4]();}catch(e){arr[1]=true;};
	  arr[0]++;}while(arr[0]<reg.length && arr[1]);
	  for(var i=0;i<elements.length;i++){oba.push(elements[i])};return oba;
		                    }//  _______________  object
	
	function base(id,label){
		this.elements=Array();var lb=label||gb['os'];//gb['os']=lb;
		     oneself.call(this);
			if(id){var arr=null;
				if(typeof(id)=='string'){arr=id.match(/^\[(\w*)\]$/);
				if(arr){this.elements=objects[arr[1]]}else{this.elements=object(id)};}
				  else if(id instanceof Array || id instanceof HTMLCollection){this.elements=id}
				      else{this.elements.push(id)};
				           objects[lb]=this.elements;
				   }else{this.elements=objects[lb]};
		                   }//  ________________  base
						 
	base.prototype.found=function(id,label){
		var arr=Array();var lb=label||gb['ox'];//gb['ox']=lb;
			 if(id){
				if(typeof(id)=='string'){arr=object(id,this.elements[0])}
				  else if(id.length){arr=id}
				      else{arr.push(id)};
				           objects[lb]=arr;this.elements=arr;
				   }else{this.elements=objects[lb]};
				   return this;
		                                   }	//  ______________  found
										   
	base.prototype.eq=function(num){
		if(!this.backup){this.backup=this.elements};
		if(isNaN(num)){this.elements=this.backup}else{this.elements=Array();this.elements.push(this.backup[num])};
		return this;
		                           }		// _____________ eq							   				   

	base.prototype.set=function(name,data){
		var namearr={'val':'value','html':'innerHTML'};
		var arr=Array();var name=namearr[name]||name;
		for(var i=0;i<this.elements.length;i++){var obj=this.elements[i];
	    if(typeof(data)!='undefined'){obj[name]=arring(data,i)}else{arr.push(obj[name])}
			                          }//for
		if(typeof(data)!='undefined'){return this}else{return arr};
		                                  }//  ______________  set

	base.prototype.css=function(name,data){
	 for(var i=0;i<this.elements.length;i++){
		var obj=this.elements[i];var value=arring(data,i);
		if(name){var k=compa(name,value);obj.style[k[0]]=k[1];}else{obj.removeAttribute('style')}
		                                    }; return this;	
		                                        }//  ______________  css	

    base.prototype.clas=function(model,value){	
for(var i=0;i<this.elements.length;i++){
	var tk=arring(value,i);
	var ret=new RegExp("([\\-\\w\\s]*)\\b("+tk+")\\b([\\w\\s\\-]*)");
	var obj=this.elements[i];
	var cla=obj.className;
	var arr=cla.match(ret);
	var str=null;
	switch(model){
		case 'set':obj.className=tk;break;
		case 'add':if(!arr){cla+=' '+tk;cla=cla.replace(/(^\s*)|(\s*$)/g,"");obj.className=cla};break;
		case 'del':if(!arr){break};
		           str=arr[1];
		           for(var j=3;j<arr.length;j++){str+=arr[j];};
				   str=str.replace('  ',' ');obj.className=str;
		;break;
		         }
				                                 };return this}//  ___________  class
												 
    base.prototype.transition=function(name,start,end,label){
		 var label=this.label=label||new Date().getTime()+''+Math.round(Math.random()*1000);
		 var obj=this.elements[0];transition[label]=obj;var un='px';var _this=this;var size;
		 if(!obj[label]){obj[label]=Array();obj[label].push(name,start,end)};var kp=obj[label];
		 if(kp[0]=='opacity'){kp.a=kp[1]*this.opx;kp.b=kp[2]*this.opx;un=''}else{kp.a=kp[1];
		 kp.b=kp[2]};kp.c=kp.a;clearInterval(kp.timer);
		 kp.timer=setInterval(function(){
			var ip=kp[1]||kp[2];var pg=kp.b-kp.c;
			if(ip<=1 && Math.abs(pg)<(_this.opx/20) && kp[0]=='opacity'){var speed=pg;}
                          else{var speed=(pg)/_this.speed;};
			speed=speed>0?Math.ceil(speed):Math.floor(speed);kp.c+=speed;
			 if(kp[0]=='opacity'){size=kp.c/_this.opx}else{size=kp.c};
			 _this.css(kp[0],size+un);
			 if(kp.c==kp.b){clearInterval(kp.timer);};
			                            },this.time);
		 return this;
		                                                    }// ______  transition
	init.clear=function(label){clearInterval(transition[label][label].timer)};														

    base.prototype.regedit=function(name,value){
		switch(name){
			case 'back':return this[value];break;
			default:this[name]=value;break;
			        };return this;
		                                       }//  ____  regedit									   
    base.prototype.end=function(num){if(!isNaN(num))return this.elements[num];return this.elements}	 	

    var xml=function(){var xmlHttp;try{xmlHttp=new XMLHttpRequest()}
                  catch (e){try{xmlHttp=new ActiveXObject("Msxml2.XMLHTTP")}
                  catch (e){xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")}
                  };return xmlHttp}();
    init.ajax=function(url,data,func,is){
	   var type,str='';
	 if(typeof(data)=='object'){for(var x in data){str+=x+'='+data[x]+'&'};type='POST'}else{url+=data?('?'+data):'';type='GET'};		
	   var connect=xml;var is=true;//true 异步传输，无需等待
	   connect.open(type,url,is);
	   connect.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	   connect.send(str);connect.onreadystatechange=function(){
	   if(connect.readyState==4){if(connect.status==200){if(func && is){func(connect.responseText)}else if(func){func()};};};
		                                                      }	   
	                               }//ajax通信
	
	init.bs=function(){
		var u = navigator.userAgent, app = navigator.appVersion;var s=0;
           var user={//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                     };
				for(var key in user){s++;if(user[key])break;};Browser=s;
                try{switch(s){
					case 1:var arr=u.match(/MSIE\s*(\w+)\b/);version=arr[1];break;
					case 2:;break;
					case 3:;break;
					     };}catch(e){};return s;
					            }();//集成浏览器判断
	init.ms=function(func){
			switch(Browser){
case 1:case 3:document.onmousewheel=function(ev){var e = e || window.event;func(e.wheelDelta)};break;//IE浏览器//谷歌浏览器 
case 4:document.addEventListener('DOMMouseScroll',function(e){func(-e.detail)},false);break;//火狐浏览器
	                       };
		                  };//集成判断鼠标滚动				
    init.screen=function(func){
		var cat=this;cat.size=function(){
	screenw=window.innerWidth>document.documentElement.clientWidth?document.documentElement.clientWidth:window.innerWidth;
	screenh=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;func(screenw,screenh);			
			                            };cat.size();
		window.onresize=cat.size};//集成判断屏幕尺寸改变
		
    scope.onerror=function(){return !assistant}//关闭报错提示！
	
	init.wap={
		deviceorientation:function(func,time){
			var outt=true;
			window.addEventListener("deviceorientation", function(event){
				  var alpha    = event.alpha;
                  var beta     = event.beta;
                  var gamma    = event.gamma;
				  if(outt){outt=false;setTimeout(function(){func(gamma,beta,alpha);outt=true;},time)};
				                                                         });
			                                 }
		
		     }//关于手机端的方法汇总
	init.qsa=function(label,obj){
		var ob=obj?obj:document;var arr=ob.querySelectorAll(label);var arrs=Array();
		if(arr){for(var i=0;i<arr.length;i++){arrs.push(arr[i])}return arrs}else{return Array()}
		                        }
    init.data=function(name,value){if(value){localStorage.setItem(name,value)}else{return localStorage.getItem(name)}}
    init.txtends=function(name,func){base.prototype[name]=func;}
	                                })(window,'_$',true);
							