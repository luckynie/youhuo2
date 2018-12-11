function showListnav(){
    $(".sort-container li:not(:has(ul))").css('list-style','none');
    $(".sort-container li").click(function(e){//阻止冒泡
            var e = e || event;
            e.stopPropagation();
    })
    $(".sort-container li:has(ul)").click(function(){
        if($(this).children("ul").css('display') == "none"){
            $(this).children(".icon-triangle").css("border-color","#000 #fff #fff #fff");
            $(this).children("ul").show(500);
        }else{
            $(this).children(".icon-triangle").css("border-color","#fff #fff #fff #000")
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
        //console.log($(this).index())
        //console.log( $(".senior-sub-wrap .senior-sub").eq($(this).index()));
        $(".senior-sub-wrap .senior-sub").eq($(this).index()).show();

    })
    $(".senior-attr-wrap li").mouseleave(function(){
        $(this).children(".iconfont").show();
        $(".senior-sub-wrap .senior-sub").eq($(this).index()).hide();
    })
}
showSenior();