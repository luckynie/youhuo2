function showListnav(){
    $(".sort-container li:not(:has(ul))").css('list-style','none');
    $(".sort-container li").click(function(e){//阻止冒泡
            var e = e || event;
            e.stopPropagation();
    })
    $(".sort-container li:has(ul)").click(function(){
        if($(this).children("ul").css('display') == "none"){
            $(this).addClass("active").siblings().removeClass("active");
            $(this).find(".icon-triangle").css("transform","rotate(90deg)");
            $(this).children("ul").show(500);
        }else{
            $(this).removeClass("active");
            $(this).find(".icon-triangle").css("transform","rotate(0)")
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

var page_num = 0;
var page_size = 4;
var goodsJson = null;
var total = null;
function showGoods(){
    $.ajax({
        type:"get",
            url:"json/goods.json",
            async:true,
            cache:true,
            success:function(res){ 
                //console.log(res)
                goodsJson=res;
                renderJson();
                renderBtn();
                showPagesize();
                bindBtnEvent();
            }
    });
	//pictureSort(container.children)
}
showGoods();
function renderJson(){
    var str="";
    goodsJson.forEach(function(item,index){
        if(!(index >= page_num * page_size && index <= (page_num + 1)*page_size -1)) return false;
         str += ` <div class="good-info">
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
        $(".goods-container").html(str);
    })
}

function renderBtn(){
    total = Math.ceil(goodsJson.length/page_size);
    var str=""
	for(var i=0;i<total;i++){
        if(i===page_num){
            str+=`<a href="javascript:;" class="cur pagenum" data-index="${i}">${i+1}</a>`
        }else{
            str +=`<a href="javascript:;" class="pagenum" data-index="${i}">${i+1}</a>`
        }
		//str +=`<a href="javascript:;" class="pagenum" data-index="${i}">${i+1}</a>`
    }
    var str1=`  <span class="total">1 -${total}/ 共${goodsJson.length}件商品</span>
                <div class="pager">
                    <a class="prevpage" href="javascript:;" title="上一页"><span class="iconfont">&#xe667;</span>上一页</a>
                    ${str}
                    <a class="nextpage" href="javascript:;" title="下一页">下一页<span class="iconfont">&#xe63f;</span></a>
                </div>`
    $(".foot-pager").html(str1);

    var str2=`<i>${page_num+1}</i>/${total}`
	$(".totalpage").html(str2)
}
function bindBtnEvent(){
    $(".pagenum").click(function(){
        page_num = $(this).data("index")
        $(this).addClass("cur").siblings().removeClass("cur")
        renderJson(); 
        renderBtn();
        bindBtnEvent();
    })
    $(".prevpage").click(function(){
        //console.log($(".cur").index())
        if($(".cur").index()==1)return;
        page_num = $(".cur").index()-2;
        $(".pagenum").eq(page_num).addClass("cur").siblings().removeClass("cur");
        //console.log(page_num);
        renderJson();
        renderBtn();
        bindBtnEvent();
    })
    $(".nextpage").click(function(){
        //console.log($(".cur").index())
        var max =  $(".pagenum").length;
        //console.log(max)
        if($(".cur").index()=== max)return;
        page_num = $(".cur").index();
        $(".pagenum").eq(page_num).addClass("cur").siblings().removeClass("cur")
        //console.log(page_num);
        renderJson();
        renderBtn();
        bindBtnEvent();
    })

}
// $(".goods-container").on("click",".good-info",setWindowame);
// function setWindowame(){
    
// }
// 选择每页显示数量
function showPagesize(){
    var flag=true;
    $(".page-count").click(function(){
        if(flag){
            $(this).find("ul").show();
        }else{
            $(this).find("ul").hide();
        }
        flag=!flag;
    })
    $(".page-count ul").on("click","li",function(){
        $("#count-per-page span").html($(this).find("a").html());
        page_num =0;
        page_size=Number($(this).find("a").html());
        renderJson();
        renderBtn();
        bindBtnEvent();
    })
}
