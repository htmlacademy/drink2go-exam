/*

Удаляем все стили, кроме базовых
визуально сравниваем параметры шрифтов

*/

const indexSections = [
  { section: 'header', viewports: [{
        "label": "desktop",
        "width": 1440,
        "height": 800,
      }],
    content: ['Главная', 'Доставка'] },
  { section: 'hero', content: ['Новинка!', 'Декаф Флэт Уайт', 'Свежесваренный кофе без кофеина', '225₽', '295₽', 'Заказать'] },
  { section: 'features', content: ['Преимущества', 'Главные причины', 'Скорость', 'Готовый напиток всегда'] },
  { section: 'catalog', content: ['Каталог кофейных напитков', 'Цена', 'Наличие молока', 'Неважно', 'Страна произрастания', 'Бразилия', 'Эфиопия', 'Перу', 'Применить', 'Сбросить', 'Сортировка', 'Кофе без кофеина из Эфиопии', 'В корзину'] },
  { section: 'footer', content: ['Способы оплаты', 'Медиа', 'Санкт-Петербург', 'Разработано', 'HTML Academy'] }
];
module.exports = {
  "id": "drink2go test-05",
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
    "usePreciseMatching": false,
    "scaleToSameSize": true,
  },
  "onReadyScript": "onReady.js",
  "scenarios": [
    ...indexSections.map(({ section, content, viewports }) => ({
      "label": `index ${section} TEST-05. Шрифты.`,
      "url": "http://localhost:3000/index.html",
      "referenceUrl": "./reference/index.html",
      // selectors: [`[data-test="${section}"]`],
      selectors: [],
      // "selectorExpansion": true,
      content,
      viewports,
      onReadyScript: "textStylesOnly.js",
      misMatchThreshold: 1,
    })),
  ],
  fileNameTemplate: '{configId}_{scenarioLabel}_{selectorIndex}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-05",
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
