const PRICE_MIN = 0;
const PRICE_MAX = 980;
const PRICE_STEP = 1;
const PRICE_START = [0, 900];

const priceSliderElement = document.querySelector('.form__range-slider');
const priceMinField = document.querySelector('.form__control-input[name="price-min"]');
const priceMaxField = document.querySelector('.form__control-input[name="price-max"]');

const createSlider = () => noUiSlider.create(priceSliderElement, {
  range: {
    'min': PRICE_MIN,
    'max': PRICE_MAX
  },
  step: PRICE_STEP,
  start: PRICE_START,
  connect: true
});

const onPriceSliderElementUpdate = (values, handle) => {
  const fields = [priceMinField, priceMaxField];
  fields[handle].value = Number(values[handle]);
};

const onPriceMinFieldChange = ({target}) => priceSliderElement.noUiSlider.set([target.value, null]);

const onPriceMaxFieldChange = ({target}) => priceSliderElement.noUiSlider.set([null, target.value]);

const initPriceSlider = () => {
  createSlider();
  priceSliderElement.noUiSlider.on('update', onPriceSliderElementUpdate);
  priceMinField.addEventListener('change', onPriceMinFieldChange);
  priceMaxField.addEventListener('change', onPriceMaxFieldChange);
};

export {initPriceSlider};
