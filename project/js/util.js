const isOutsideClick = (evt, element) => !evt.target.closest(element);

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isOutsideClick, isEscapeKey };
