window.onload=function(){
var sign=_$('#sn').end(0);if(sign.offsetWidth<767)_$(sign).clas('add','hy_w');
	var d=_$("#wm div()",'d').end();
	var gb=[0,190,160,140];
        var app=null;
	var module=['hy_f','mp','mk','md'];//层级class样式设置
	var model=7;//轮播展现数量,必须为单数
        var timer=3500//时间单位毫秒
        var ini=parseInt(model/2);
	function init(){
		_$('[d]').eq(0).clas('add',module[0]);
		_$('[d]').eq(1).css('left',-gb[1]+'px');
		_$('[d]').eq(d.length-1).css('left',gb[1]+'px');
		           }//初始化
	function ov(num){
             var a=num+1<d.length?(num+1):0;
			 var b=num-1>-1?(num-1):(d.length-1);
			 for(var i=0;i<d.length;i++){
				 _$('[d]').eq(i).clas('del','hy_f').clas('del','mp');
				 switch(i){
                                 case a:_$('[d]').eq(i).clas('add',module[1]).eq(i).css('left',-gb[1]+'px');break;
				 case num:_$('[d]').eq(i).clas('add',module[0]).css('left',gb[0]+'px');break;
				 case b:_$('[d]').eq(i).clas('add',module[1]).eq(i).css('left',gb[1]+'px');break;
				 default:;break;					 
			                                      }};
		            }

	function om(num){
		     var at=controller(num);
			 for(j=0;j<module.length;j++){_$('[d]').clas('del',module[j])};
			 for(var i=0;i<model;i++){
				 var zi=parseInt((model-1)/2);
				 var b=i-zi;var a=b<0?-b:b;
				 _$('[d]').eq(at[i]).clas('add',module[a]).css('left',b*gb[a]+'px');
				                     };
		            }
					
	function controller(num){
		     var arr=Array();var zi=parseInt((model-1)/2)+1;
			 for(var i=0;i<model;i++){
				          var a=i+1-zi+num;
						  a=a<0?a+d.length:(a<d.length?a:a-d.length);
						  arr.push(a);
						             }return arr;
		                    }
        function slide(){var a=ini+1;a=a<d.length?a:a-d.length;ini=a;om(ini);}
	
	for(var i=0;i<d.length;i++){
		d[i].k=i;
		d[i].onclick=function(){ini=this.k;om(this.k)}

		                       };//init();
om(ini);app=setInterval(slide,timer);
_$("#wm").end(0).onmouseover=function(){clearInterval(app)}
_$("#wm").end(0).onmouseout=function(){app=setInterval(slide,timer)}
}