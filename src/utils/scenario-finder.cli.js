import { cd } from 'shelljs';
import { mkdir } from 'shelljs';
import { warn } from 'console';
import { sanitizeRootFile, getIdFormatted } from './utils.cli';
import { checkPath, writeFileByData } from './file-utils.cli';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function scenarioGenerator(args, resourceTemplate, testTemplate, METHOD) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    const path = args._[2];
    const pathForResources = sanitizePath(args.path);

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);

    goPath(pathForResources);
    writeFileByData(`${rootFile}.${METHOD}.json`, resourceTemplate(args, idsFormatted));
    goRoot(pathForResources);

    goTest();

    goPath(pathForResources);
    writeFileByData(`${rootFile}-${METHOD}.test.js`, testTemplate(args, idsFormatted));
    goRoot(pathForResources);
  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
    throw new Error;
  }
}

const sanitizePath = (path) => {
  if (path) {
    if (path.charAt(0) === '/') {
      path = path.slice(1);
    }
    if (path.slice(-1) === '/') {
      path = path.slice(0, -1);
    }
  }
  return path;
};

const createFolderBase = (path) => {
  if (path) {
    path.split('/').forEach((value) => {
      if (!checkPath(`./${value}`)) {
        mkdir(value);
      }
      cd(value);
    });
    goRoot(path);
  }
  return path;
};

const goTest =()=>{
  cd('..');
  cd('test');
};

const goPath = (path)=>{
  if (path) {
    createFolderBase(path);
    cd(path);
  }
};

const goRoot = (path)=>{
  if (path) {
    let stringBuild = '';
    path.split('/').forEach(() => stringBuild = stringBuild + '../');
    cd(stringBuild.slice(0, -1));
  }
};
