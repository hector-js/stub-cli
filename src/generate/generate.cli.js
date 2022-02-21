const { getCli } = require('./methods/get.cli');
const { headCli } = require('./methods/head.cli');
const { postCli } = require('./methods/post.cli');
const { putCli } = require('./methods/put.cli');
const { deleteCli } = require('./methods/delete.cli');
const { patchCli } = require('./methods/patch.cli');
const { traceCli } = require('./methods/trace.cli');
const { info, warn } = require( 'console');
const { version } = require('./../../package.json');

const chalk = require('chalk');

function generateCli(args) {
  if (args.help) {
    helpOptions(args);
  } else {
    switch (args._[1]) {
      case 'get':
      case 'g':
        getCli(args);
        break;
      case 'post':
      case 'p':
        postCli(args);
        break;
      case 'put':
      case 'pu':
        putCli(args);
        break;
      case 'delete':
      case 'd':
        deleteCli(args);
        break;
      case 'head':
      case 'h':
        headCli(args);
        break;
      case 'patch':
      case 'pa':
        patchCli(args);
        break;
      case 'trace':
      case 't':
        traceCli(args);
        break;
      default:
        warn(chalk.yellow('\nMethod not found :(\n'));
    }
  }
};

function displayGeneratorOpts() {
  info(chalk.green('\n--Generate options --------------------------------\n'));
  info(chalk.yellow(`hjs generate/g [method] [url]`));
  info(chalk.yellow(`hjs generate get/g [url]`));
  info(chalk.grey(`  (scenario for a GET request)`));
  info(chalk.yellow(`hjs generate post/p [url]`));
  info(chalk.grey(`  (scenario for a POST request)`));
  info(chalk.yellow(`hjs generate delete/d [url]`));
  info(chalk.grey(`  (scenario for a DELETE request)`));
  info(chalk.yellow(`hjs generate head/h [url]`));
  info(chalk.grey(`  (scenario for a HEAD request)`));
  info(chalk.yellow(`hjs generate put/pu [url]`));
  info(chalk.grey(`  (scenario for a PUT request)`));
  info(chalk.yellow(`hjs generate patch/pa [url]`));
  info(chalk.grey(`  (scenario for a PATCH request)`));
  info(chalk.green(`\nOther options:\n`));
  info(chalk.grey(`  (xml, headers, cookies, skip-install, status,\n`));
  info(chalk.grey(`  package, description, delay, template)\n`));
  info(chalk.green('\n-----------------------------------------------'));
  info(chalk.green(`                                version: ${version}`));
}

function helpOptions(args) {
  if (args.headers) {
    info(chalk.green('\n--Header option --------------------------------\n'));
    info(chalk.yellow(`hjs generate [method] --headers [header1],[header2]`));
    info(chalk.grey(`  (Example: hjs g g customers --headers authorization,client_id)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  }

  if (args.status) {
    info(chalk.green('\n--Status option --------------------------------\n'));
    info(chalk.yellow(`hjs generate [method] --status [status-code]`));
    info(chalk.grey(`  (Example: hjs g g customers --status 404)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  }

  if (args.package) {
    info(chalk.green('\n--Package option --------------------------------\n'));
    info(chalk.yellow(`hjs generate [method] --package [folder-name]`));
    info(chalk.grey(`  (Generate the file resource and test under the package.)`));
    info(chalk.grey(`  (Example: hjs g g customers --package my-package/my-subpackage)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  }

  if (args.cookies) {
    info(chalk.green('\n--Cookies option --------------------------------\n'));
    info(chalk.yellow(`hjs generate [method] --cookies [key-cookie]`));
    info(chalk.grey(`  (Example: hjs g g customers --cookies NormalCookie)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  }

  if (args.description) {
    info(chalk.green('\n--Description option --------------------------------\n'));
    info(chalk.yellow(`hjs generate [method] --description "[description]"`));
    info(chalk.grey(`  (Example: hjs g g customers --description "Hello world!")`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  }

  if (args.delay) {
    info(chalk.green('\n--Delay option --------------------------------\n'));
    info(chalk.yellow(`hjs generate [method] --delay [milliseconds]`));
    info(chalk.grey(`  (Example: hjs g g customers --delay 1000)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  }

  if (args.template) {
    info(chalk.green('\n--Template option --------------------------------\n'));
    info(chalk.yellow(`hjs generate [method] --template [path/to/file.json]`));
    info(chalk.grey(`  (Example: hjs g g customers --template template.json)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  }

  if (args.xml) {
    info(chalk.green('\n--XML option --------------------------------\n'));
    info(chalk.yellow(`hjs generate [method] --xml`));
    info(chalk.grey(`  (Response body is a xml)`));
    info(chalk.grey(`  (Example: hjs g g customers --xml)`));
    info(chalk.green('\n-----------------------------------------------'));
    info(chalk.green(`                                version: ${version}`));
  }

  if (!args.package && !args.description && !args.xml && !args.headers && !args.cookies && !args.status && !args.delay && !args.template) {
    displayGeneratorOpts();
  }
}

module.exports = {
  generateCli
};
