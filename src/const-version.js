const fs = require('fs');

const template = version => `
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
export const VERSION = '${version}';
`.trim();

function readVersion(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    if (!json.hasOwnProperty('version'))
      throw new Error(`${path} doesn't contain version`);

    callback(json.version);
  });
}

function writeVersion(path, version, callback) {
  let data = template(version);
  fs.writeFile(path, data, err => {
    if (err) throw err;
    callback();
  });
}

function generateConstVersion(packageJSON, dest) {
  readVersion(packageJSON, version => {
    writeVersion(dest, version, () => {
      //done
    });
  })
}

module.exports = generateConstVersion;
