// var swiper = new Swiper('.swiper-container', {
//     loop: true,
//     slidesPerView: 1,
//     spaceBetween: 30,
//     effect: 'fade',
//     autoplay: {
//         delay: 2000,
//         stopOnLastSlide: false,
//         disableOnInteraction: true,
//     },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// });
// $(".index-bannerWrap").mouseenter(function(){
//     swiper.autoplay.stop();
// })
// $(".index-bannerWrap").mouseleave(function(){
//     swiper.autoplay.start();
// })

$.ajax({
    type:"get",
        url:"json/index.json",
        async:true,
        cache:true,
        success:function(res){ 
            renderPage(res[0]);
        }
});
function renderPage(json){ 
    //console.log(json)
    json.forEach(function(item,index){
        console.log(item)
        var $div1=$("<div>").addClass("tpl-recommed clearfix");
        var str = ` <div class="floor-header clearfix">
                        <h2 class="floor-title">${item.title}</h2>
                        <span class="header-navs">MORE</span>
                    </div>`
        $div1.append(str);
        var $div2 = $("<div>").addClass("tpl-body clearfix"); 
        var $div3 = $("<div>").addClass("tpl-nav");
        var $div4 = $("<div>").addClass("tpl-keywords");
        var str1 ="";
        for(var i=0;i<item.keywordsSrc.length;i++){
            str1 += `<a class="keywords0" href=""><img class="lazy" src="${item.keywordsSrc[i]}"></a>`
        }
        $div4.html(str1);
        $div3.append($div4);
       
        var $div5 = $("<div>").addClass("tpl-category clearfix");
        var str2=""
        for(var j=0;j<item.label.length;i++){
            str2 += `<a href="" title="${item.label[i]}">${item.label[i]}</a>`
        }
        $div3.append($div5);
        console.log($div1);
        $div2.append($div3);
        $("home-page").append($div1);
    })
}