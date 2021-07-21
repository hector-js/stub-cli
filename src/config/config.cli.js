import { info } from 'console';
import { BANNER_FILE, BANNER_TEXT, HJS_PATH, NAME_FILE, PACKAGE_ROOT_JSON, ROOT_PROJECT, UNDER_HJS } from '../utils/constants-backend';
import { checkPath, multipleOpts, writeFileByData } from './../utils/file-utils.cli';
import { version } from './../../package.json';

const chalk = require('chalk');

export async function config(args) {
  if (args.help) {
    info(chalk.green('\n-- nConfig options --------------------------------\n'));
    info(chalk.yellow(`hjs config --port [port]`));
    info(chalk.grey(`  (select port)`));
    info(chalk.yellow(`hjs config --logs [logs]`));
    info(chalk.grey(`  (select logs)`));
    info(chalk.yellow(`hjs config --banner`));
    info(chalk.grey(` (create custom banner)`));
    info(chalk.grey(` (Example: hjs config --port 3004 --logs tiny --banner)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  } else {
    if (checkPath(PACKAGE_ROOT_JSON) && checkPath(HJS_PATH)) {
      const data = {};
      data.port = args.port;
      data.logs = args.logs;

      const choices = [
        { title: 'Under _hjs folder', value: UNDER_HJS },
        { title: 'Root project', value: ROOT_PROJECT }
      ];
      const result = await multipleOpts('Where do you want to create it?', choices);

      const path = result && result.data === UNDER_HJS ? '_hjs/' : '';

      if (args.banner) {
        if (checkPath(`./${path}${BANNER_FILE}`)) {
          const opts = [
            { title: 'Yes', value: 'y' },
            { title: 'No', value: 'n' }
          ];
          const result = await multipleOpts('Custom banner already exists. Do you want to replace it?', opts);
          if (result && result.data === 'y') {
            writeFileByData(`${path}${BANNER_FILE}`, BANNER_TEXT);
          }
        } else {
          writeFileByData(`${path}${BANNER_FILE}`, BANNER_TEXT);
        }
      }
      if (data.port || data.logs || !args.banner) {
        writeFileByData(`${path}${NAME_FILE}`, JSON.stringify(data, null, '\t'));
      }
    } else {
      info(chalk.red('Package.json should exists :('));
    }
  }
}
