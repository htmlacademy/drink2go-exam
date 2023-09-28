module.exports = async (page, { section = 'body' }, vp) => {
  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });
  const interactiveElsSelector = `${section} :is(a, button, label, input[type='radio'], input[type='checkbox'])`;
  const content = `
      const preventer = (e) => e.preventDefault();
      const els = document.querySelectorAll("${interactiveElsSelector}");
      const mouseEvts = ["mouseup", "mousedown", "click"];

      els.forEach((el) => {
        mouseEvts.forEach((me) => el.addEventListener(me, preventer));
      });
    `;
  await page.addScriptTag({ content });

  // 1. Получаем список интерактивных элементов: a, button, input[radio, checkbox]
  const elts = await page.$$(interactiveElsSelector);

  const eq = (l, r) => {
    if (l === null && r === null) {
      return true;
    }
    if (l === null || r === null) {
      return false;
    }

    return l.x === r.x && l.y === r.y && l.width === r.width && l.height === r.height;
  };
  const diff = (l, r) => {
    if (l === null && r === null) {
      return true;
    }
    if (l === null || r === null) {
      return false;
    }
    return {
      x: l.x - r.x,
      y: l.y - r.y,
      width: l.width - r.width,
      height: l.height - r.height
    }
  }
  const results = [];
  for await (const el of elts) {
    const isVisibleHandle = await page.evaluateHandle((e) => {
      const style = window.getComputedStyle(e);
      return (style && style.display !== 'none' &&
        style.visibility !== 'hidden' && style.opacity !== '0' && !e.classList.contains('visually-hidden'));
    }, el);
    const visible = await isVisibleHandle.jsonValue();
    const box = await el.boxModel();
    if (!visible || !box) {
      continue;
    }

    await el.evaluate((element) => {
      element.scrollIntoView({block: 'center', inline: 'center', behavior: 'instant'});
    })
    const bb = await el.boundingBox();
    if (bb.width === 0 || bb.height === 0) {
      // await el.evaluate((h) => h.style.visibility = 'visible');
      continue;
    }

    // JSHandle следующего элемента
    const nh = await el.evaluateHandle((e) => e.nextElementSibling || e.parentElement, el);
    // ElementHandle
    const ne = nh.asElement();
    const nb = ne ? await ne.boundingBox() : null;
    const code = await el.evaluate((h) => h.outerHTML);
    if (!nb) {
      console.log("no next element", code);
    }

    // эмулируем page.mouse.move(координаты элемента),
    //   el.hover() тоже подойдёт
    await el.hover();

    const bbHover = await el.boundingBox();
    const nbHover = ne ? await ne.boundingBox() : null;

    // затем page.mouse.down()
    await page.mouse.down();

    const bbActive = await el.boundingBox();
    const nbActive = ne ? await ne.boundingBox() : null;

    // чтобы можно было кликнуть следующий элемент, поднимаем палец с кнопки
    await page.mouse.up();

    // 3. После каждой эмуляции
    // 3.1. Смотрим размеры и позицию самого элемента
    // 3.2. Смотрим размеры и позицию следующего элемента (надеюсь, этого хватит)
    // Если размеры какого-то элемента меняются, репортим
    if (!eq(bbActive, bbHover)) {
      results.push({
        code,
        diff: diff(bbActive, bbHover),
        title: "В состоянии «:hover» позиция/размеры меняются"
      });
      await el.evaluate((h) => h.style.visibility = 'visible');
    } else if (!eq(nbActive, nbHover)) {
      results.push({
        code,
        diff: diff(nbActive, nbHover),
        title: "В состоянии «:hover» позиция/размеры следующего элемента меняются"
      });
      await el.evaluate((h) => h.style.visibility = 'visible');
    } else if (!eq(bb, bbActive)) {
      results.push({
        code,
        diff: diff(bb, bbActive),
        title: "В состоянии «:active» позиция/размеры меняются"
      });
      await el.evaluate((h) => h.style.visibility = 'visible');
    } else if (!eq(nb, nbActive)) {
      results.push({
        code,
        diff: diff(nb, nbActive),
        title: "В состоянии «:active» позиция/размеры следующего элемента меняются"
      });
      await el.evaluate((h) => h.style.visibility = 'visible');
    }

    nh.dispose();
  }
  if (results.length) {
    // throw new Error(results.map((r) => r.title + '\n' + r.code + '\n' + JSON.stringify(r.diff)).join('\n'));
  }
}
