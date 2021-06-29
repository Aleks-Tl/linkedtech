'use strict';
// JS-функция определения поддержки WebP
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

const menu = document.querySelector('.nav-header__items'),
    navLink = document.querySelector('.nav-header__link'),
    burger = document.querySelector('.burger'),
    overlay = document.querySelector('.overlay'),
    submenu = document.querySelectorAll('.submenu'),
    submenuBack = document.querySelectorAll('.submenu__back'),
    submenuLink = document.querySelectorAll('.submenu__link');

burger.addEventListener('click', () => {
    menu.classList.add('open');
    overlay.classList.add('open');
});

overlay.addEventListener('click', () => {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    submenu.forEach((elem) => {
        elem.classList.remove('transformation');
    });
});

menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-header__link') && !e.target.classList.contains('nav-header__link-dropdown')) {
        e.preventDefault();
        menu.classList.remove('open');
        overlay.classList.remove('open');
    }
    if (e.target.classList.contains('nav-header__link-dropdown')) {
        e.preventDefault();
        e.target.closest('.nav-header__items').classList.add('transformation');
        e.target.closest('.nav-header__item').querySelector('.submenu').classList.add('transformation');
    }
});

for (let i = 0; i < submenuBack.length; i++) {
    submenuBack[i].addEventListener('click', () => {
        submenu.forEach((elem) => {
            elem.classList.remove('transformation');
        });
    });
}

submenuLink.forEach((item) => {
    item.addEventListener('click', () => {
        menu.classList.remove('open');
        overlay.classList.remove('open');
        submenu.forEach((elem) => {
            elem.classList.remove('transformation');
        });
    });
})

const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
    initRatings();
}

// Основная функция
function initRatings() {
    let ratingActive, ratingValue;
    // "Бегаем" по всем рейтингам на странице
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }

    // Инициализируем конкретный рейтинг
    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }

    // Инициализайция переменных
    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }
    // Изменяем ширину активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    // Возможность указать оценку 
    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
                // Обновление переменных
                initRatingVars(rating);
                // Обновление активных звезд
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
                // Обновление активных звезд
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
                // Обновление переменных
                initRatingVars(rating);

                if (rating.dataset.ajax) {
                    // "Отправить" на сервер
                    setRatingValue(ratingItem.value, rating);
                } else {
                    // Отобразить указанную оцнку
                    ratingValue.innerHTML = index + 1;
                    setRatingActiveWidth();
                }
            });
        }
    }
}

