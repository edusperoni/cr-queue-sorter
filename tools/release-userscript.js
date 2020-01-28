const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'dist', 'userscript');
const targetDir = path.join(__dirname, '..', 'release', 'userscript');

fs.readdirSync(targetDir, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlinkSync(path.join(targetDir, file));
  }
});

function copyToRelease(sourceFilename, targetFilename) {
  targetFilename = targetFilename || sourceFilename;
  fs.createReadStream(path.join(sourceDir, sourceFilename)).pipe(fs.createWriteStream(path.join(targetDir, targetFilename)));
}
copyToRelease('bundle.user.js');
copyToRelease('bundle.meta.js');
