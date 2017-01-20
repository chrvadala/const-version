const commander = require('commander');

const version = require('../package.json').version;
const constVersion = require('./const-version');

function cmd(process) {
  commander
    .version(version)
    .description('A tiny command line tool that extract `package.json` version and generate `const VERSION=\'...\'` file')
    .usage('./package.json ./src/version.js')
    .arguments("<package.json> <target_file>")
    .action(constVersion)
    .parse(process.argv);
}

module.exports = cmd;
