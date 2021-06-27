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



