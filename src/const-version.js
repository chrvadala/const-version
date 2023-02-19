const fs = require('fs')
const Promise = require('bluebird')
Promise.promisifyAll(fs)

const template = version => `
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
export const VERSION = '${version}';
`.trim()

function readVersion (source) {
  return fs
    .readFileAsync(source, 'utf8')
    .then(data => {
      let json

      try {
        json = JSON.parse(data)
      } catch (e) {
        return Promise.reject(new Error("file doesn't contain valid json"))
      }

      if (!('version' in json)) {
        return Promise.reject(new Error('file doesn\'t contain version'))
      }

      return Promise.resolve(json.version)
    }, () => {
      return Promise.reject(new Error('file not found'))
    })
}

function writeVersion (path, version) {
  const data = template(version)
  return fs
    .writeFileAsync(path, data)
}

function generateConstVersion (source, dest) {
  return readVersion(source).then(writeVersion.bind(this, dest))
}

module.exports.writeVersion = writeVersion
module.exports.readVersion = readVersion
module.exports.default = generateConstVersion
