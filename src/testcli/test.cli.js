import { exec, cd } from 'shelljs';
import { info } from 'console';

const chalk = require('chalk');

export function testcli(args) {
  if (args.help) {
    info(chalk.green('\nTest options:\n'));
    info(chalk.grey(` -  hjs test       : execute tests related to the mock`));
    info(chalk.grey(` -  hjs test --path: execute test in the path`));
    info(chalk.grey(`        Example: hjs test --path folderOne/folderTwo/projectFolder`));
  } else {
    if (args.path) {
      cd(args.path);
    }

    exec('npm test');
  }
}


