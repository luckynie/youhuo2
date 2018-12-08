var swiper = new Swiper('.swiper-container', {
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