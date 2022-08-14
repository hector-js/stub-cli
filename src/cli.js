const { info, warn } = require('console');
const { generateCli } = require('./generate/generate.cli');
const { cd } = require('shelljs');
const { sizeObject } = require('./utils/utils.cli');
const { newCli } = require('./new/new.cli');
const { start } = require('./start/start.cli');
const { testcli } = require('./testcli/test.cli');
const { config } = require('./config/config.cli');
const { version } = require('./../package.json');
const { setTemplate } = require('./utils/templates/replacements');

const chalk = require('chalk');

function cli(args) {
  setTemplate(args.template);
  switch (args._[0]) {
    case 'new':
    case 'n':
      newCli(args);
      break;
    case 'generate':
    case 'g':
      cd('_hjs');
      generateCli(args);
      break;
    case 'start':
    case 's':
      start(args);
      break;
    case 'test':
    case 't':
      testcli(args);
      break;
    case 'config':
    case 'c':
      config(args);
      break;
    default:
  }

  if (args.version) {
    info(chalk.yellow(`\nVersion: ${version}\n`));
  }

  if (args.license) {
    info(chalk.yellow(`\nLicense: MIT\n`));
  }

  if (args.help && !args._[0]) {
    info(chalk.green('\nBelow, you can see different options for your mock:\n'));
    info(chalk.grey(` -  new/n [name-project]  : create new mock project `));
    info(chalk.grey(` -  generate/g  get/g/post/p/delete/d  [url]: create url section `));
    info(chalk.grey(` -  start     : run mock service `));
    info(chalk.grey(` -  test      : execute the tests `));
    info(chalk.grey(` -  --version : know version hjs`));
    info(chalk.grey(` -  --vs      : open visual code studio if exists`));
    info(chalk.grey(` -  --idea    : open intelliJ studio if exists`));
    info(chalk.grey(` -  --headers : add headers to check in the request`));
    info(chalk.grey(` -  --license : MIT\n\n`));
    info(chalk.grey(`Example: hjs new mock-service --vs\n`));
    info(chalk.yellow(`version: ${version}\n`));
  }

  if (args._.length === 0 && sizeObject(args) === 1) {
    warn(chalk.red('\nSorry, you missed a parameter (hjs --help)'));
  }
}

module.exports = {
  cli
};
