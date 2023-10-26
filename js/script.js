const hamburger = document.querySelector('.panel__hamburger'),
    mobMenu = document.querySelector('.overlay'),
    mobPanel = document.querySelector('.panel'),
    mobMenuClose = document.querySelector('.menu__close');
    basketCall = document.querySelector('.basketCall'),
    basketClose = document.querySelector('.basket__close'),
    basket = document.querySelector('.basket'),
    basketCallMobile = document.querySelector('.panel__basketCall'),
    videoCall = document.querySelector('.video__call'),
    video = document.querySelector('.advertising'),
    videoClose = document.querySelector('.advertising__close');



    hamburger.addEventListener('click', function () {
        mobMenu.classList.add('overlay-active');
        mobPanel.classList.add('panel-active');
    } );

    mobMenuClose.addEventListener('click', function () {
        mobMenu.classList.remove('overlay-active');
        mobPanel.classList.remove('panel-active');
    });
    
    basketCall.addEventListener('click', function () {
        basket.classList.add('basket-active');
        basketCall.classList.add('basketCall-active');
    });

    basketCallMobile.addEventListener('click', function () {
        basket.classList.add('basket-active');
    });

    basketClose.addEventListener('click', function () {
        basket.classList.remove('basket-active');
        basketCall.classList.remove('basketCall-active');
    });

    videoCall.addEventListener('click', function () {
        video.classList.add('advertising-active')
    });

    videoClose.addEventListener('click', function() {
        video.classList.remove('advertising-active')
    });





///Swiper section "Coupons"///
const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    navigation: {
        nextEl: '.slider-next',
        prevEl: '.slider-prev',
    },
});
