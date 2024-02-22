const toggleElement = document.querySelector('.header__menu-toggle');
const menuElement = document.querySelector('.header__menu-dropdown');

const onMenuElementClick = () => {
  menuElement.classList.toggle('header__menu-dropdown--opened');
};

const initHeaderMenuDropdown = () => {
  toggleElement.addEventListener('click', onMenuElementClick);
};

export {initHeaderMenuDropdown};
