import {afterAll, beforeAll, beforeEach, describe, expect, test} from 'vitest'
import type {PreviewServer} from 'vite'
import {preview} from 'vite'
import type {Browser, Locator, Page, } from 'playwright'
import {chromium} from 'playwright'
import {toMatchImageSnapshot} from 'jest-image-snapshot'
// import {expect as playwrightExpect, test as playwrightTest} from "@playwright/test";
import imageDiff from 'lcs-image-diff'
import Jimp from "jimp/es";
import crypto from 'crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import ssim from "ssim.js";

declare module 'vitest' {
  interface Assertion<T> {
    toMatchImageSnapshot({}): T
  }
}

expect.extend({ toMatchImageSnapshot })

function createHash(data) {
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex');
}

/**
 * Retrieve a computed style for an element.
 *
 * @function getStyle
 * @async
 * @param locator {Locator} The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param property {string} The CSS property for the style to retrieve
 * @returns Promise<string> The style value
 */
export const getStyle = async (locator: Locator, property: string): Promise<string> => {
  return locator.evaluate( (el, property) => window.getComputedStyle(el)
    .getPropertyValue(property), property );
};

// unstable in Windows, TODO: investigate

let server: PreviewServer
let browser: Browser
let page: Page

beforeAll(async () => {
  server = await preview({
    build: {
      outDir: 'build'
    },
    configFile: false,
    preview: {
      port: 3000,
      // open: true,
    }
  })
  browser = await chromium.launch()
  page = await browser.newPage()
})

afterAll(async () => {
  await browser.close()
  await new Promise<void>((resolve, reject) => {
    server.httpServer.close(error => error ? reject(error) : resolve())
  })
})

test('mobile viewport', async () => {
  await page.setViewportSize({
    width: 320,
    height: 480,
  });
  await page.goto('http://localhost:3000')
  const pageShot = await page.screenshot()
  expect(pageShot)
    .toMatchImageSnapshot({
      allowSizeMismatch: true,
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
      comparisonMethod: 'ssim',
      blur: 1,
    })
})

const viewports = [
  { name: 'mobile', dimensions: { width: 320, height: 480 } },
  { name: 'tablet', dimensions: { width: 768, height: 480 } },
  { name: 'desktop', dimensions: { width: 1440, height: 480 } },
]

const elements = ['page', 'header', 'main', 'footer'];

const snapshotOptions = {
  allowSizeMismatch: true,
  failureThreshold: 0.15,
  failureThresholdType: 'percent',
  comparisonMethod: 'ssim',
  blur: 2,
}

describe('test structure', () => {
  for (const { name, dimensions } of viewports) {
    for (const elementName of elements) {
      test(`${name} ${elementName}`, async () => {
        await page.setViewportSize(dimensions);
        await page.goto('http://localhost:3000')

        let elementShot: Buffer;
        if (elementName === 'page') {
          elementShot = await page.screenshot({
            animations: 'disabled',
            fullPage: true
          });
        } else {
          const element = page.getByTestId(elementName);
          elementShot = await element.screenshot({
            animations: 'disabled',
          });
        }

        expect(elementShot)
          .toMatchImageSnapshot(snapshotOptions);
      })
    }
  }
})
describe.each([320, 768, 1440])('test elements pp on %i width', async (width) => {
  const elements = ['logo', 'hero', 'features', 'catalog-form', 'products-list', 'map', 'social', 'user']
  const browser = await chromium.launch()
  const context = await browser.newContext()
  describe('elements', () => {
    test.each(elements)('element %s', async (elId) => {
      const page = await context.newPage()
      await page.setViewportSize({
        width,
        height: 800,
      });
      await page.goto('http://localhost:3000')
      const element = page.getByTestId(elId).first()
      await element.scrollIntoViewIfNeeded()
      const elementShot = await element.screenshot({
        animations: 'disabled',
      })
      expect(elementShot)
        .toMatchImageSnapshot({
          customDiffConfig: {
            // ssim: 'weber',
            windowSize: 8,
          },
          allowSizeMismatch: true,
          failureThreshold: 0.1,
          failureThresholdType: 'percent',
          comparisonMethod: 'ssim',
          blur: 1,
        })
    })
  })
})
describe.each([320, 768, 1440])('базовые текстовые стили для ширины %i', async (width) => {
  const browser = await chromium.launch()
  const elements = [
    ['Интернет-магазин', false],
    ['Главная', true],
    ['Доставка', true],
    ['Новинка!', true],
    ['Декаф Флэт Уайт', true],
    ['Свежесваренный кофе без кофеина', false],
    ['295₽', true],
    ['225₽', true],
    ['Заказать', true],
    ['Преимущества', true],
    ['Главные причины выбрать', false],
    ['Скорость', true],
    ['Готовый напиток всегда', false],
    ['Каталог', true],
    ['Каталог кофейных напитков', true],
    ['Цена', true],
    ['Наличие молока', true],
    ['Применить', false],
    ['Сбросить', false],
    ['Сортировка:', true],
    ['натуральным фермерским молоком', false],
    ['В корзину', true],
    ['Назад', true],
    ['1', true],
    ['2', true],
    ['Медиа', true],
    ['Блог', true],
    ['Разработано в', false],
    ['HTML Academy', false],
  ]
  const page = await browser.newPage()
  await page.setViewportSize({
    width,
    height: 800,
  });
  test.each(elements)('element %s', async (text: string, exact: boolean) => {
    await page.goto('http://localhost:3000')
    const element = page.getByText(text, { exact }).first()
    const [ color,  fontSize, lineHeight ] = await Promise.all([
      getStyle(element, 'color'),
      getStyle(element, 'font-size'),
      getStyle(element, 'line-height')
    ]);
    expect({ color, fontSize, lineHeight }).toMatchSnapshot();
  })
})
describe('текстовые стили при наведении', async () => {
  const elements = [
    ['Главная', true],
    ['Доставка', true],
    ['Войти', true],
    ['Корзина', true],
    ['Заказать', true],
    ['Применить', false],
    ['Сбросить', false],
    ['В корзину', true],
    ['Назад', true],
    ['1', true],
    ['Блог', true],
    ['HTML Academy', false],
  ]
  test.each(elements)('hover element %s', async (text: string, exact: boolean) => {
    await page.setViewportSize({
      width: 1440,
      height: 480,
    });
    await page.goto('http://localhost:3000')
    const element = page.getByText(text, { exact }).first()
    await element.hover()
    const [ color, backgroundColor,  opacity ] = await Promise.all([
      getStyle(element, 'color'),
      getStyle(element, 'background-color'),
      getStyle(element, 'opacity')
    ]);
    expect({ color, backgroundColor, opacity }).toMatchSnapshot();
  })
})
describe('interactive element styles', async () => {
  beforeEach(async () => {
    await page.setViewportSize({
      width: 1440,
      height: 480,
    });
    await page.goto('http://localhost:3000')
  })

  function getLoginButton() {
    const userBlock = page.getByTestId('user')
    return userBlock
      .getByRole('link').or(userBlock.getByRole('button'))
      .filter({ has: page.getByText('Войти') });
  }

  async function takeAndCompareScreenshot(element: Locator) {
    const box = await page.getByTestId('user').boundingBox();
    const pageShot = await page.screenshot({
      clip: {
        x: box.x - 10,
        y: box.y - 10,
        width: box.width + 20,
        height: box.height + 20
      }
    })
    expect(pageShot).toMatchImageSnapshot({
      customDiffConfig: {
        includeAA: false,
      },
      allowSizeMismatch: true,
      failureThreshold: 0.05,
      failureThresholdType: 'percent',
      comparisonMethod: 'pixelmatch',
      blur: 1,
    })
  }

  test('hover on user menu item', async () => {
    const element = getLoginButton();
    await element.hover();
    await takeAndCompareScreenshot(element);
  })

  // test('focus on user menu item', async () => {
  //   const element = getLoginButton();
  //   await element.focus();
  //   await takeAndCompareScreenshot(element);
  // })

  test('click on user menu item', async () => {
    const element = getLoginButton();
    await element.hover();
    await page.mouse.down();
    await takeAndCompareScreenshot(element);
  })
})

test('imageDiff', async () => {
  await page.setViewportSize({
    width: 768,
    height: 480
  })
  await page.goto('http://localhost:3000')
  const shot = await page.screenshot({
    animations: 'disabled',
    fullPage: true
  })
  const refShot = readFileSync('test/__image_snapshots__/playwright-test-ts-test-playwright-test-ts-test-structure-tablet-page-1-snap.png')
  const image1 = (await Jimp.read(shot));
  const image2 = (await Jimp.read(refShot));
  const distance = Jimp.distance(image1, image2); // perceived distance
  const pixelDiff = Jimp.diff(image1, image2).percent; // pixel difference
  console.log({ distance, pixelDiff})

  // const { mssim, performance } = ssim(image1.bitmap, image2.bitmap);
  // console.log(`SSIM: ${mssim} (${performance}ms)`);

  const { data, width, height, diff } = imageDiff(image1.bitmap, image2.bitmap, {
    hashFunction: createHash,
    customDriftRange: 20
  })
  console.log({diff})
  new Jimp({ data: Buffer.from(data), width, height}, async (err, image) => {
    await image.writeAsync(`imageDiff.png`);
  })
})
