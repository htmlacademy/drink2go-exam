const navigationContainer = document.querySelector('.header__nav');
const navigationToggle = document.querySelector('.header__site-menu-toggle');

const onNavigationToggleClick = () => navigationContainer.classList.toggle('is-open');

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.header__site-menu-link') && !evt.target.closest('.header__site-menu-toggle')) {
    navigationContainer.classList.remove('is-open');
  }
};

const initMobileMenu = () => {
  navigationToggle.addEventListener('click', onNavigationToggleClick);
  document.addEventListener('click', onDocumentClick);
};

export { initMobileMenu };
