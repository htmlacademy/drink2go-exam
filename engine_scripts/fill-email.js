module.exports = async (page, scenario, vp, isReference) => {
  console.log('SCENARIO > ' + scenario.label);
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });
  await page.type(scenario.field, scenario.email);
  await require('./clickAndHoverHelper')(page, scenario);
};
