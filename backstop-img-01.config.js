module.exports = {
  "id": "drink2go img",
  "viewports": [
    {
      "label": "desktop",
      "width": 1440,
      "height": 800,
    },
    {
      "label": "tablet",
      "width": 768,
      "height": 800,
    },
    {
      "label": "mobile",
      "width": 320,
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
      "label": "index bg colors",
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      onReadyScript: "hide-bg.js",
      requireSameDimensions: false,
    },
    {
      "label": "index img",
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      hideSelectors: ["body > *"],
      showSelectors: ["img", "svg"],
      requireSameDimensions: false,
    },
  ],
  fileNameTemplate: '{configId}_{scenarioIndex}_{scenarioLabel}_{selectorIndex}__{viewportIndex}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/img-01",
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
