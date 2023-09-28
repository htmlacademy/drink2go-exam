let navMain = document.querySelector('.main-navigation');
let navToggle = document.querySelector('.header__user-navigation-toggle');

const initMobileMenu = () => {
  navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('main-navigation--closed')) {
      navMain.classList.remove('main-navigation--closed');
      navToggle.classList.remove('header__user-navigation-toggle--closed-navigation');
      navMain.classList.add('main-navigation--opened');
      navToggle.classList.add('header__user-navigation-toggle--opened-navigation');
    } else {
      navMain.classList.add('main-navigation--closed');
      navToggle.classList.add('header__user-navigation-toggle--closed-navigation');
      navMain.classList.remove('main-navigation--opened');
      navToggle.classList.remove('header__user-navigation-toggle--opened-navigation');
    }
  })
};

export { initMobileMenu };
