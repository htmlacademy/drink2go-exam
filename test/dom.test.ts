// @vitest-environment happy-dom
import { describe, it, beforeEach } from 'vitest'
import {readFileSync} from 'node:fs'
import '@testing-library/jest-dom/vitest';
import {
  screen,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  waitFor,
} from '@testing-library/dom'

import { UncaughtExceptionObserver } from '@happy-dom/uncaught-exception-observer';
import {IWindow} from "happy-dom";
const observer = new UncaughtExceptionObserver();
// Connects observer
observer.observe(<IWindow><unknown>window);

window.addEventListener('error', (event) => {
  const errorEvent = <ErrorEvent>event
  console.log(errorEvent.message)
});

const html = readFileSync('./build/index.html', 'utf8');

describe('dom test', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });
  it ('header', ({ expect}) => {
    const header = getByTestId(document.body, 'header')
    expect(header).not.toBeEmptyDOMElement()
  })
  it ('footer', ({ expect}) => {
    const footer = getByTestId(document.body, 'footer')
    expect(footer).not.toBeEmptyDOMElement()
  })
})

