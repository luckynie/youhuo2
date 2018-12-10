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