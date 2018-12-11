$.ajax({
    type:"get",
        url:"json/index.json",
        async:true,
        cache:true,
        success:function(res){ 
            //console.log(res[0])
            renderPage(res[0]);
        }
});
function renderPage(json){ 
    //console.log(json)
    json.forEach(function(item,index){
        let str1="";
        for(let i=0;i<item.keywordsSrc.length;i++){
            str1 += `<a class="keywords0" href=""><img class="lazy" src="${item.keywordsSrc[i]}"></a>`
        }
        let str2="";
        for(var j=0;j<item.label.length;j++){
                str2 += `<a href="" title="${item.label[j]}">${item.label[j]}</a>`
             }
        let str3="";
        for(var k=0;k<item.list.length;k++){
            str3 += `   <li>
                            <a href=""><img class="lazy" src="${item.list[k]}"></a>
                        </li>`;
        }
        let str=`<div class="tpl-recommed clearfix">
        <div class="floor-header clearfix">
            <h2 class="floor-title">${item.title}</h2>
            <span class="header-navs">MORE</span>
        </div>
        <div class="tpl-body clearfix">
            <div class="tpl-nav">
                <div class="tpl-keywords">
                   ${str1}
                </div>
                <div class="tpl-category clearfix">
                   ${str2}
                </div>
            </div>
            <div class="tpl-brands imgopacity clearfix">
                <a title="卫衣" href=""><img class="lazy" " alt="潮流时装品牌" src="${item.largesrc}"></a>
            </div>
            <div class="tpl-types imgopacity clearfix">
                <ul>
                   ${str3}
                </ul>
            </div>
        </div>
    </div>`
    
    $(".home-page").append(str)
    })
}


jsonp("https://list.mogujie.com/search").then((res)=>{
	console.log(res.result.wall.list[0])
	var goodsJson = res.result.wall.list;
	showPage(goodsJson);
	//pictureSort(container.children)
})
function showPage(data){
    var str1 ="";
    var str2 ="";
	//console.log(data)
	data.forEach((item,index)=>{
        //console.log(item.title)
        if( index >11)return;
		str1 += `
                <li>
                    <a href="" title="${item.props[1]} ${item.title}"><div class="commodity-img" title="">
                        <i class="top">TOP${index+1}</i>
                        <img class="lazy" alt="${item.props[1]} ${item.title}" src="${item.show.img}"></div>
                        <p class="commodity-name">${item.props[1]} ${item.title}</p>
                        <p class="commodity-price"><span>${item.price}</span></p>
                    </a>
                </li>` ;
    });
    var str =  `<div class="commodity clearfix">
                    <div class="floor-header clearfix" floorid="">
                        <h2 class="floor-title">人气单品 TOP100</h2>
                        <span class="header-navs">MORE</span>
                    </div>
                    <div class="commodity-list">
                        <ul class="g-list imgopacity clearfix">
                            ${str1}
                        </ul>
                    </div>
                    <div class="commodity-brands imgopacity clearfix">
                    </div>
                </div>` ;
    $(".home-page").append(str);
    data.forEach((item)=>{ 
		str2 += `
                <li>
                    <a href="" title="${item.props[1]} ${item.title}"><div class="commodity-img" title="">
                        <img class="lazy" alt="${item.props[1]} ${item.title}" src="${item.show.img}"></div>
                        <p class="commodity-name">${item.props[1]} ${item.title}</p>
                        <p class="commodity-price"><span>${item.price}</span></p>
                    </a>
                </li>` ;
    });
    var str3 =`<div class="commodity clearfix">
                <div class="floor-header clearfix" floorid="">
                    <h2 class="floor-title">新品上架 NEW ARRIVALS</h2>
                    <ul class="header-navs">
                        <li data-classify="">
                        <a href="">卫衣</a>
                        </li>
                        <li data-classify="">
                        <a href="">衬衫</a>
                        </li>
                        <li data-classify="">
                        <a target="" href="">休闲裤</a>
                        </li>
                        <li data-classify="">
                        <a target="" href="">运动鞋</a>
                        </li>
                        <li data-classify="">
                        <a target="" href="">MORE</a>
                        </li>
                    </ul>
                </div>
                <div class="commodity-list">
                    <ul class="g-list imgopacity clearfix">
                        ${str2}
                    </ul>
                </div>
                <div class="commodity-brands imgopacity clearfix">
                </div>
            </div>` ;
     $(".home-page").append(str3);
	//console.log(container.innerHTML) 
}


// $.ajax({
//     type:"get",
//         url:"https://list.mogujie.com/search",
//         async:true,
//         cache:true,
//         dataType:"jsonp",
//         //jsonpCallback:"fn", 
//         success:function(res){ 
//             console.log(res[0])
//             renderPage(res[0]);
//         }
// });
