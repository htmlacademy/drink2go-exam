const fs = require('node:fs/promises');
const backstop = require('backstopjs');

(async () => {
  const files = await fs.readdir('./test-config/');
  console.log(files)
  for (const file of files) {
    if (file.match(/backstop-.*\.config\.js$/)) {
      await backstop('reference', {config: `./test-config/${file}`});
    }
  }
})()
