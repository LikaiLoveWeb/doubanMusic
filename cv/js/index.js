$(window).load(function(){
    $(".loading").fadeOut(800);
    setTimeout(function(){
    	$('.bg-color').addClass('display');
    	$('#page1').css({'display':'block'});
    },450);
    
    
    var
        oSwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
                swiperAnimateCache(swiper); //隐藏动画元素 
                swiperAnimate(swiper); //初始化完成开始动画
            },
            onSlideChangeEnd: function(swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            }
        });
});