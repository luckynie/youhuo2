var goodsJson=[]
function showPic(){
    var url = window.location.href;
 	var obj = addres(url);	 
    var id = Number(obj.id);
    $.ajax({
        type:"get",
        url:"json/goods.json",
        cache:true,
        async:true,
        success:function(res){ 
            getJson(res,id); 
            goodsJson=res;
        }
    });
}
showPic();
function getJson(req,id){
    req.forEach(function(item){       
        var str1="";
        var str2="";
        var str3="";
        if(item.id===id){
            var str=`<a href="javascript:;">GIRLS首页</a>
                    <span class="iconfont">&#xe63f;</span>
                    <a href="javascript:;" title="${item.classname[0]}">${item.classname[0]}</a>
                    <span class="iconfont">&#xe63f;</span>
                    <a href="javascript:;" title="${item.classname[1]}">${item.classname[1]}</a>
                    <span class="iconfont">&#xe63f;</span>
                    <span class="last">${item.introduction}</span>`
            $(".path-nav").html(str);
            str1 = `<img id="img-show" class="img-show" src="${item.src}">
                    <div class="magnifier move-object" id="mainMask"></div> 
                    <div id="max" class="magnifier max">
                        <img id="bigImg" src="${item.src}">
                    </div>`;
            for(var i=0;i<item.list.length;i++){
                if(i===0){
                    str2 += `<img class="thumb active" src="${item.list[i]}">`
                }else{
                    str2 += `<img class="thumb " src="${item.list[i]}">`;
                }
                //str2 += `<img class="thumb " src="${item.list[i]}">`;
            } 
            $("#min-img").html(str1);
            $(".thumb-wrap").html(str2);
            $(".name").html(item.introduction);
            str3 =` <span class="price-row">
                        <span class="title">吊牌价：</span>
                        <span class="price has-other-price">${item.original}</span>
                    </span>
                    <br>
                    <span class="promotion-price">
                        <span class="title">促销价：</span>
                        <span class="price">￥${item.price}</span>
                    </span>
                    <span class="desc">
                        <span class="promotion">8.0折</span>
                    </span>`;
            $(".market-price").html(str3);
            var str4 =`<img src="${item.src}">
                       <span class="color-name">粉色</span>`;
            $(".focus").html(str4);

            var str5=`  <span data-id=${item.id}> 
                            <i class="iconfont">&#xe6af;</i>
                            加入购物车 
                        </span>`
            $(".buy-btn").html(str5);
        }
    })
}

function showExpand(){
	$("#min-img").mouseenter(function(e){
		/*e.stopPropagation?e.stopPropagation():e.cancelBubble=true;*/
		$(".max").show();
		$(".move-object").show();
	})
	$("#min-img").mouseleave(function(e){
		/*e.stopPropagation?e.stopPropagation():e.cancelBubble=true;*/
		$(".max").hide();
		$(".move-object").hide();
	})
	$("#min-img").mousemove(function(e){
		var e = e || event; 
		var maskLeft = e.pageX-$("#min-img").offset().left-$("#mainMask").width()/2;
		var maskTop = e.pageY-$("#min-img").offset().top-$("#mainMask").height()/2;
		var MaxL=$("#min-img").width()-$("#mainMask").width();
		var MaxT=$("#min-img").height()-$("#mainMask").height();
		maskLeft = maskLeft < 0 ? 0 : maskLeft > MaxL ? MaxL : maskLeft;
		maskTop = maskTop < 0 ? 0 : maskTop > MaxT ? MaxT : maskTop;  
		$("#mainMask").css({"left":maskLeft,"top":maskTop})
		var bigL=maskLeft*($("#bigImg").width()-$(".max").width())/($(".max").width()-$("#mainMask").width());
		var bigT=maskTop*($("#bigImg").height()-$(".max").height())/($(".max").height()-$("#mainMask").height());
		$("#bigImg").css({"left":-bigL,"top":-bigT})
    })
    

	$(".thumb-wrap").on("mouseenter","img",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var newSrc = $(this)[0].src;
		$("#bigImg")[0].src = newSrc;
		$("#img-show")[0].src = newSrc;
		//console.log($("#main-prod-img")[0].src);
	})
}
showExpand();
$(".size li").click(function(){
    $(this).css({"background":"#000","color":"#fff"}).siblings().css({"background":"#fff","color":"#000"});
})
function  addReduce(){ 
    var num=1;
	$("#increase").click(function(){
        num++;
		$("#quantity").html(num);
	})
	 
	$("#reduce").click(function(){
		if(num>1){
			$(this).css("cursor","pointer");
            num--;
			$("#quantity").html(num);
		}else{
			$(this).css("cursor","not-allowed");
		}
	})
}
addReduce();
$(".buy-btn").mouseenter(function(){
    $(this).css("background","rgba(233,38,1,.8)")
})
$(".buy-btn").mouseleave(function(){
    $(this).css("background","#d0021b")
})

$("#buyTocart").click(function(){
    var id=$(this).children("span").data("id");
    //console.log(id)
    var nowMsg=findJson(id)[0];
    //console.log(nowMsg)
    addData(nowMsg,id);
    showCount();
    if(confirm("成功添加此商品，是否查看购物车")){
        window.location.href="shopcart.html"
    }
})
function showCount(){
    var arr = getCart();
    var count=0;
    arr.forEach(function(item){
        count +=Number(item.count);
    })
    $(".goods-num-tip").html(count);
}

function addData(nowMsg,id){
    var sNowMsg = JSON.stringify(nowMsg); 
    if(!localStorage.cart){
        localStorage.setItem("cart",`[${sNowMsg}]`);
        return false;
    }
    var aMsg = JSON.parse(localStorage.cart);
    // var i = Number(hasId(aMsg,id));
    // console.log($("#quantity").html());
    // console.log(aMsg[i].count)
    if(!hasIid(aMsg,id)){
        aMsg.push(nowMsg);
    }
    for(var i = 0 ; i < aMsg.length ; i ++){
        if(aMsg[i].id === id){
            aMsg[i].count +=Number($("#quantity").html());
        }
    }
    localStorage.setItem("cart",JSON.stringify(aMsg));
    //console.log(JSON.parse(localStorage.cart));
}
function findJson(id){ 
    return goodsJson.filter(function(item){
        return item.id === id 
  })
}

function hasIid(aMsg,id){
    for(var i = 0 ; i < aMsg.length ; i ++){
          if(aMsg[i].id === id){
                //aMsg[i].count++;
                return true;
          }
    }
    return false;
}