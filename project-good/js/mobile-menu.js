import { isOutsideClick, isEscapeKey } from './util.js';

const headerSelector = '.header';
const header = document.querySelector(headerSelector);
const openedMenuClass = 'header--mobile-menu-opened';
const closedMenuClass = 'header--mobile-menu-closed';
const headerToggle = document.querySelector('.header__toggle');

function closeMenu() {
  header.classList.remove(openedMenuClass);
  header.classList.add(closedMenuClass);
  headerToggle.querySelector('span').textContent = 'Открыть меню.';
  document.removeEventListener('click', outsideClickHandler);
  document.removeEventListener('keydown', escKeydownHandler);
}

function openMenu() {
  header.classList.remove(closedMenuClass);
  header.classList.add(openedMenuClass);
  headerToggle.querySelector('span').textContent = 'Закрыть меню.';
  document.addEventListener('click', outsideClickHandler);
  document.addEventListener('keydown', escKeydownHandler);
}

function outsideClickHandler(evt) {
  if (isOutsideClick(evt, headerSelector)) {
    closeMenu();
  }
}

function escKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMenu();
  }
}

header.classList.remove('header--nojs');

headerToggle.addEventListener('click', () => header.classList.contains(closedMenuClass) ? openMenu() : closeMenu());
