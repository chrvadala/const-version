const { Command } = require('commander')
const exec = require('./const-version')

async function execCliCommand (argv) {
  return new Command()
    .description('A tiny command line tool that extract `package.json` version and generate `const VERSION=\'...\'` file')
    .usage('./package.json ./src/version.js')
    .argument('<package.json>', 'filename to a valid package.json file containing a version')
    .argument('<target_file>', 'filename of the target file where to save extracted version')
    .showHelpAfterError()
    .action(exec)
    .parseAsync(argv)
}

module.exports = execCliCommand
