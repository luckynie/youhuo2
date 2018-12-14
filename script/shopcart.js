var arr = [];
function renderData(){   
    var str = "";
    arr=getCart();
    arr.forEach(function(item){
        //console.log(item.id)
        str+=`<div class="promotion-pool">
                <div class="cart-table">
                    <ul class="table table-group">
                        <li class="pre-sell-box tr">
                            <div class="pay-pro td " style="width: 368px;">
                                <input class="cart-item-check iconfont ck" type="checkbox">
                                <a class="pay-pro-icon" href="detailpage.html?id=${item.id}" target="_blank">
                                    <img src="${item.src}">
                                </a>
                                <p class="pay-pro-info">
                                    <a href="detailpage.html?id=${item.id}" target="_blank">
                                    ${item.introduction}
                                    </a>
                                    <em class="pay-pro-detail">
                                        <span>
                                            <b title="黑">颜色：黑</b>
                                            尺码：S<i class="iconfont"></i>
                                        </span>
                                    </em>
                                </p>
                            </div>
                            <div class="product-price td " style="width:148px;">
                                <p class="p-product-price">￥${item.price}</p>
                            </div>
                            <div style="width:128px;" class="adjust-cart-num td">
                                <div class="cart-num-cont" data-id="${item.id}">
                                    <span class="minus cart-num-btn disabled">
                                        <i class="icon-minus updateCount" data-number="-1">-</i>
                                    </span>
                                    <input type="text" class="buycount" value="${item.count}" readonly="readonly">
                                    <span class="plus cart-num-btn">
                                        <i class="icon-plus updateCount"  data-number="1">+</i>
                                    </span>
                                </div> 
                            </div>
                            <div style="width:160px;" class="sub-total red td">
                                <span>￥</span><span class="sumMon">${(item.price*item.count).toFixed(2)}</span>
                            </div>
                            <div style="width:100px;" class="cart-operation td">
                                <span class="cart-del-btn delBtn" data-id="${item.id}">删除</span>
                                <span class="cart-col-btn" data-role="cart-mov2fav-btn">移入收藏</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>`
        $(".goodslist").html(str);
    })
}
renderData();

$(".btn-close").click(function(){
    $(this).parents(".cartnew-tips").remove();
})
$(".goodslist").on("click",".delBtn",function(){
    var id = $(this).data("id");
    arr.forEach(function(item,index){
        if(item.id===id){
            if(confirm("是否删除此商品？")){
                arr.splice(index,1);
                localStorage.setItem("cart",JSON.stringify(arr));
               // $(this).parents(".promotion-pool").remove();
              //  window.location.reload();
                renderData();
                result();
            }
        }
    })
})

$(".goodslist").on("click",".updateCount",function(){
    var id = $(this).parents(".cart-num-cont").data("id");
    //console.log(id)
    var sign = parseInt($(this).data("number"));
    var count = Number( $(this).parents(".cart-num-cont").find("input").val());
    if(sign === -1 && count === 1){
        $(this).parent().css({"cursor":"not-allowed"})
        return
    }else if(sign === 1 && count >=1){
        $(this).parents(".cart-num-cont").find(".minus").css({"cursor":"pointer"})
    }
    for(var i=0;i<arr.length;i++){
        if(id === arr[i].id){
            arr[i].count +=sign;
            localStorage.setItem("cart",JSON.stringify(arr));
            $(this).parents(".cart-num-cont").find("input").val(arr[i].count);
            //console.log($(this).parents(".cart-num-cont").find("input").val())
            $(this).parents(".pre-sell-box").find(".sumMon").html((arr[i].price*arr[i].count).toFixed(2));
            result();
        }
    }
})
function result(){
    var count = 0;
    var money = 0;
    $(".ck:checked").each(function(index,item){

        count += Number($(item).parents(".pre-sell-box").find(".buycount").val());
        money += parseFloat($(item).parents(".pre-sell-box").find(".sumMon").html());
        //console.log(Number($(item).parents(".pre-sell-box").find(".buycount").val()))
        $(".ins").html(count);
        $("#oTotle").html(money.toFixed(2));
        $(".btn-account").removeClass("btn-account-disable")
    })
}
$(".ck").change(function(){
    var sumLength = $(".ck").length;
    var ckLength = $(".ck:checked").length;
    //console.log( $(".ck").length)
    var ischecked = sumLength === ckLength;
    $(".selectAll").prop("checked",ischecked);
    /*$("#selectAll2").prop("checked",ischecked);*/
    if(ckLength == 0){
        $(".ins").html("0");
        $("#oTotle").html('0');
        $(".btn-account").addClass("btn-account-disable")
    }
    result();
})
$(".selectAll").click(function(){
    var selectStatus = $(this).prop("checked");
    if(!selectStatus){
        $(".ck").prop("checked",selectStatus);
        $("#cart-page .selectAll").prop("checked",selectStatus);
        $(".ins").html("0");
        $("#oTotle").html("0");
        $(".btn-account").addClass("btn-account-disable")
    }
    else{
        $(".ck").prop("checked",selectStatus);
        $("#cart-page .selectAll").prop("checked",selectStatus);
        result();
    } 
}) 