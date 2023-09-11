
module.exports = {
  "id": "drink2go Logo",
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
      "label": "index TEST-Logo.",
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      misMatchThreshold: 1,
      selectors: [`[data-test="logo"]`],
      requireSameDimension: true
    },
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-logo",
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
  "debug": false,
  "debugWindow": false
}
