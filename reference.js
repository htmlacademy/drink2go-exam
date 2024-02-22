const fs = require('node:fs/promises');
const backstop = require('htmlacademy-backstopjs');

(async () => {
  const files = await fs.readdir('./test-config/');
  for (const file of files) {
    if (file.match(/backstop-.*\.config\.js$/)) {
      await backstop('reference', {config: `./test-config/${file}`});
    }
  }
})()
