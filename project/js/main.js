import { initMobileMenu } from './modules/mobile-menu.js';
import { initSlider } from './modules/slider.js';
import { initRangeBar } from './modules/range.js';
import { initSort } from './modules/sort.js';
import { initPagination } from './modules/pagination.js';
import { initMapModule } from './modules/map.js';

document.body.classList.remove('no-js');

initMobileMenu();
initSlider();
initRangeBar();
initSort();
initPagination();
// initMapModule();
