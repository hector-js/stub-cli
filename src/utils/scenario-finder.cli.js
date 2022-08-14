const { cd, mkdir } = require('shelljs');
const { warn } = require('console');
const { sanitizeRootFile, getIdFormatted } = require('./utils.cli');
const { checkPath, writeFileByData } = require('./file-utils.cli');
const { PACKAGE_JSON, RESOURCES_PATH } = require('./constants-backend');
const { replacements } = require('./templates/replacements');

const chalk = require('chalk');


function scenarioGenerator(args, resourceTemplate, testTemplate, METHOD) {
  if (checkPath(PACKAGE_JSON) && checkPath(RESOURCES_PATH)) {
    const filterDocSlash =RESOURCES_PATH.replace(/\.|\//g, '');
    cd(filterDocSlash);
    const path = args._[2];
    const pathForResources = sanitizePath(args.package);

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);

    goPath(pathForResources);
    const dataname = replacements().dataname.replace(/{rootFile}/g, rootFile).replace(/{method}/g, METHOD);
    writeFileByData(dataname, resourceTemplate(args, idsFormatted));
    goRoot(pathForResources);

    goTest();

    goPath(pathForResources);
    const testname = replacements().testname.replace(/{rootFile}/g, rootFile).replace(/{method}/g, METHOD);
    writeFileByData(testname, testTemplate(args, idsFormatted));
    goRoot(pathForResources);
  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
    throw new Error;
  }
};

module.exports = {
  scenarioGenerator
};

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

const goTest = () => {
  cd('..');
  cd('test');
};

const goPath = (path) => {
  if (path) {
    createFolderBase(path);
    cd(path);
  }
};

const goRoot = (path) => {
  if (path) {
    let stringBuild = '';
    path.split('/').forEach(() => stringBuild = stringBuild + '../');
    cd(stringBuild.slice(0, -1));
  }
};
