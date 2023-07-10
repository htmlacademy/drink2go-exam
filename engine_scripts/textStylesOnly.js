module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

  const BACKSTOP_TEST_CSS_OVERRIDE = `
  *:where(:not(.visually-hidden, :root, head, script)) {
    background-image: unset !important;
    transform: unset !important;
    margin: unset !important;
    padding: unset !important;
    border: unset !important;
    border-radius: unset !important;
    width: auto !important;
    max-width: unset !important;
    height: auto !important;
    min-height: unset !important;
    min-width: unset !important;
    text-align: unset !important;
    display: inline-block !important;
    position: static !important;
  }
  img, svg, *::before, *::after {
    display: none !important;
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
  await page.evaluate(() => {
    document.querySelectorAll('br').forEach(s => {
      s.remove();
    })
  });
};
