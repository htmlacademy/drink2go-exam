const fs = require('node:fs/promises');
const backstop = require('htmlacademy-backstopjs');
const ppConfig = require('./test-config/backstop-test-06.config');
const fontsConfig = require('./test-config/backstop-test-05.config');
const interactionConfig = require('./test-config/backstop-test-08.config');
const styleguideConfig = require('./test-config/backstop-test-07.config');

(async () => {
  let passedSelectors
  try {
    await backstop('test', { config: ppConfig });
    console.log('All blocks passed')
  } catch (e) {
    console.log('mismatch blocks detected')
  } finally {
    const reportFile = await fs.readFile('./backstop_data/json_report/jsonReport.json', 'utf8')
    const report = JSON.parse(reportFile)
    const passed = report.tests
      .filter(({ status }) => status === 'pass')
      .map(({
              pair: {
                viewportLabel,
                selector,
              },
            }) => ({ selector, viewportLabel }))
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
      }).join('|') || 'nothing good found'
  }
  const config05 = {
    ...fontsConfig,
    scenarios: fontsConfig.scenarios.filter(({ label }) => !!label.match(passedSelectors)),
  }
  await fs.writeFile('./test-config/backstop-test-05.config.json', JSON.stringify(config05, null, 2), 'utf8')

  const config08 = {
    ...interactionConfig,
    scenarios: interactionConfig.scenarios.filter(({ label }) => !!label.match(passedSelectors)),
  }
  await fs.writeFile('./test-config/backstop-test-08.config.json', JSON.stringify(config08, null, 2), 'utf8')

  const config07 = {
    ...styleguideConfig,
    scenarios: styleguideConfig.scenarios.filter(({ label }) => !!label.match(passedSelectors)),
  }
  await fs.writeFile('./test-config/backstop-test-07.config.json', JSON.stringify(config07, null, 2), 'utf8')

})()
