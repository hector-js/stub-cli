import { cd, exec, mkdir } from 'shelljs';
import { writeFileSync } from 'fs';
import { info } from 'console';
import { healthData } from '../utils/templates/resources/health.template';
import { healthTest } from '../utils/templates/tests/health.template';
import { multipleOpts, question, writeFileByData, createFileInPath } from '../utils/file-utils.cli';

const chalk = require('chalk');

export async function newCli(args) {
  const commands = args._;
  const start = new Date();

  exec('clear');

  const optsPackageManager = [{ title: 'Npm', value: 'npm' }, { title: 'Yarn', value: 'yarn' }];
  const packageManager = (await multipleOpts('Package manager?', optsPackageManager)).data;

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

    writeFileSync('package.json', JSON.stringify(packageJson, null, 4));
  } else {
    info(chalk.green(` -> Setting the mock service in the project\n`));
    info(chalk.green(`- - - - - - - - - - - - - - - - - - - - - - - - - - \n`));
  }

  const installCommand = packageManager === 'yarn'? 'add': 'install';
  info(chalk.gray(` Installing the dependencies...\n`));
  if (nameProject) {
    exec(`${packageManager} ${installCommand} --silent @hectorjs/stub-backend@1.20.0`);
  } else {
    exec(`${packageManager} ${installCommand} --silent @hectorjs/stub-backend@1.20.0 --save-dev`);
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

const checkIDE = (argsCLI, shortCliIDE) => {
  if (argsCLI && argsCLI == true) {
    exec(`${shortCliIDE} .`);
  }
};
