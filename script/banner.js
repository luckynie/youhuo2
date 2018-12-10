var swiper = new Swiper('.index-bannerWrap .swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    effect: 'fade',
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
$(".index-bannerWrap").mouseenter(function(){
    swiper.autoplay.stop();
})
$(".index-bannerWrap").mouseleave(function(){
    swiper.autoplay.start();
})
for(let i=0;i<swiper.pagination.bullets.length;i++){
    swiper.pagination.bullets[i].onmouseover=function(){
        this.click();
    };
}
    

var swiper2 = new Swiper('.index-bannerWrap2 .swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });