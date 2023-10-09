module.exports = async (page, scenario, vp, isReference) => {
  console.log('SCENARIO > ' + scenario.label);
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });
  if (scenario.content) {
    function xpathPrepare(xpath, searchString) {
      return xpath.replace("$u", searchString.toUpperCase())
                  .replace("$l", searchString.toLowerCase())
                  .replace("$s", searchString.toLowerCase());
    }

    const ancestor = `*[@data-test="${scenario.section}"]`

    const [elementHandle] = await page.$x(`//${ancestor}//${xpathPrepare("*[text()[contains(translate(., '$u', '$l'), '$s')]]", scenario.content)}`);
    if (!elementHandle) {
      throw new Error('Element not found with text "' + scenario.content + '"');
    }
    const selector = await page.evaluate((element, text) => {
      const closest = element.closest('a, button, label, select');
      if (!closest) {
        return null;
      }
      closest.dataset.testText = text
      return closest.tagName + '[data-test-text="' + text + '"]' + (closest.classList.length ? '.' + Array.from(closest.classList).join('.') : '')
    }, elementHandle, scenario.content)
    if (!selector) {
      throw new Error('Selector not found for text "' + scenario.content + '"');
    }

    // const parentSelector = await page.evaluate((element) => {
    //   const closest = element.closest('a, button, label, select');
    //   let parent = closest.parentElement || document.body;
    //   while (parent.clientWidth < (closest.clientWidth + 10) || parent.clientHeight < (closest.clientHeight + 10)) {
    //     parent = parent.parentElement
    //   }
    //   parent.dataset.testText = 'parent'
    //   return parent.tagName + '[data-test-text="parent"]' + '.' + Array.from(parent.classList).join('.')
    // }, elementHandle)
    scenario.selectors = [`[data-test="${scenario.section}"] ${selector}`]

    // scenario.scrollToSelector = selector
    console.log({ selector })

    if (scenario.hoverSelectors || scenario.hoverSelector) {
      scenario.hoverSelectors = [selector]
    }
    if (scenario.activeSelectors || scenario.activeSelector) {
      scenario.activeSelectors = [selector]
    }
    if (scenario.focusSelectors || scenario.focusSelector) {
      scenario.focusSelectors = [selector]
    }
    if (scenario.disableSelectors || scenario.disableSelector) {
      scenario.disableSelectors = [selector]
    }
  }
  await require('./clickAndHoverHelper')(page, scenario);
};
