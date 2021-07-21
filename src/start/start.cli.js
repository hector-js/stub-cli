import { exec, cd } from 'shelljs';
import { info } from 'console';
import { argsBy } from '../utils/utils.cli';
import { version } from './../../package.json';

const chalk = require('chalk');

export function start(args) {
  if (args.help) {
    info(chalk.green('\n-- Start options --------------------------------\n'));
    info(chalk.yellow(`hjs start`));
    info(chalk.grey(`  (run service)`));
    info(chalk.yellow(`hjs start --dev`));
    info(chalk.grey(`  (run service for dev (listening to changes))`));
    info(chalk.yellow(`hjs start --path`));
    info(chalk.grey(` (run service from different directory)`));
    info(chalk.grey(` (Example: hjs start --path folderOne/folderTwo/projectFolder)`));
    info(chalk.yellow(`hjs start --open`));
    info(chalk.grey(` (open chrome browser)`));
    info(chalk.yellow(`hjs start --ui-enable`));
    info(chalk.grey(` (enable ui)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  } else {
    if (args.path) {
      cd(args.path);
    }

    let argsCli = argsBy('logs', args.logs) + argsBy('port', args.port) + argsBy('cors', args.cors) +argsBy('no_delays', args['no_delays']);

    if (args.open) {
      argsCli = `${argsCli} --open`;
    }

    if (args['ui-enable']) {
      argsCli = `${argsCli} --ui-enable`;
    }

    let command;
    const appHJS = `.\/node_modules\/@hectorjs\/stub-backend\/lib\/server.js`;
    if (args.dev) {
      const root = `nodemon ${appHJS}`;
      command = argsCli ? `${root}${argsCli}` : root;
    } else {
      const root = `node ${appHJS}`;
      command = argsCli ? `${root}${argsCli}` : root;
    }
    exec(command);
  }
}

