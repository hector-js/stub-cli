const { cd, exec, mkdir } = require('shelljs');
const { writeFileSync } = require('fs');
const { info } = require('console');
const { healthData } = require('../utils/templates/resources/health.template');
const { healthTest } = require('../utils/templates/tests/health.template');
const { multipleOpts, question, writeFileByData, createFileInPath } = require('../utils/file-utils.cli');

const chalk = require('chalk');

async function newCli(args) {
  if (args.help) {
    info(chalk.green('\n-- New options --------------------------------\n'));
    info(chalk.yellow(`hjs new`));
    info(chalk.grey(`  (generates new project)`));
    info(chalk.yellow(`hjs new [name]`));
    info(chalk.grey(`  (generates a new project undre name folder)`));
    info(chalk.yellow(`hjs new --package-manager`));
    info(chalk.grey(` (run service from different directory (npm|yarn))`));
    info(chalk.yellow(`hjs new --skip-install`));
    info(chalk.grey(` (skip packages installation)`));
    info(chalk.yellow(`hjs new --git`));
    info(chalk.grey(` (initialize git project)`));
    info(chalk.green('\n-----------------------------------------------'));
    return;
  }
  const commands = args._;
  const start = new Date();

  exec('clear');

  const optsPackageManager = [{ title: 'Npm', value: 'npm' }, { title: 'Yarn', value: 'yarn' }];

  let packageManager;
  const packageManagerArgs = args['package-manager'];
  if (packageManagerArgs && (packageManagerArgs === 'npm' || packageManagerArgs ==='yarn')) {
    packageManager = args['package-manager'];
  } else {
    packageManager = (await multipleOpts('Package manager?', optsPackageManager)).data;
  }

  let nameProject;
  if (commands.length < 2) {
    const opts = [{ title: 'Yes', value: 'y' }, { title: 'No', value: 'n' }];
    const newProject = await multipleOpts('Create new project?', opts);
    if (newProject.data === 'y') {
      nameProject = (await question('Project name?')).data;
    }
  } else {
    nameProject = commands[1];
  }
  let pathProject;
  if (args.path) {
    pathProject = args.path;
    cd(pathProject);
  } else {
    pathProject = `./${nameProject}`;
  }

  info(chalk.green(`\n----------------------------------------------------\n`));
  info(chalk.green(` Init hjs ...\n`));
  if (nameProject) {
    info(chalk.green(` -> Project name  : ${nameProject}`));
    info(chalk.green(` -> Root path     : ${pathProject}\n`));
    info(chalk.green(`- - - - - - - - - - - - - - - - - - - - - - - - - - \n`));
    mkdir(nameProject);
    cd(nameProject);

    const packageJson = {
      'name': nameProject,
      'version': '1.0.0',
      'description': `${nameProject} description`,
      'main': 'index.js',
      'scripts': {
        'hjs': 'hjs',
        '_start': 'hjs start',
        '_test': 'hjs test',
        '_start-dev': 'hjs start --dev'
      },
      'keywords': [],
      'author': '',
      'license': 'ISC'
    };

    if (args['skip-install']) {
      packageJson.dependencies = { '@hectorjs/stub-backend': '1.41.0' };
    }

    if (args['git']) {
      exec('git init');
      createFileInPath('.gitignore', '.');
      writeFileByData('.gitignore', 'node_modules');
    }

    writeFileSync('package.json', JSON.stringify(packageJson, null, 4));
  } else {
    info(chalk.green(` -> Setting the mock service in the project\n`));
    info(chalk.green(`- - - - - - - - - - - - - - - - - - - - - - - - - - \n`));
  }

  const installCommand = packageManager === 'yarn'? 'add': 'install';
  info(chalk.gray(` Installing the dependencies...\n`));
  if (nameProject && !args['skip-install']) {
    exec(`${packageManager} ${installCommand} --silent @hectorjs/stub-backend@1.41.0`);
  } else {
    exec(`${packageManager} ${installCommand} --silent @hectorjs/stub-backend@1.41.0 --save-dev`);
  }

  if (args.banner) {
    createFileInPath('.hjs.banner.js', '.');
    writeFileByData('.hjs.banner.js', 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n');
  }

  mkdir('_hjs');
  cd('_hjs');

  createFileInPath('health.json', 'resources');
  writeFileByData('health.json', healthData);
  cd('..');
  createFileInPath('health.test.js', 'test');
  writeFileByData('health.test.js', healthTest(args));
  cd('..');

  checkIDE(args['vs'], 'code');
  checkIDE(args['idea'], 'idea');

  info(chalk.green('The mock has been set successfully (run hjs start)'));
  const end = new Date() - start;
  info(chalk.grey('\nExecution time: %dms \n'), end);
}

module.exports = {
  newCli
};

const checkIDE = (argsCLI, shortCliIDE) => {
  if (argsCLI && argsCLI == true) {
    exec(`${shortCliIDE} .`);
  }
};
