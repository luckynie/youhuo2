function showListnav(){
    $(".sort-container li:not(:has(ul))").css('list-style','none');
    $(".sort-container li").click(function(e){//阻止冒泡
            var e = e || event;
            e.stopPropagation();
    })
    $(".sort-container li:has(ul)").click(function(){
        if($(this).children("ul").css('display') == "none"){
            $(this).addClass("active").siblings().removeClass("active");
            //$(this).children(".icon-triangle").css("transform","rotate(90deg)");
            $(this).children("ul").show(500);
        }else{
            $(this).removeClass("active");
            //$(this).children(".icon-triangle").css("transform","rotate(-90deg)")
            $(this).children("ul").hide(500); 
        }
    })
    $(".sort-child-list li").click(function(){
        //console.log(this)
        $(this).addClass("active").siblings().removeClass("active");
    })
}
showListnav();
function showSize(){
    var flag=true;
    $("#size-more").click(function(){
        if(flag){
            flag=false;
            $(this).children("em").html("收起");
            $(this).parent().children(".size-content").css({"max-height":"150px","overflow-y":"auto"});
            $(this).children("i").html("&#xe652;");
        }else{
            flag=true;
            $(this).children("em").html("更多")
            $(this).parent().children(".size-content").css({"max-height":"62px","overflow-y":"hidden"})
            $(this).children("i").html("&#xe65d;");
        }

    })
}
showSize();

function showSenior(){
    $(".senior-attr-wrap li").mouseenter(function(){
        $(this).children(".iconfont").hide();
        $(this).children(".senior-up-icon").css("visibility","visible");
        //console.log($(this).index())
        //console.log( $(".senior-sub-wrap .senior-sub").eq($(this).index()));
        $(".senior-sub-wrap .senior-sub").eq($(this).index()).show();

    })
    $(".senior-attr-wrap li").mouseleave(function(){
        $(this).children(".iconfont").show();
        $(this).children(".senior-up-icon").css("visibility","hidden");
        $(".senior-sub-wrap .senior-sub").eq($(this).index()).hide();
    })
}
showSenior();


function showGoods(){
    $.ajax({
        type:"get",
            url:"json/goods.json",
            async:true,
            cache:true,
            success:function(res){ 
               // console.log(res[0])
                renderJson(res);
            }
    });
	//pictureSort(container.children)
}
showGoods();
function renderJson(json){
    json.forEach(function(item){ 
        var str = ` <div class="good-info">
                        <div class="tag-container clearfix">
                        </div>
                        <div class="good-detail-img">
                            <a class="good-thumb" href="detailpage.html?id=${item.id}" title="${item.introduction}" target="_blank">
                                <img class="lazy" src="${item.src}">
                            </a>        
                        </div>
                        <div class="good-detail-text ">
                            <a href="javascript:;" target="_blank" title="${item.introduction}">${item.introduction}</a>
                            <p class="brand">
                                <a href="javascript:;" title="${item.introduction}">${item.name}</a>
                            </p>
                            <p class="price ">
                                <span class="market-price">${item.original}</span>
                                <span class="sale-price prime-cost">${item.price}</span>
                            </p>
                            <div class="hideList hide">
                                <li data-src="${item.src}"></li>
                            </div>
                        </div>
                    </div>`;
        $(".goods-container").append(str);
    })
}

$(".goods-container").on("click",".good-info",setWindowame);
function setWindowame(){
    
}