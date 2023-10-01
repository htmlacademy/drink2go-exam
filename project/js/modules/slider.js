const initSlider = () => {
  const swiper = new Swiper('.slider', {
    grabCursor: true,
    slidesPerView: 1,

    navigation: {
      prevEl: '#prev-hero-button',
      nextEl: '#next-hero-button',
      disabledClass: 'slider__arrow-button--disabled'
    },

    pagination: {
      el: '.slider__pagination',
      bulletElement: 'button',
      bulletClass: 'slider__pagination-button',
      bulletActiveClass: 'slider__pagination-button--active',
      clickable: true
    }
  });
};

export { initSlider };
