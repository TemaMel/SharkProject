const hamburger = document.querySelector('.panel__hamburger'),
    mobMenu = document.querySelector('.overlay'),
    mobPanel = document.querySelector('.panel'),
    mobMenuClose = document.querySelector('.menu__close');
    basketCall = document.querySelector('.basketCall'),
    basketClose = document.querySelector('.basket__close'),
    basket = document.querySelector('.basket'),
    basketCallMobile = document.querySelector('.panel__basketCall'),
    basketWrapper = document.querySelector('.basket__wrapper');

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




    ///Счетчик в корзине/////

window.addEventListener('click', function(event) {

    let counter;

    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {

        const counterWrapper = event.target.closest('.basket__item-counter');
        counter = counterWrapper.querySelector('[data-counter]');

    }

    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerHTML;
    }

    if (event.target.dataset.action === 'minus') {

        if (parseInt(counter.innerHTML) > 1) {

            counter.innerHTML = --counter.innerHTML;
            
        } else if (event.target.closest('.basket__wrapper') && parseInt(counter.innerText) === 1) {
            
            //Удаление товара из корзины
            event.target.closest('.basket__item').remove();
            // Отображение статуса товара в корзине Пустая/полная
            toggleCartStatus();
            //Пересчет общей стоимости товаров в корзине
            calcBasketPrice ();
        }
    }

    if (event.target.hasAttribute('data-action') && event.target.closest('.basket__wrapper')) {

        //Пересчет общей стоимости товаров в корзине
        calcBasketPrice ();
    }

})

    ///Добавление в корзину///


function calcBasketPrice() {
    const basketItems = document.querySelectorAll('.basket__item');
    const totalPriceEl = document.querySelector('.basket__finish-price');

    let totalPrice = 0;

    basketItems.forEach(function (item) {

        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('.basket__item-price');
        const currentPrice = parseInt(amountEl.innerHTML) * parseInt(priceEl.innerHTML);
        totalPrice += currentPrice;
    });


    //Отображаем цену на страницу
    totalPriceEl.innerHTML = totalPrice;
};

function toggleCartStatus () {
    const basketWrapper = document.querySelector('.basket__wrapper');
    const basketEmpty = document.querySelector('.basket__empty');
    // const basketWrapper = document.querySelector('.basket__wrapper');

    if (basketWrapper.children.length > 0) {
        console.log('FULL');
        basketWrapper.classList.remove('basket-none');
        basketEmpty.classList.add('basket-none');
    } else {
        basketWrapper.classList.add('basket-none');
        basketEmpty.classList.remove('basket-none');
    }
}

window.addEventListener('click', function(event) {
    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.product__item');
        
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product__item-img').getAttribute('src'),
            title: card.querySelector('.product__title').innerHTML,
            description: card.querySelector('.product__item-descr').innerHTML,
            price: card.querySelector('.product__item-price').innerHTML,
        };

        const itemInBasket = basketWrapper.querySelector('[data-id="${productInfo.id}"]');

        if(itemInBasket) {

            counterEl = itemInBasket.querySelector('[data-counter]');
            counterEl.innerHTML = parseInt(counterEl.innerHTML) + parseInt(productInfo.counter);

        } else {
            const cartItemHtml = `
            <div class="basket__item" data-id="${productInfo.id}">
            <img src="${productInfo.imgSrc}" alt="${productInfo.title}" class="basket__item-img">
            <div class="basket__item-info">
                <h3 class="basket__item-title">${productInfo.title}</h3>
                <span class="basket__item-descr">${productInfo.description}</span>
            </div>
            <span class="basket__item-price">
                ${productInfo.price}
            </span>
            <div class="basket__item-counter">
                <span data-action="minus">-</span>
                <span data-counter="">1</span>
                <span data-action="plus">+</span>
            </div>
            </div>`
            
            basketWrapper.insertAdjacentHTML('beforeend', cartItemHtml);
        }
        

        toggleCartStatus();

        calcBasketPrice();
    }
});