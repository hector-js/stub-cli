const { runTests } = require('../utils/runners.cli');
const { cd } = require('shelljs');
const { info } = require('console');
const chalk = require('chalk');
const { version } = require('./../../package.json');

function testcli(args) {
  if (args.help) {
    info(chalk.green('\n-- Test options --------------------------------\n'));
    info(chalk.yellow(`hjs test`));
    info(chalk.grey(`  (execute tests related to the mock)`));
    info(chalk.yellow(`hjs test --path`));
    info(chalk.grey(`  (execute test in the path)`));
    info(chalk.grey(`  (Example: hjs test --path folderOne/folderTwo/projectFolder`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  } else {
    if (args.path) {
      cd(args.path);
    }
    process.env.KEY = args.profile?args.profile: 'local';

    runTests(args.root, args.include);
  }
}

module.exports = {
  testcli
};
