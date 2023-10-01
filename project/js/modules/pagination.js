const paginationButtons = document.querySelectorAll('.pagination__link');
const pageNumberButtons = document.querySelectorAll('.pagination__link:not(.pagination__link--arrow)');
const nextButton = document.querySelector('#next-pagination-button');
const prevButton = document.querySelector('#prev-pagination-button');

const pageCount = pageNumberButtons.length;
let currentPageNumber = 2;

const disableButton = (button) => {
  button.classList.add('pagination__link--disabled');
  button.tabIndex = -1;
};

const activateButton = (button) => {
  button.classList.remove('pagination__link--disabled');
  button.removeAttribute('tabIndex');
};

const checkArrowButtonStatus = () => {
  currentPageNumber === 1 ? disableButton(prevButton) : activateButton(prevButton);
  currentPageNumber === pageCount ? disableButton(nextButton) : activateButton(nextButton);
};

const activateCurrentPageButton = () => {
  pageNumberButtons.forEach((button) => {
    button.classList.remove('pagination__link--current');
    button.removeAttribute('tabIndex');
    const pageIndex = Number(button.textContent);

    if (pageIndex == currentPageNumber) {
      button.classList.add('pagination__link--current');
      button.tabIndex = -1;
    }
  });
};

const setCurrentPage = (pageNum) => {
  currentPageNumber = pageNum;

  activateCurrentPageButton();
  checkArrowButtonStatus();
};

const onPaginationButtonClick = (evt) => {
  evt.preventDefault();

  if (evt.target.closest('.pagination__link') && !evt.target.closest('.pagination__link--arrow')) {
    const pageNumber = Number(evt.currentTarget.textContent);
    setCurrentPage(pageNumber);

    return
  }

  if (evt.target.closest('.pagination__link--arrow')) {
    if (evt.currentTarget.id === 'prev-pagination-button' && currentPageNumber > 1) {
      setCurrentPage(currentPageNumber - 1);

      return
    }

    if (evt.currentTarget.id === 'next-pagination-button' && currentPageNumber < pageCount) {
      setCurrentPage(currentPageNumber + 1);
    }
  }
}

const initPagination = () => {
  setCurrentPage(currentPageNumber);

  paginationButtons.forEach((button) => button.addEventListener('click', onPaginationButtonClick));
}

export { initPagination };
