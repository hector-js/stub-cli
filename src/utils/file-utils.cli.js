import { info, error } from 'console';
import { existsSync, writeFile } from 'fs';
import { mkdir, cd, touch } from 'shelljs';

const prompts = require('prompts');
const chalk = require('chalk');

export async function multipleOpts(message, choices) {
  return await prompts({
    type: 'select',
    name: 'data',
    message: message,
    choices: choices
  });
}

export async function question(message) {
  return await prompts({
    type: 'text',
    name: 'data',
    message: message,
    format: (v) => `${v}`
  });
}

export const checkPath = (path) => {
  try {
    return existsSync(path);
  } catch (err) {
    error('Error in the location');
    return false;
  }
};

export const writeFileByData = (file, data) => {
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

export const createFileInPath = (fileName, path) => {
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
