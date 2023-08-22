const indexSections = ['header', 'main', 'hero', 'features', 'catalog', 'map', 'footer'];

module.exports = {
  "id": "drink2go FF",
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
  "scenarios": [
    {
      "label": "index TEST-08.",
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      misMatchThreshold: 2,
      requireSameDimension: false
    },
    ...indexSections.map((section) => ({
      "label": `index ${section} TEST-08`,
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: [`[data-test="${section}"]`],
      misMatchThreshold: 2,
      requireSameDimensions: true,
    })),
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-ff",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "engine_scripts",
    "html_report": "backstop_data/html_report",
  },
  "report": ["browser"],
  "engine": "playwright",
  "engineOptions": {
    "browser": "firefox",
  },
  "debug": false,
  "debugWindow": false
}
