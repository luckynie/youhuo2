function showhide(){

    $(".center-content").nav({
        parent:".topcontent-L",
        children:".yoho-group-list"
    });
    $(".topcontent-R ul").nav({
        parent:".myyoho",
        children:".simple-user-center"
    });
    $(".topcontent-R ul").nav({
        parent:".help",
        children:".nav-drop-down"
    });
    $(".topcontent-R ul").nav({
        parent:".download-code",
        children:".download-app-box"
    });
    $(".sub-girlsNav").nav({
        parent:".contain-third",
        children:".third-nav-wrapper"
    });
    // $(".func-area").nav({
    //     parent:".go-cart",
    //     children:".mini-cart-wrapper"
    // })
}
showhide();


function showGroupList(){
    $(".topcontent-L").mouseenter(function(){
        $(this).css("background","#ddd")
    })
    $(".topcontent-L").mouseleave(function(){
        $(this).css("background"," #f4f4f4")
    })
    $(".yoho-group-list").on("mouseenter","a",function(){
        var txt=$(this).data("cn")
        $(this).html(txt).css("color","#000");
    })
    $(".yoho-group-list").on("mouseleave","a",function(){
        var txt=$(this).data("en")
        $(this).html(txt).css("color","#9196a0");
    })
}
showGroupList();

function topSearch(){ 
    //console.log($(".search-key"));
    // var search = $(".search-key")
    $(".search-key").keyup(function(){
          var kw = $(this).val();
          if(kw === ""){
            $(".search-suggest").hide();
          }
          $(".search-suggest").show();
          $.ajax({
            type:"get",
            url:"https://www.yohobuy.com/product/search/suggest?&callback=fn&keyword="+kw,
            async:true,
            dataType:"jsonp",
            jsonpCallback:"fn" 
        });
        if($(".search-suggest").html()===""){
            $(".search-suggest").hide();
        }
      })
      
      $(".search-suggest").on("click","li",function(){
          $(".search-key").val($(this).data("keyword"));
          $(".search-suggest").hide(); 
      })     
}
function fn(msg){
    //console.log(msg);
    var arr = msg.data;
    var str = "";
    for(var i = 0;i < arr.length;i++){
        str +=` <li data-keyword="${arr[i].keyword}">
                    <a>
                        <span class="searchvalue left">${arr[i].keyword}</span>
                        <span class="valuenum right">约${arr[i].count}个商品</span>
                    </a>
                </li>`;
    }
    $(".search-suggest").html(str);
}   
topSearch();

function showDownloadBox(){ 
    //console.log($(".qrcode-hover-box"),1);
    $(".layer-box").mouseenter(function(){ 
        //console.log(1)
        $(this).css("opacity",1); 
    })
    $(".layer-box").mouseleave(function(){
        $(this).css("opacity",.5); 
    })
    $(".qrcode-hover-box").mouseenter(function(){ 
        $(this).find(".download-app-box").show(); 
    })
    $(".qrcode-hover-box").mouseleave(function(){  
        $(this).find(".download-app-box").hide(); 
    })
}
showDownloadBox();
function goTop(){
    window.onscroll=function(){
		var scrollH = document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollH === 0){
			$(".right-floating-layer").hide();
		}else{
            $(".right-floating-layer").show();
        }
	}
    $(".return-top").click(function(){
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        $(".right-floating-layer").hide();
    })
}
goTop()

function hideCodeDownBox(){
    $(".code-down-box i").click(function(){ 
        $(this).parent().remove();
    })
}
hideCodeDownBox();

// 获取购物车

$(".go-cart").mouseenter(function(){
    //console.log(1)
    $(".mini-cart-wrapper").show();
    // console.log(getCart())  
   $(".mini-cart-wrapper").html(renderCart());
})
$(".go-cart").mouseleave(function(){
    $(".mini-cart-wrapper").hide();
})
function showCount(){
    var arr = getCart();
    var count=0;
    arr.forEach(function(item){
        count +=Number(item.count);
    })
    $(".goods-num-tip").html(count);
}
showCount();
function getCart(){

    if(!localStorage.cart) return 0;
    var aMsg = JSON.parse(localStorage.cart);
    return aMsg;
}
// function getCart(){
    
//     if(!localStorage.cart){
//          localStorage.clear("cart");
//          return
//     };
//     var aMsg = JSON.parse(localStorage.cart);
//     return aMsg;
// }
function renderCart(){
    var html = "";
    var str="";
    var cart_json = getCart();
    if(cart_json==0){
        html = ` <div class="empty-cart">
                        <h3>您的购物车暂无商品</h3>
                    </div>`
    }else{
        for(var i = 0 ; i < cart_json.length ; i ++){
            str +=`<div class="goods-item" data-num="2">
                    <div class="goods-img">
                        <a href="detailpage.html?id=${cart_json[i].id}">
                            <img src="${cart_json[i].src}">
                        </a>
                    </div>
                    <div class="goods-info">
                        <p class="title">
                            <a href="">${cart_json[i].introduction}</a>
                        </p>
                        <p>
                            颜色:<span title="黑色">黑色</span>
                            尺码:M
                        </p>
                    </div>
                    <div class="goods-price">
                        <p>${cart_json[i].price} x ${cart_json[i].count}</p>
                        <p>
                            <a href="javascript:;" class="cart-goods-del" data-id="${cart_json[i].id}">删除</a>
                        </p>
                    </div>
                </div>    `;
        }
        html = `<div class="rich-cart">
                    <h3 class="rich-cart-title">最近加入的商品:</h3>
                    <div class="goods-list">
                        ${str}
                    </div>
                    <div class="go-full-cart">
                        <div>
                            <a href="shopcart.html">查看我的购物车</a>
                        </div>
                    </div>
                </div>`          
    }
    return html;
    
}
// $("#clear").on("click",function(){
//     localStorage.clear("cart");
// })

$(".mini-cart-wrapper").on("click",".cart-goods-del",function(){
    var id = $(this).data("id");
    var goodsMsg= getCart();
    goodsMsg.forEach(function(item,index){
        if(item.id===id){
            if(confirm("是否删除此商品？")){
                goodsMsg.splice(index,1);
                localStorage.setItem("cart",JSON.stringify(goodsMsg));
                $(this).parents(".goods-item").remove();
                //window.location.reload();
                showCount();
            }
        }
    })
})
 