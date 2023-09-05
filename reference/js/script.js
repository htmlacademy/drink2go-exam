"use strict";
const toggleMenuButton = document.querySelector(".js-toggle-button"), mainMenu = document.querySelector(".main-menu"),
  sliderControls = document.querySelectorAll(".slider-control"), slideList = document.querySelectorAll(".slide"),
  sliderPrevButton = document.querySelector(".slider__button--prev"),
  sliderNextButton = document.querySelector(".slider__button--next");
let currentSlideNum = 1;
const toggleMenuButtonClickHandler = e => {
  mainMenu && (mainMenu.classList.toggle("main-menu--open"), e.target.classList.toggle("page-header__nav-toggle--close"))
}, setSlideActive = () => {
  slideList.forEach((e => {
    e.classList.toggle("slide--active", e.getAttribute("id") === "slide-" + currentSlideNum)
  }))
}, setActiveControl = () => {
  sliderControls.forEach((e => {
    e.children[0].classList.toggle("slider__controls-button--active", e.dataset.value === "slide-" + currentSlideNum)
  }))
}, setActiveButtons = () => {
  sliderPrevButton.toggleAttribute("disabled", currentSlideNum <= 1), sliderNextButton.toggleAttribute("disabled", currentSlideNum >= slideList.length)
}, sliderControlsClickHandler = e => {
  const t = e.target.dataset.value;
  t && (currentSlideNum = t.substring(6), setSlideActive(), setActiveButtons(), setActiveControl())
}, sliderPrevButtonClickHandler = () => {
  currentSlideNum--, setSlideActive(), setActiveButtons(), setActiveControl()
}, sliderNextButtonClickHandler = () => {
  currentSlideNum++, setSlideActive(), setActiveButtons(), setActiveControl()
}, mapInit = () => {
  const {lat: e, lng: t} = {title: "Dring2Go", lat: 59.970132, lng: 30.315995},
    l = L.map("map", {scrollWheelZoom: !1}).setView({lat: e, lng: t}, 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>'}).addTo(l);
  const n = L.icon({iconUrl: "./img/pin.svg", iconSize: [38, 50], iconAnchor: [20, 40]});
  L.marker({lat: e, lng: t}, {icon: n}).addTo(l)
}, init = () => {
  mainMenu.classList.remove("main-menu--open"), toggleMenuButton.classList.toggle("page-header__nav-toggle--close"), toggleMenuButton.addEventListener("click", toggleMenuButtonClickHandler), sliderControls.forEach((e => {
    e.addEventListener("click", sliderControlsClickHandler)
  })), sliderPrevButton.addEventListener("click", sliderPrevButtonClickHandler), sliderNextButton.addEventListener("click", sliderNextButtonClickHandler), mapInit()
};
mainMenu.classList.remove("main-menu--open"), toggleMenuButton.classList.toggle("page-header__nav-toggle--close"), toggleMenuButton.addEventListener("click", toggleMenuButtonClickHandler), sliderControls.forEach((e => {
  e.addEventListener("click", sliderControlsClickHandler)
})), sliderPrevButton.addEventListener("click", sliderPrevButtonClickHandler), sliderNextButton.addEventListener("click", sliderNextButtonClickHandler);
  // mapInit();
