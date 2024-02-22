const togglePrevElement = document.querySelector('.hero__slider-toggle--prev');
const toggleNextElement = document.querySelector('.hero__slider-toggle--next');

const slideElements = document.querySelectorAll('.hero__slider-item');
const paginationButtonElements = document.querySelectorAll('.hero__pagination-button');

const getActiveElementIndex = (NodeCollection) => Array.from(NodeCollection).findIndex((element) => element.classList.contains('active'));

const removeActiveClasses = (index) => {
  slideElements[index].classList.remove('active');
  paginationButtonElements[index].classList.remove('active');
};

const addActiveClasses = (index) => {
  slideElements[index].classList.add('active');
  paginationButtonElements[index].classList.add('active');
};

const onTogglePrevElementClick = () => {
  const index = getActiveElementIndex(slideElements);

  if (index <= 0) {
    return;
  }

  removeActiveClasses(index);
  addActiveClasses(index - 1);
};

const onToggleNextElementClick = () => {
  const index = getActiveElementIndex(slideElements);

  if (index < 0 || index === slideElements.length - 1) {
    return;
  }

  removeActiveClasses(index);
  addActiveClasses(index + 1);
};

const onPaginationButtonElementClick = ({target}) => {
  const oldIndex = getActiveElementIndex(paginationButtonElements);
  removeActiveClasses(oldIndex);

  target.classList.add('active');
  const newIndex = getActiveElementIndex(paginationButtonElements);
  slideElements[newIndex].classList.add('active');
};

const initHeroSlider = () => {
  togglePrevElement.addEventListener('click', onTogglePrevElementClick);
  toggleNextElement.addEventListener('click', onToggleNextElementClick);
  paginationButtonElements.forEach((button) => button.addEventListener('click', onPaginationButtonElementClick));
};

export {initHeroSlider};
