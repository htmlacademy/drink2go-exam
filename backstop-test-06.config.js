const indexSections = ['header', 'main', 'hero', 'features', 'catalog', 'map', 'footer'];
module.exports = {
  "id": "drink2go test-06",
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
  "onReadyScript": "onReady.js",
  "resembleOutputOptions": {
    "ignoreAntialiasing": true,
    "usePreciseMatching": false
  },
  "scenarios": [
    ...indexSections.map((section) => ({
      "label": `index ${section} TEST-06. PP.`,
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: [`[data-test="${section}"]`],
      misMatchThreshold: 3,
      requireSameDimensions: true,
    })),
  ],
  fileNameTemplate: '{configId}_{scenarioIndex}_{scenarioLabel}_{selectorIndex}__{viewportIndex}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-06",
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
