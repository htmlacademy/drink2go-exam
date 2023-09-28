const slides = document.querySelectorAll('.slider__slide');
const prevButton = document.querySelector('.main-index__slider-button--prev');
const nextButton = document.querySelector('.main-index__slider-button--next');
const sliderSection = document.querySelector('.main-index__slider-section');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('slider__slide--active');
    } else {
      slide.classList.remove('slider__slide--active');
    };
    if (index === slides.length - 1) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    };
    if (index === 0) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }
  });
}

prevButton.addEventListener('click', () => {
  sliderSection.classList.remove(`main-index__slider-section--slider-${currentIndex}-bg`);
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  sliderSection.classList.add(`main-index__slider-section--slider-${currentIndex}-bg`);
  showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
  sliderSection.classList.remove(`main-index__slider-section--slider-${currentIndex}-bg`);
  currentIndex = (currentIndex + 1) % slides.length;
  sliderSection.classList.add(`main-index__slider-section--slider-${currentIndex}-bg`);
  showSlide(currentIndex);
});

const showCurrentSlide = () => showSlide(currentIndex);

export { showCurrentSlide };
