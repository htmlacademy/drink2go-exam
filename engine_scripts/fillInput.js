module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  // add more ready handlers here...
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });
  await page.evaluate(() => {
    const $textEls = [...document.querySelectorAll('input[type="text"],input[type="email"]')];
    $textEls.forEach((el) => {
      el.value = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
    });
    const $numberEls = [...document.querySelectorAll('input[type="number"]')];
    $numberEls.forEach((el) => {
      el.value = 999999999999999;
    });
  });
};
