import { exec, cd } from 'shelljs';
import { info } from 'console';
import { argsBy } from '../utils/utils.cli';

const chalk = require('chalk');

export function start(args) {
  if (args.help) {
    info(chalk.green('\nStart options:\n'));
    info(chalk.grey(` -  hjs start --dev : run service for dev (listening to changes)`));
    info(chalk.grey(` -  hjs start       : run service`));
    info(chalk.grey(` -  hjs start --path: run service from different directory`));
    info(chalk.grey(` -  hjs start --open  : open chrome browser`));
    info(chalk.grey(`        Example: hjs start --path folderOne/folderTwo/projectFolder`));
  } else {
    if (args.path) {
      cd(args.path);
    }

    let argsCli = argsBy('logs', args.logs) + argsBy('port', args.port) + argsBy('cors', args.cors) +argsBy('no_delays', args['no_delays']);

    if (args.open) {
      argsCli = `${argsCli} --open`;
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

