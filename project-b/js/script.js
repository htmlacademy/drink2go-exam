/* в этот файл добавляет скрипты*/

let navMain = document.querySelector('.main-navigation');
let navToggle = document.querySelector('.header__user-navigation-toggle');

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
});

const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.main-index__slider-button--prev');
const nextButton = document.querySelector('.main-index__slider-button--next');
const slides = Array.from(slider.querySelectorAll('.slider__slide'));
const slideCount = slides.length;
let slideIndex = 0;

prevButton.addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  slide();
});

nextButton.addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % slideCount;
  slide();
});

const slide = () => {
  const imageWidth = slider.clientWidth;
  const slideOffset = -slideIndex * imageWidth;
  slider.style.transform = `translateX(${slideOffset}px)`;
}

window.addEventListener('load', () => {
  slide();
});
