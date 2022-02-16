const { info, error } = require('console');
const { existsSync, writeFile } = require('fs');
const { mkdir, cd, touch } = require('shelljs');
const prompts = require('prompts');
const chalk = require('chalk');
const fs = require('fs');

async function multipleOpts(message, choices) {
  return await prompts({
    type: 'select',
    name: 'data',
    message: message,
    choices: choices
  });
}

async function question(message) {
  return await prompts({
    type: 'text',
    name: 'data',
    message: message,
    format: (v) => `${v}`
  });
}

const checkPath = (path) => {
  try {
    return existsSync(path);
  } catch (err) {
    error('Error in the location');
    return false;
  }
};

const writeFileByData = (file, data) => {
  if (!file || !data) {
    if (!file) {
      error(chalk.red('File is undefined'));
    }
    if (!data) {
      error(chalk.red('Data is undefined'));
    }
    throw new Error(`It couldn't create a file`);
  }

  writeFile(file, data, (err) => {
    if (err) {
      error(`Error creating ${file} file`);
      throw err;
    }
    info(chalk.green(`${file}`) + ` has been created`);
  });
};

const createFileInPath = (fileName, path) => {
  if (!fileName || !path) {
    if (!fileName) {
      error(chalk.red('File is undefined'));
    }
    if (!path) {
      error(chalk.red('PATH is undefined'));
    }
    throw new Error(`It couldn't create a file`);
  }
  mkdir(path);
  cd(path);
  touch(fileName);
};

const getAllFiles = function(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(dirPath + '/' + file);
    }
  });

  return arrayOfFiles;
};

module.exports = {
  createFileInPath,
  writeFileByData,
  checkPath,
  question,
  multipleOpts,
  getAllFiles
};
