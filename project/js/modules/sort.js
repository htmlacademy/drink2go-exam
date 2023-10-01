const sortContainer = document.querySelector('.sort');
const sortControl = document.querySelector('.sort__control');
const sortList = document.querySelector('.sort__list');

const closeSort = () => sortContainer.classList.remove('is-open');

const onSortControlClick = () => sortContainer.classList.toggle('is-open');

const onSortTypeChange = (evt) => {
  const sortTypeId = evt.target.id
  const sortTypeLabelText = sortList.querySelector(`[for="${sortTypeId}"]`).textContent;
  sortControl.innerText = sortTypeLabelText;
}

const onDocumentEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSort();
  }
}

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.sort__control') && !evt.target.closest('.sort__list')) {
    closeSort();
  }
}

const initSort = () => {
  sortControl.addEventListener('click', onSortControlClick);
  sortList.addEventListener('change', onSortTypeChange);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
}

export { initSort };
