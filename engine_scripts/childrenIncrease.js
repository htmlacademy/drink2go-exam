const modifyTextAmount = (multiplier, selectors) => {
  const $els = [...document.querySelectorAll(selectors.join(","))].flatMap((el) => [...el.childNodes]);
  for (const $el of $els) {
    if ($el.nodeType !== $el.TEXT_NODE) continue;
    if (!$el.textContent) continue;

    const text = $el.textContent;

    // Умножим строку на меньшее целое число множителя
    const intCnt = Math.floor(multiplier);
    $el.textContent = Array.from({ length: intCnt })
      .map(() => text)
      .join("");

    // Добавим остаток строки из множителя
    const tailMultiplier = multiplier % 1;
    $el.textContent += text.slice(0, Math.floor(text.length * tailMultiplier));
  }
};

const modifyChildrenAmount = (multiplier, selectors) => {
  const $els = [...document.querySelectorAll(selectors.join(","))];
  const getRandomIntBetween = (min, max, seed = 0.5) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(seed * (max - min + 1) + min);
  };
  for (const $el of $els) {
    if ($el.nodeType !== $el.ELEMENT_NODE) {
      throw new Error(
        `По одному из селекторов «${selectors.join("», «")}» найден элемент с неверным nodeType равным ${$el.nodeType}`
      );
    }
    if ($el.childElementCount < 2) continue;
    const newLength = Math.ceil($el.childElementCount * multiplier);

    if (newLength === $el.childElementCount) continue;
    while ($el.childElementCount !== newLength) {
      const idx = getRandomIntBetween(0, $el.childElementCount - 1);
      const $child = $el.children[idx];
      if (newLength < $el.childElementCount) {
        $el.removeChild($child);
      } else if (newLength > $el.childElementCount) {
        $el.appendChild($child.cloneNode(true));
      }
    }
  }
};

const modifyImages = (isBig, selectors) => {
  const $els = [...document.querySelectorAll(selectors.join(","))];
  for (const $el of $els) {
    if ($el.tagName !== "IMG") {
      throw new Error(
        `По одному из селекторов «${selectors.join("», «")}» найден элемент с неверным tagName равным ${
          $el.tagName
        }, должен быть IMG`
      );
    }
    // 1500x1500
    const largeImgSrc =
      "data:image/png;base64,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";
    // 15x15
    const smallImgSrc =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAG1BMVEXMzMyWlpaqqqq3t7ejo6OcnJyxsbG+vr7FxcXPXVcRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAN0lEQVQImWNgIAswKTMwcAQoGTAwAznMAgYMDCxhbOYMAq4JDOyFHA4MAuUCDGxqIJGkBGLMAwAMYQT0Tdpz9wAAAABJRU5ErkJggg==";

    $el.src = isBig ? largeImgSrc : smallImgSrc;
    $el.width = isBig ? 1500 : 15;
  }
};

const defaultTextIncreaseMultiplier = 2.1;
const defaultTextDecreaseMultiplier = 0.4;

const defaultChildrenIncreaseMultiplier = 1.5;
const defaultChildrenDecreaseMultiplier = 0.5;

const defaultTextSelectors = ["a", "button", "h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label", "legend", "li"];
const defaultChildrenSelectors = ["fieldset", "ul", "ol", "dl"];
const defaultImgSelectors = ["img"];

module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  // add more ready handlers here...
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });

  await page.evaluate(modifyChildrenAmount, scenario.multiplier || defaultChildrenIncreaseMultiplier, defaultChildrenSelectors)

};
