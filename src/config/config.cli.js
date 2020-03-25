import { checkPath, writeFileByData } from './../utils/file-utils.cli';
import { info } from 'console';
import { HJS_PATH, PACKAGE_ROOT_JSON, NAME_FILE, BANNER_FILE, BANNER_TEXT } from '../utils/constants-backend';

const chalk = require('chalk');

export function config(args) {
  if (args.help) {
    info(chalk.green('\nConfig options:\n'));
    info(chalk.grey(' -  hjs config --port [port]: select port'));
    info(chalk.grey(' -  hjs config --logs [logs]: select logs'));
    info(chalk.grey(' -  hjs config --banner: create custom banner'));
    info(chalk.grey('\n        Example: hjs config --port 3004 --logs tiny --banner'));
  } else {
    if (checkPath(PACKAGE_ROOT_JSON) && checkPath(HJS_PATH)) {
      const data = {};
      data.port = args.port;
      data.logs = args.logs;

      if (args.banner) {
        writeFileByData(BANNER_FILE, BANNER_TEXT);
      }

      if (data.port || data.logs || !args.banner) {
        writeFileByData(NAME_FILE, JSON.stringify(data, null, '\t'));
      }
    } else {
      info(chalk.red('Package.json should exists :('));
    }
  }
}
