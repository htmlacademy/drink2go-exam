/*
* показываем обязательные поля формы
* проверяем отправку формы
* */

module.exports = {
  "id": "drink2go form",
  "viewports": [
    {
      "label": "desktop",
      "width": 1440,
      "height": 800,
    },
  ],
  "resembleOutputOptions": {
    "ignoreAntialiasing": true,
    "usePreciseMatching": true
  },
  "onReadyScript": "onReady.js",
  "scenarios": [
    {
      "label": "index form send",
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      clickSelector: "[data-test=catalog] button[type='submit']",
      "viewports": [
        {
          "label": "desktop",
          "width": 800,
          "height": 600,
        },
      ],
      // onReadyScript: "fill-email.js",
      // email: "test@test.com",
      // field: "[data-test=subscribe] input",
      postInteractionWait: 1000,
    },
  ],
  fileNameTemplate: '{configId}_{scenarioIndex}_{scenarioLabel}_{selectorIndex}__{viewportIndex}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/html-04",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "engine_scripts",
    "html_report": "backstop_data/html_report",
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"],
    "gotoParameters": { "waitUntil": ["load", "networkidle0"], timeout: 10000 },
  },
  "asyncCaptureLimit": 10,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
