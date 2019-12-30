import { createInterface } from 'readline';
import { info, warn, error } from 'console';
import { existsSync, writeFile } from 'fs';
import { mkdir, cd, touch } from 'shelljs';

const chalk = require('chalk');

export function handleQuestion(message) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    readline.question(chalk.blue('\n>') + chalk.grey(` ${message} \n`),
        (name) => handleAnswer(resolve, reject, readline, name));
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

const handleAnswer = (resolve, reject, readline, value) => {
  if (!value) {
    warn(chalk.red(` You must add a value  :(`));
    readline.close();
    reject();
  } else {
    info(chalk.green(` Well done  :)`));
    readline.close();
    resolve(value);
  }
};
