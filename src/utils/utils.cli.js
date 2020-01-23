import { error } from 'console';

const chalk = require('chalk');

export function sizeObject(obj) {
  return obj ? Object.keys(obj).length : 0;
};

export const sanitizeRootFile = (path) => {
  if (!path) {
    error(chalk.red('\nSorry, you missed the path.'));
    error(chalk.grey('For example: hjs g g [path]\n'));
    throw new Error;
  }
  let rootFile = path
      .replace(/\/\{|\}\/|\=|\?|\&|\{/g, '-')
      .replace(/\}|\//g, '-')
      .replace(/\-\-\-/g, '-')
      .replace(/\-\-/g, '-')
      .replace(/ /g, '');
  if (rootFile) {
    while (rootFile.startsWith('-') || rootFile.slice(-1) === '-') {
      if (rootFile.startsWith('-')) {
        rootFile = rootFile.substr(1);
      }
      if (rootFile.slice(-1) === '-') {
        rootFile = rootFile.slice(0, -1); ;
      }
    }
  }

  return rootFile ? rootFile : 'to-be-defined';
};

export const getIdFormatted = (path) => {
  if (!path) {
    throw new Error('The path must exits');
  }
  const arrayIds = path.match(/\{(.*?)\}/g);
  const idsFormatted = [];
  if (arrayIds) {
    idsFormatted.push(...arrayIds.map((val) => val.replace(/{|}/g, '')));
  }
  const uniqueIds = new Set(idsFormatted);
  if (uniqueIds.size !== idsFormatted.length) {
    const numberOfSameId = idsFormatted.length - uniqueIds.size;
    throw new Error(chalk.red(`The path ${path} contains ${numberOfSameId} ids repeated.`));
  }
  return idsFormatted;
};

export const getHeaders = (headers) => {
  return headers ? headers.replace(' ', '').split(',') : null;
};

export const getCookies = (cookies) => {
  return cookies ? cookies.replace(' ', '').split(',') : null;
};

export const getStatus = (status) => {
  return status && parseInt(status) ? status : null;
};

export const arrayToJson = (array) => arToCus(array, (ele) => `"${ele}": "any value",`, false);

export const arrayToArrayValues = (array) => arToCus(array, (header) => `"${header}=anyValue",`, false);

export const buildUrl = (path, ids) => {
  if (!path) {
    throw new Error(chalk.red('no path'));
  }
  if (ids) {
    ids.forEach((id) => path = path.replace(`{${id}}`, `${id}TBD`));
  }
  return path;
};

export function argsBy(argKey, argValue) {
  return argValue ? ` --${argKey} ${argValue}` : '';
}

const arToCus = (array, fn, lastElement) => {
  let resultArray = '';
  if (array) {
    array.forEach((header) => resultArray = resultArray + fn(header));
    if (!lastElement) {
      resultArray = resultArray.slice(0, -1);
    }
  }
  return resultArray;
};
