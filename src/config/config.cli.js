import { checkPath, writeFileByData } from './../utils/file-utils.cli';
import { info } from 'console';
import { HJS_PATH, PACKAGE_ROOT_JSON, NAME_FILE } from '../utils/constants-backend';

const chalk = require('chalk');

export function config(args) {
  if (args.help) {
    info(chalk.green('\nConfig options:\n'));
    info(chalk.grey(' -  hjs config --port [port]: select port'));
    info(chalk.grey(' -  hjs config --logs [logs]: select logs'));
    info(chalk.grey('\n        Example: hjs config --port 3004 --logs tiny'));
  } else {
    if (checkPath(PACKAGE_ROOT_JSON) && checkPath(HJS_PATH)) {
      const data = {};
      data.port = args.port;
      data.logs = args.logs;
      writeFileByData(NAME_FILE, JSON.stringify(data, null, '\t'));
    } else {
      info(chalk.red('Package.json should exists :('));
    }
  }
}
