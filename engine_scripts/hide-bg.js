module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

  // add more ready handlers here...
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });
  const BACKSTOP_TEST_CSS_OVERRIDE = `
  *, *::before, *::after {
    background-image: unset !important;
  }
  `;

  await require('./overrideCSS')(page, scenario, BACKSTOP_TEST_CSS_OVERRIDE);
};
