const fs = require('fs');
const piexif = require('piexifjs');

const TYPE = 'binary';

module.exports = (fromFile, toFile) => {
  const newData = piexif.remove(
    fs.readFileSync(fromFile).toString(TYPE)
  );
  fs.writeFileSync(toFile, Buffer.from(newData, TYPE));
}