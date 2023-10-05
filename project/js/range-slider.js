const STEP_COUNT = 1;
const RANGE_MIN = 0;
const RANGE_MAX = 1200;
const RANGE_START = 0;
const RANGE_END = 900;
/* global noUiSlider:readonly */
const rangeSlider = document.querySelector('.price__range-slider');
const priceInputs = document.querySelectorAll('.price__range-input');

const initSlider = () => {
  noUiSlider.create(rangeSlider, {
    start: [RANGE_START, RANGE_END],
    connect: true,
    step: STEP_COUNT,
    range: {
      'min': RANGE_MIN,
      'max': RANGE_MAX
    }
  });

  rangeSlider.noUiSlider.on('update', (values, handle) => {
    priceInputs[handle].value = Math.round(values[handle]);
  })

  priceInputs.forEach((element, index) => {
    element.addEventListener('change', () => setRangeSlider(index, element.value))
  })
};

const setRangeSlider = (count, value) => {
  let valuesArray = [null, null];
  valuesArray[count] = value;
  rangeSlider.noUiSlider.set(valuesArray);
};

export { initSlider };
