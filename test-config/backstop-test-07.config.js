/*
проверка состояний по стайлгайду
ищем элементы по текстовому содержанию
 */

const indexSections = [
  { section: 'header', viewports: [{
        "label": "desktop",
        "width": 1440,
        "height": 800,
      }],
    content: ['Главная', 'Доставка', 'Войти', 'Корзина'] },
  { section: 'hero', content: ['Заказать'] },
  { section: 'catalog', content: [
    'по умолчанию', 'Только животное', 'Эфиопия', 'Применить', 'Сбросить',
    'Декаф Флэт Уайт', 'В корзину', '3', 'Назад',
  ] },
  { section: 'footer', content: [
    'Доставка', '+7 (999) 999-99-99', 'HTML Academy',
  ] }
].flatMap(item => item.content.map(content => ({ ...item, content })));

module.exports = {
  "id": "drink2go test-07",
  "viewports": [
    {
      "label": "desktop",
      "width": 800,
      "height": 600,
    }
  ],
  "onReadyScript": "onReady.js",
  "scenarios": [
    ...indexSections.flatMap(({ section, viewports, content }, idx) => [/*'normal',*/ 'hover', 'active', 'focus', 'disable'].map(state => ({
        "label": `index ${section} TEST-07. ${idx + 1} ${state}`,
        viewports,
        "url": "http://localhost:3000/index.html",
        "referenceUrl": "./reference/index.html",
        selectors: [],
        content,
        section,
        [`${state}Selector`]: '*',
        onReadyScript: "interaction.js",
        postInteractionWait: 500,
        misMatchThreshold: 1,
      })
    )),
  ],
  fileNameTemplate: '{configId}_{scenarioLabel}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/test-07",
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
