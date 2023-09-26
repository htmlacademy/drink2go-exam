const fs = require('node:fs/promises');
const backstop = require('backstopjs');
const ppConfig = require('./backstop-test-06.config');
const fontsConfig = require('./backstop-test-05.config');

(async () => {
  let passedSelectors
  try {
    await backstop('test', {config: ppConfig});
    console.log('All blocks passed')
  } catch (e) {
    console.log('mismatch blocks detected')
  } finally {
    const reportFile = await fs.readFile('./backstop_data/json_report/jsonReport.json', 'utf8')
    const report = JSON.parse(reportFile)
    const passed = report.tests
      .filter(({ status }) => status === 'pass')
      .map(({ pair: { viewportLabel, selector } }) => ({ selector, viewportLabel }))
      .reduce((acc, { viewportLabel, selector }) => {
        acc[selector] = acc[selector]?.add(viewportLabel) ?? new Set([viewportLabel]);
        return acc;
      }, {})
    passedSelectors = Object.entries(passed)
      .filter(([, set]) => set.size === 3)
      .map(([selector]) => {
        let pattern = /data-test="(\w+)"/;
        let match = selector.match(pattern);
        return (match[1]);
      }).join('|')
  }
  try {
    await backstop('test', {
      config: fontsConfig,
      filter: passedSelectors
    });
  } catch (e) {
    
  }
})()
