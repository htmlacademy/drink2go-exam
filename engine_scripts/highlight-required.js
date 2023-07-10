module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

  const BACKSTOP_TEST_CSS_OVERRIDE = `
  input[required] {
    outline: solid 10px red !important;
    outline-offset: -10px !important;
  }
  `;

  await require('./overrideCSS')(page, scenario, BACKSTOP_TEST_CSS_OVERRIDE);

  // add more ready handlers here...
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });

};
