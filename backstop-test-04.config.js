/*
# Критерий

Переполнение.

Текст должен оставаться в рамках родительского блока при переполнении и не должен обрезаться или вываливаться из него. Родительский блок должен сохранять минимальные размеры при недополнении. Контент больше ширины родителя не должен выходить за его пределы. При увеличении количества элементов они должны оставаться в рамках родительского блока.

# Принцип проверки

- «липкий футер» проверяем удалением элементов из main.
- на переполнение текстом проверяем "a", "button", "h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label", "legend", "li"
- пропорционально уменьшаем длину текста в блоках.
- пропорционально увеличиваем длину текста в блоках.
- изменение количества потомков проверяем для элементов "fieldset", "ul", "ol", "dl"
- пропорционально уменьшаем количество потомков элементов.
- пропорционально увеличиваем количество потомков элементов.
- проверяем переполнение изображениями

 */

const indexSections = ['header', 'main', 'hero', 'features', 'catalog', 'map', 'footer'];
module.exports = {
  "id": "drink2go test-04",
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
  "scenarios": [
    {
      "label": `index TEST-04. sticky footer.`,
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      removeSelectors: ["[data-test='main'] > *"],
      misMatchThreshold: 1,
      requireSameDimensions: false,
    },
    ...indexSections.map((section) => ({
      "label": `index ${section} TEST-04. textDecrease.`,
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: [`[data-test="${section}"]`],
      onReadyScript: "textDecrease.js",
      misMatchThreshold: 1,
      requireSameDimensions: false,
    })),
    ...indexSections.map((section) => ({
      "label": `index ${section} TEST-04. textIncrease.`,
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: [`[data-test="${section}"]`],
      onReadyScript: "textIncrease.js",
      misMatchThreshold: 2,
      requireSameDimensions: false,
    })),
    ...indexSections.map((section) => ({
      "label": `index ${section} TEST-04. childrenDecrease.`,
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: [`[data-test="${section}"]`],
      onReadyScript: "childrenDecrease.js",
      misMatchThreshold: 2,
      requireSameDimensions: false,
    })),
    ...indexSections.map((section) => ({
      "label": `index ${section} TEST-04. childrenIncrease.`,
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      selectors: [`[data-test="${section}"]`],
      onReadyScript: "childrenIncrease.js",
      multiplier: 1.5,
      misMatchThreshold: 2,
      requireSameDimensions: false,
    })),
    {
      "label": "index TEST-04. imgDecrease.",
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      onReadyScript: "imgDecrease.js",
      misMatchThreshold: 1,
      requireSameDimensions: false,
    },
    {
      "label": "index TEST-04. imgIncrease.",
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      onReadyScript: "imgIncrease.js",
      misMatchThreshold: 1,
      requireSameDimensions: false,
    },
    {
      "label": "index TEST-04. imgLandscape",
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      onReadyScript: "imgLandscape.js",
      misMatchThreshold: 1,
      requireSameDimensions: false,
    },
    {
      "label": "index TEST-04. imgPortrait",
      "url": "./project/index.html",
      "referenceUrl": "./reference/index.html",
      onReadyScript: "imgPortrait.js",
      misMatchThreshold: 1,
      requireSameDimensions: false,
    },
  ],
  fileNameTemplate: '{configId}_{scenarioIndex}_{scenarioLabel}_{selectorIndex}__{viewportIndex}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-04",
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
  "resembleOutputOptions": {
    "ignoreAntialiasing": true,
    "usePreciseMatching": false
  },
  "asyncCaptureLimit": 10,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
