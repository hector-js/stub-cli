import { info, warn, error } from 'console';

const chalk = require('chalk');

export function sizeObject(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

export const sanitizeRootFile = (path) => {
    if (!path) {
        error(chalk.red('\nSorry, you missed the path.'));
        error(chalk.grey('For example: hjs g g [path]\n'));
        throw new Error;
    }
    let rootFile = path
        .replace(/\/\{|\}\/|\=|\?|\&|\{/g, '-')
        .replace(/\}|\//g, '')
        .replace(/\-\-\-/g, '-')
        .replace(/\-\-/g, '-');
    if (rootFile) {
        while (rootFile.startsWith('-') || rootFile.slice(-1) === '-') {
            if (rootFile.startsWith('-')) {
                rootFile = rootFile.substr(1);
            }
            if (rootFile.slice(-1) === '-') {
                rootFile = rootFile.slice(0, -1);;
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
    let idsFormatted = [];
    if (arrayIds) {
        idsFormatted.push(...arrayIds.map(val => val.replace(/{|}/g, '')));
    }
    const uniqueIds = new Set(idsFormatted);
    if (uniqueIds.size !== idsFormatted.length) {
        const numberOfSameId = idsFormatted.length - uniqueIds.size;
        throw new Error(chalk.red(`The path ${path} contains ${numberOfSameId} ids repeated.`));
    }
    return idsFormatted;
}

export const getHeaders = (args) => {
    return args.headers ? args.headers.replace(' ', '').split(',') : null;
}

export const getCookies = (args) => {
    return args.cookies ? args.cookies.replace(' ', '').split(',') : null;
}

export const getStatus = (args) => {
    return args.status && parseInt(args.status) ? args.status : null;
}

export const convertIdsToJsonProperties = (array) => arToCus(array, (id) => `"_${id}": "${id}TBD",`, true);

export const convertArrayToJsonProperties = (array) => arToCus(array, (ele) => `"${ele}",`, false);

export const arrayToJson = (array) => arToCus(array, (ele) => `"${ele}": "any value",`, false);

export const arrayToArrayValues = (array) => arToCus(array, (header) => `"${header}=anyValue",`, false);

export const buildUrl = (path, ids) => {
    if (!path) {
        throw new Error(chalk.red('no path'));
    }
    if (ids) {
        ids.forEach(id => path = path.replace(`{${id}}`, `${id}TBD`));
    }
    return path;
}

const arToCus = (array, fn, lastElement) => {
    var resultArray = '';
    if (array) {
        array.forEach(header => resultArray = resultArray + fn(header));
        if (!lastElement) {
            resultArray = resultArray.slice(0, -1);
        }
    }
    return resultArray;
};
