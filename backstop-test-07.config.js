/*
проверка состояний по стайлгайду
ищем элементы по текстовому содержанию
 */

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
    ...[
      { page: 'index', selector: 'viewport', content: 'Главная' },
      { page: 'index', selector: 'viewport', content: 'Каталог' },
      { page: 'index', selector: 'viewport', content: 'Войти' },
      { page: 'index', selector: 'viewport', content: 'Корзина' },
      { page: 'index', selector: 'viewport', content: 'Заказать' },
      { page: 'index', selector: 'viewport', content: 'по умолчанию' },
      { page: 'index', selector: 'viewport', content: 'Только животное' },
      { page: 'index', selector: 'viewport', content: 'Эфиопия' },
      { page: 'index', selector: 'viewport', content: 'Применить' },
      { page: 'index', selector: 'viewport', content: 'Сбросить' },
      { page: 'index', selector: 'viewport', content: 'Декаф Флэт Уайт', ancestor: '*[@data-test="catalog"]' },
      { page: 'index', selector: 'viewport', content: 'В корзину' },
      { page: 'index', selector: 'viewport', content: '3' },
      { page: 'index', selector: 'viewport', content: 'Назад' },
      { page: 'index', selector: 'viewport', content: 'Доставка', ancestor: '*[@data-test="footer"]' },
      { page: 'index', selector: 'viewport', content: '+7 (999) 999-99-99', ancestor: '*[@data-test="footer"]' },
      { page: 'index', selector: 'viewport', content: 'HTML Academy' },
    ].flatMap(({page, selector, content, ancestor }, idx) => [/*'normal',*/ 'hover', 'active', 'focus', 'disable'].map(state => ({
        "label": `${page} TEST-07. ${state} ${idx}`,
        "url": `http://localhost:3000/${page}.html`,
        "referenceUrl": `./reference/${page}.html`,
        selectors: [selector],
        content,
        ancestor,
        [`${state}Selector`]: '*',
        onReadyScript: "interaction.js",
        postInteractionWait: 500,
      })
    )),
  ],
  fileNameTemplate: '{configId}_{scenarioIndex}_{scenarioLabel}_{selectorIndex}__{viewportIndex}_{viewportLabel}',
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
    "gotoParameters": { "waitUntil": ["load", "networkidle0"], timeout: 10000 },
  },
  "asyncCaptureLimit": 10,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
