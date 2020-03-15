import { cd, exec, mkdir } from 'shelljs';
import { writeFile, readFile } from 'fs';
import { info, error } from 'console';
import { healthData } from '../utils/templates/resources/health.template';
import { healthTest } from '../utils/templates/tests/health.template';
import { handleQuestion, writeFileByData, createFileInPath } from '../utils/file-utils.cli';
import { PACKAGE_ROOT_JSON } from '../utils/constants-backend';

const chalk = require('chalk');

export async function newCli(args) {
  const commands = args._;
  const start = new Date();
  exec('clear');

  let nameProject;
  if (commands.length < 2) {
    const newProject = await handleQuestion('Create new project? [Yn]').catch(() => process.exit());
    if (newProject === 'Y' || newProject === 'y' || newProject.toLowerCase() === 'yes') {
      nameProject = await handleQuestion('Project name?').catch(() => process.exit());
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
    exec('npm init -y --silent');
  } else {
    info(chalk.green(` -> Setting the mock service in the project\n`));
    info(chalk.green(`- - - - - - - - - - - - - - - - - - - - - - - - - - \n`));
  }

  exec('npm install @hectorjs/stub-backend --silent');
  exec('npm install chai mocha supertest nodemon --save-dev --silent');

  readFile(PACKAGE_ROOT_JSON, 'utf8', (err, data) => {
    if (err) return error('Error while package.json was opening!');
    const packageJSON = JSON.parse(data);
    if (nameProject) {
      delete packageJSON.scripts.test;
    }
    packageJSON.scripts['_start'] = 'hjs start';
    packageJSON.scripts['_test'] = 'env KEY=local mocha ./_hjs --recursive --exit';
    packageJSON.scripts['_start-dev'] = 'hjs start --dev';

    writeFile(PACKAGE_ROOT_JSON, JSON.stringify(packageJSON, null, '\t'), 'utf8', (err) => {
      if (err) return error(err);
      mkdir('_hjs');
      cd('_hjs');

      createFileInPath('health.json', 'resources');
      writeFileByData('health.json', healthData);
      cd('..');
      createFileInPath('health.test.js', 'test');
      writeFileByData('health.test.js', healthTest);
      cd('..');

      checkIDE(args['vs'], 'code');
      checkIDE(args['idea'], 'idea');

      info(chalk.green('The mock has been set successfully (run hjs start)'));
      const end = new Date() - start;
      info(chalk.grey('\nExecution time: %dms \n'), end);
    });
  });
}

const checkIDE = (argsCLI, shortCliIDE) => {
  if (argsCLI && argsCLI == true) {
    exec(`${shortCliIDE} .`);
  }
};

