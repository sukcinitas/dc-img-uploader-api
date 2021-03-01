const fs = require('fs').promises;
const path = require('path');

const emptyDir = async (directory, currentFile) => {
  const files = await fs.readdir(directory);
  if (files.length < 5) {
      return;
  }
  for(let i = 0; i < files.length; i++) {
      if (files[i] === currentFile || files[i] === '.gitignore') {
          continue;
      } else {
          await fs.unlink(path.join(directory, files[i]));
      }
  } 
}

module.exports = emptyDir;