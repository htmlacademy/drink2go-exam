module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

  // add more ready handlers here...
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });
  await page.waitForSelector('.leaflet-marker-icon');
  await page.waitForSelector('.leaflet-tile-loaded');

  await require('./clickAndHoverHelper')(page, scenario);

  if (scenario.content) {
    const [elementHandle] = await page.$x(`//*[contains(text(), '${scenario.content}')]`);
    const selector = await page.evaluate((element) => {
      return element.tagName + '.' + element.className
    }, elementHandle)
    console.log(selector)
    scenario.selectors = [selector]
  }
  if (scenario.showSelectors) {
    await Promise.all(
      scenario.showSelectors.map(async (selector) => {
        await page
          .evaluate((sel) => {
            document.querySelectorAll(sel).forEach(s => {
              s.style.visibility = 'visible';
            });
          }, selector);
      })
    );
  }
};
