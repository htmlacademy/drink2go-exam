module.exports = {
  "id": "drink2go swiper",
  "viewports": [
    {
      "label": "desktop",
      "width": 1440,
      "height": 800,
    },
  ],
  "resembleOutputOptions": {
    "ignoreAntialiasing": true,
    "usePreciseMatching": false
  },
  "onReadyScript": "onReady.js",
  "scenarios": [
    {
      "label": "index JS-1. next",
      "url": "http://localhost:3000/",
      "referenceUrl": "./reference/index.html",
      misMatchThreshold: 3,
      requireSameDimension: false,
      clickSelectors: ['.slider-button-next'],
      postInteractionWait: 500,
      selectors: [`[data-test="hero"]`],
    },
    {
      "label": "index JS-1. prev",
      "url": "http://localhost:3000/",
      "referenceUrl": "./reference/index.html",
      misMatchThreshold: 3,
      requireSameDimension: false,
      clickSelectors: ['.slider-button-next', '.slider-button-prev'],
      postInteractionWait: 500,
      selectors: [`[data-test="hero"]`],
    },
    {
      "label": "index JS-1. bullet",
      "url": "http://localhost:3000/",
      "referenceUrl": "./reference/index.html",
      misMatchThreshold: 3,
      requireSameDimension: false,
      clickSelectors: ['.slider-pagination > *:nth-child(3) button'],
      postInteractionWait: 500,
      selectors: [`[data-test="hero"]`],
    },
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-swiper",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "engine_scripts",
    "html_report": "backstop_data/html_report",
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"],
    "gotoParameters": { "waitUntil": ["load", "networkidle0"], timeout: 20000 },
  },
  "asyncCaptureLimit": 0,
  "debug": false,
  "debugWindow": false
}
