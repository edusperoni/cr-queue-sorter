const fs = require('fs');
const path = require('path');

const sourceDir = path.join('.','dist');
const targetDir = path.join('.','release', 'userscript');

fs.readdirSync(targetDir, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlinkSync(path.join(targetDir, file));
  }
});

function copyToRelease(filename) {
    fs.createReadStream(path.join(sourceDir, filename)).pipe(fs.createWriteStream(path.join(targetDir, filename)));
}
copyToRelease('bundle.user.js');
copyToRelease('bundle.meta.js');
