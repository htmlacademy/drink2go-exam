const HANDLE_LOWER_ID = 0;
const HANDLE_UPPER_ID = 1;

const rangeBar = document.querySelector('.range__bar');
const fieldMin = document.querySelector('#range-min');
const fieldMax = document.querySelector('#range-max');
const resetButton = document.querySelector('.filter__button-wrapper [type=reset]');

const RangeBarSetup = {
  INIT_START_VALUE: fieldMin.value || Number(fieldMin.min),
  INIT_END_VALUE: fieldMax.value || Number(fieldMax.max),
  STEP: Number(fieldMin.step) || Number(fieldMax.step) || 5,
  RANGE_MIN: Number(fieldMin.min),
  RANGE_MAX: Number(fieldMax.max),
  IS_CONNECT: true,
  CSS_PREFIX: 'range__bar-',
}

const createRangeBar = () => {
  noUiSlider.create(rangeBar, {
    start: [RangeBarSetup.INIT_START_VALUE, RangeBarSetup.INIT_END_VALUE],
    step: RangeBarSetup.STEP,
    range: {
      'min': RangeBarSetup.RANGE_MIN,
      'max': RangeBarSetup.RANGE_MAX
    },
    connect: RangeBarSetup.IS_CONNECT,
    cssPrefix: RangeBarSetup.CSS_PREFIX,
    handleAttributes: [
      {
        'aria-label': 'Уменьшить.'
      },
      {
        'aria-label': 'Увеличить.'
      }
    ]
  });
}

const checkDisabledStatus = () => {
  const handleLower = document.querySelector('.range__bar-handle-lower');
  const handleUpper = document.querySelector('.range__bar-handle-upper');

  if (Array.from(rangeBar.classList).includes('range__bar--disabled')) {
    rangeBar.noUiSlider.disable();
    handleLower.style.cursor = 'not-allowed';
    handleUpper.style.cursor = 'not-allowed';
    fieldMin.disabled = true;
    fieldMax.disabled = true;

    return
  }

  if (fieldMin.disabled) {
    rangeBar.noUiSlider.disable(HANDLE_LOWER_ID);
    handleLower.style.cursor = 'not-allowed';
  }

  if (fieldMax.disabled) {
    rangeBar.noUiSlider.disable(HANDLE_UPPER_ID);
    handleUpper.style.cursor = 'not-allowed';
  }
};

const onRangeBarUpdate = ([startValue, endValue]) => {
  fieldMin.value = Number(startValue);
  fieldMax.value = Number(endValue);
}

const onFieldValueChange = () => rangeBar.noUiSlider.set([fieldMin.value, fieldMax.value]);

const onResetButtonClick = () => rangeBar.noUiSlider.reset();

const initRangeBar = () => {
  createRangeBar();
  checkDisabledStatus();

  rangeBar.noUiSlider.on('update', onRangeBarUpdate);
  fieldMin.addEventListener('change', onFieldValueChange);
  fieldMax.addEventListener('change', onFieldValueChange);
  resetButton.addEventListener('click', onResetButtonClick);
}

export { initRangeBar };
