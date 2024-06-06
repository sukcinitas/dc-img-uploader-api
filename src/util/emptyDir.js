const fs = require("fs").promises;
const path = require("path");

const emptyDir = async (directory, currentFile) => {
  const files = await fs.readdir(directory);
  if (files.length < 5) {
    return;
  }
  for (const element of files) {
    if (element === currentFile || element === ".gitignore") {
      continue;
    } else {
      await fs.unlink(path.join(directory, element));
    }
  }
};

module.exports = emptyDir;
