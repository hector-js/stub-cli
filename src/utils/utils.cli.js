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

export function sizeObject(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

export const checkPath = (path) => {
    try {
        return existsSync(path);
    } catch (err) {
        error('Error in the location');
        return false;
    }
}

export const writeFileByData = (file, data) => {
    if (!file || !data) {
        if (!file) {
            error(chalk.red('File is undefined'))
        }
        if (!data) {
            error(chalk.red('Data is undefined'))
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
            error(chalk.red('File is undefined'))
        }
        if (!path) {
            error(chalk.red('PATH is undefined'))
        }
        throw new Error(`It couldn't create a file`);
    }
    mkdir(path);
    cd(path);
    touch(fileName);
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
        while(rootFile.startsWith('-')||rootFile.slice(-1) === '-'){
            if (rootFile.startsWith('-')) {
                rootFile = rootFile.substr(1);
            }
            if (rootFile.slice(-1) === '-') {
                rootFile = rootFile.slice(0, -1);;
            }
        }
    }

    return rootFile? rootFile: 'to-be-defined';
};

export const getIdFormatted = (path) => {
    if(!path){
        throw new Error('The path must exits');
    }
    const arrayIds = path.match(/\{(.*?)\}/g);
    let idsFormatted = [];
    if (arrayIds) {
        idsFormatted.push(...arrayIds.map(val => val.replace(/{|}/g, '')));
    }
    const uniqueIds = new Set(idsFormatted);
    if(uniqueIds.size !== idsFormatted.length){
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
    return args.status && parseInt(args.status)? args.status : null;
}

export const convertIdsToJsonProperties = (idsFormatted) => {
    var ids = '';
    if (idsFormatted) {
        idsFormatted.forEach(id => {
            ids = ids + `"_${id}": "${id}TBD", `;
        });
    }
    return ids;
}

export const convertArrayToJsonProperties = (array) => {
    var resultCustom = '';
    if (array) {
        array.forEach(element => {
            resultCustom = resultCustom + `"${element}",`;
        });
        resultCustom = resultCustom.slice(0, -1);
    }
    return resultCustom;
}

export const arrayToJson = (array) => {
    var resultJson = ''
    array.forEach(header => resultJson = resultJson + `${header}: "any value" ,`);
    return resultJson.slice(0, -1);
}

export const arrayToArrayValues = (array) => {
    var resultArray = ''
    array.forEach(header => resultArray = resultArray + `'${header}=anyValue' ,`);
    return resultArray.slice(0, -1);
}

export const buildUrl = (path, ids) => {
    if (ids) {
        ids.forEach(id => path = path.replace(`{${id}}`, `${id}TBD`));
    }
    return path;
}

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
}
