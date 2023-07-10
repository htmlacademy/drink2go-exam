module.exports = async (page, scenario, BACKSTOP_TEST_CSS_OVERRIDE = 'html {background-image: none;}') => {
  // inject arbitrary css to override styles
  await page.evaluate(`window._styleData = '${BACKSTOP_TEST_CSS_OVERRIDE.replace(/\n/g, '')}';`);

  await page.evaluate(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    const styleNode = document.createTextNode(window._styleData);
    style.appendChild(styleNode);
    document.head.appendChild(style);
  });

  console.log('BACKSTOP_TEST_CSS_OVERRIDE injected for: ' + scenario.label);
};
