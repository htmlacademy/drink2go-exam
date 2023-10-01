import { isOutsideClick, isEscapeKey } from './util.js';

const sortForm = document.querySelector('.sort');
const select = sortForm.querySelector('.sort__select');

const customSelectClass = '.custom-select';
const customSelect = document.querySelector('#custom-select')
  .content
  .querySelector(customSelectClass)
  .cloneNode(true);
const customSelectButton = customSelect.querySelector('.custom-select__button');
const customList = customSelect.querySelector('.custom-select__list');
const customItem = customList.querySelector('.custom-select__item');
let selectedCustomOptionNumber;

const openedCustomSelectClass = 'custom-select--opened';
const customOptionsSelector = '.custom-select__option';
const selectedCustomOptionClass = 'custom-select__option--selected';

const customOptions = [];

function createCustomSelect() {
  customItem.remove();

  for (const option of select.options) {
    const itemElement = customItem.cloneNode(true);
    const optionElement = itemElement.querySelector(customOptionsSelector);
    optionElement.textContent = option.textContent;

    if (option.selected) {
      optionElement.classList.add(selectedCustomOptionClass);
      customSelectButton.textContent = option.textContent;
      selectedCustomOptionNumber = option.index;
    }

    customOptions.push(optionElement);
    customList.appendChild(itemElement);
  }

  sortForm.append(customSelect);
}

function openOptions() {
  customSelect.classList.add(openedCustomSelectClass);
  document.addEventListener('click', outsideClickHandler);
  document.addEventListener('keydown', escKeydownHandler);
}

function closeOptions() {
  customSelect.classList.remove(openedCustomSelectClass);
  document.removeEventListener('click', outsideClickHandler);
  document.removeEventListener('keydown', escKeydownHandler);
}

function setSelectedOption(index) {
  customOptions[selectedCustomOptionNumber].classList.remove(selectedCustomOptionClass);
  customOptions[index].classList.add(selectedCustomOptionClass);
  customSelectButton.textContent = customOptions[index].textContent;

  select.selectedIndex = index;
  selectedCustomOptionNumber = index;

  closeOptions();
  sortForm.submit();
}

function outsideClickHandler(evt) {
  if (isOutsideClick(evt, customSelectClass)) {
    closeOptions();
  }
}

function escKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeOptions();
  }
}

sortForm.classList.remove('sort--nojs');
select.removeAttribute('form');
select.tabIndex = -1;
createCustomSelect();

customSelectButton.addEventListener('click', () => customSelect.classList.contains(openedCustomSelectClass) ? closeOptions() : openOptions());

customList.addEventListener('click', (evt) => {
  if (evt.target.closest(customOptionsSelector)) {
    customOptions.forEach((option, index) => {
      if (evt.target === option) {
        setSelectedOption(index);
      }
    });
  }
});
