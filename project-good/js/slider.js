const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const slider = document.querySelector('.slider');
const sliderList = slider.querySelector('.slider__list');
const sliderButtonPrev = slider.querySelector('.slider__button--prev');
const sliderButtonNext = slider.querySelector('.slider__button--next');
const sliderTogglers = slider.querySelectorAll('.slider__toggler');
const currentTogglerSelector = 'slider__toggler--current';
const sliderLinks = slider.querySelectorAll('.slide__button');

const slidesNumber = sliderTogglers.length;
const step = Number((100 / slidesNumber).toFixed(2));
let activeSlideIndex = 0;

function setNewSlide(prevSlide, nextSlide) {
  sliderList.style.setProperty('--transform', `translateX(-${step * nextSlide}%)`);

  sliderTogglers[prevSlide].classList.remove(currentTogglerSelector);
  sliderTogglers[nextSlide].classList.add(currentTogglerSelector);

  activeSlideIndex = nextSlide;

  setTabIndex();
}

function setPreviousSlide() {
  if (activeSlideIndex > 0) {
    setNewSlide(activeSlideIndex, activeSlideIndex - 1);
  } else {
    setNewSlide(activeSlideIndex, slidesNumber - 1);
  }
}

function setNextSlide() {
  if (activeSlideIndex < slidesNumber - 1) {
    setNewSlide(activeSlideIndex, activeSlideIndex + 1);
  } else {
    setNewSlide(activeSlideIndex, 0);
  }
}

function setTabIndex() {
  sliderLinks.forEach((link, index) => {
    if (index === activeSlideIndex) {
      link.tabIndex = 0;
    } else {
      link.tabIndex = -1;
    }
  });
}

function setListeners() {
  sliderTogglers.forEach((toggler, index) => {
    if (toggler.classList.contains(currentTogglerSelector)) {
      activeSlideIndex = index;
    }

    toggler.addEventListener('click', () => {
      setNewSlide(activeSlideIndex, index);
    });
  });

  sliderButtonPrev.addEventListener('click', setPreviousSlide);
  sliderButtonNext.addEventListener('click', setNextSlide);

  if (isMobile) {
    const minTouchMoveDistance = 30;
    let touchstartPosition;
    let touchendPosition;

    sliderList.addEventListener('touchstart', (evt) => {
      touchstartPosition = evt.touches[0].clientX;
    });

    sliderList.addEventListener('touchend', (evt) => {
      touchendPosition = evt.changedTouches[0].clientX;

      if (Math.abs(touchendPosition - touchstartPosition) > minTouchMoveDistance) {
        if (touchendPosition > touchstartPosition) {
          setPreviousSlide();
        } else {
          setNextSlide();
        }
      }
    });
  }
}

slider.classList.remove('slider--nojs');
sliderList.style.setProperty('--slides', `${slidesNumber}`);

if (slidesNumber > 1) {
  setTabIndex();
  setListeners();
} else {
  sliderButtonPrev.disabled = true;
  sliderButtonNext.disabled = true;
}
