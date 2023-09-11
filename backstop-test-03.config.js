/*
# Критерий

Размеры страницы.

У каждой страницы есть минимальная ширина по фрейму.
При ширине окна больше минимальной страница центрируется.
В качестве ориентира для ширины страницы используется фрейм макета.

У страницы должна быть минимальная ширина, чтобы у пользователей с меньшим разрешением при просмотре страницы оставались работоспособны все элементы сайта.

Контент страницы должен быть отцентрирован, чтобы у пользователей с большим разрешением при просмотре страницы контент находился перед глазами — в центре страницы.

# Принцип проверки

- На экране, ширина которого больше, чем размер фрейма, контент центрируется.
- На экране, ширина которого меньше, чем размер фрейма, сохраняются отступы контента по макету.

*/

module.exports = {
  "id": "drink2go test-03",
  "viewports": [
    {
      "label": "desktop",
      "width": 1280,
      "height": 800,
    }
  ],
  "resembleOutputOptions": {
    "ignoreAntialiasing": true,
    "usePreciseMatching": false
  },
  "onReadyScript": "onReady.js",
  "scenarios": [
    {
      "label": "index TEST-03. wide Размеры страницы. Широкий экран",
      "viewports": [
        {
          "label": "desktop wide",
          "width": 1600,
          "height": 800,
        },
      ],
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: ["viewport"],
      misMatchThreshold: 5,
      requireSameDimensions: false,
    },
    {
      "label": "index TEST-03. narrow Размеры страницы. Узкий экран",
      "viewports": [
        {
          "label": "desktop narrow",
          "width": 1200,
          "height": 800,
        },
      ],
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: ["viewport"],
      misMatchThreshold: 5,
      requireSameDimensions: false,
    },
    {
      "label": "index TEST-03. tablet",
      "viewports": [
        {
          "label": "tablet",
          "width": 1024,
          "height": 800,
        },
      ],
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: ["viewport"],
      misMatchThreshold: 5,
      requireSameDimensions: false,
    },
    {
      "label": "index TEST-03. tablet narrow",
      "viewports": [
        {
          "label": "tablet",
          "width": 768,
          "height": 800,
        },
      ],
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: ["viewport"],
      misMatchThreshold: 5,
      requireSameDimensions: false,
    },
    {
      "label": "index TEST-03. mobile",
      "viewports": [
        {
          "label": "mobile",
          "width": 375,
          "height": 800,
        },
      ],
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: ["viewport"],
      misMatchThreshold: 5,
      requireSameDimensions: false,
    },
    {
      "label": "index TEST-03. mobile narrow",
      "viewports": [
        {
          "label": "mobile",
          "width": 320,
          "height": 800,
        },
      ],
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: ["viewport"],
      misMatchThreshold: 5,
      requireSameDimensions: false,
    },
  ],
  fileNameTemplate: '{configId}_{scenarioIndex}_{scenarioLabel}_{selectorIndex}__{viewportIndex}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-03",
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
