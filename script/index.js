$.ajax({
    type:"get",
        url:"json/index.json",
        async:true,
        cache:true,
        success:function(res){ 
            console.log(res[0])
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
        <div class="floor-header clearfix" floorid="">
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
                <a title="卫衣" href=""><img class="lazy" " alt="潮流时装品牌" src="img/0116de8120c74eca1241e6cb059aba851f.jpg"></a>
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

