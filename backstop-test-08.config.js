/*
проверяем размеры элементов при взаимодействии
если элемент меняет размер - он появится на скриншоте
 */

const indexSections = [
  { section: 'header' },
  { section: 'hero' },
  { section: 'features' },
  { section: 'catalog' },
  { section: 'footer' }
];

module.exports = {
  "id": "drink2go test-08",
  "viewports": [{
    "label": "desktop",
    "width": 1440,
    "height": 800,
  }],
  "resembleOutputOptions": {
    "ignoreAntialiasing": true,
    "usePreciseMatching": false
  },
  "onReadyScript": "onReady.js",
  "onBeforeScript": "jsDisable.js",
  "scenarios": [
    ...indexSections.map(({ section }) => ({
      "label": `index ${section} check hover size`,
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      onReadyScript: "markup-interaction-hover.js",
      hideSelectors: ["body > *"],
      requireSameDimensions: false,
      section
    })),
    ...indexSections.map(({ section }) => ({
      "label": `index ${section} check active size`,
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      onReadyScript: "markup-interaction-active.js",
      hideSelectors: ["body > *"],
      requireSameDimensions: false,
      section
    })),
  ],
  fileNameTemplate: '{configId}_{scenarioLabel}__{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-08",
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
  "asyncCaptureLimit": 10,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
