const pagination = document.querySelector('.pagination');

const prevButtonSelector = '.pagination__link--prev';
const prevButton = pagination.querySelector(prevButtonSelector);
const nextButtonSelector = '.pagination__link--next';
const nextButton = pagination.querySelector(nextButtonSelector);

const hiddenButtonClass = 'pagination__link--hidden';

const currentPageClass = 'pagination__link--current';
const currentPage = pagination.querySelector(`.${currentPageClass}`);
let currentPageNumber;

const pages = pagination.querySelectorAll(`.pagination__link:not(${prevButtonSelector}):not(${nextButtonSelector})`);

function setListeners() {
  pagination.addEventListener('click', (evt) => {
    evt.preventDefault();//переход по ссылкам отменен для демонстрации стилей пагинации

    if (evt.target.closest(prevButtonSelector)) {
      setPreviousPage();
    } else if (evt.target.closest(nextButtonSelector)) {
      setNextPage();
    } else {
      pages.forEach((page, index) => {
        if (evt.target === page) {
          setNewPage(currentPageNumber, index);
        }
      });
    }
  });
}

function setNewPage(prevPage, nextPage) {
  pages[prevPage].classList.remove(currentPageClass);
  pages[nextPage].classList.add(currentPageClass);

  currentPageNumber = nextPage;
  setButtonsVisibility();
}

function setPreviousPage() {
  setNewPage(currentPageNumber, currentPageNumber - 1);
  setButtonsVisibility();
}

function setNextPage() {
  setNewPage(currentPageNumber, currentPageNumber + 1);
  setButtonsVisibility();
}

function setButtonsVisibility() {
  if (currentPageNumber === 0) {
    prevButton.classList.add(hiddenButtonClass);
  } else {
    prevButton.classList.remove(hiddenButtonClass);
  }

  if (currentPageNumber === pages.length - 1) {
    nextButton.classList.add(hiddenButtonClass);
  } else {
    nextButton.classList.remove(hiddenButtonClass);
  }
}

pages.forEach((page, index) => {
  if (page === currentPage) {
    currentPageNumber = index;
  }
});

if (pages.length < 2) {
  pagination.style.display = 'none';
} else {
  setListeners();
}
