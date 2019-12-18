
import { info, warn } from 'console';
import { generateCli } from './generate/generate.cli';
import { sizeObject } from './utils/utils.cli';
import { newCli } from './new/new.cli';
import { start } from './start/start.cli';
import { exec } from 'shelljs';

const chalk = require('chalk');
const VERSION = '0.84.0';

export function cli(args) {
    switch (args._[0]) {
        case 'new':
        case 'n':
                newCli(args);
            break;
        case 'generate':
        case 'g':
                generateCli(args);
            break;
        case 'start':
        case 's':
                start(args);
            break;
        case 'test':
        case 't':
            exec('npm test');
            break;
        default:
    }

    if (args.version) {
        info(chalk.yellow(`\nVersion: ${VERSION}\n`));
    }

    if (args.license) {
        info(chalk.yellow(`\nLicense: MIT\n`));
    }

    if (args.help&&!args._[0]) {
        info(chalk.green('\nBelow, you can see different options for your mock:\n'));
        info(chalk.grey(` -  new/n [name-project]  : create new mock project `));
        info(chalk.grey(` -  generate/g  get/g/post/p/delete/d  [url]: create url section `));
        info(chalk.grey(` -  start     : run mock service `));
        info(chalk.grey(` -  test      : execute the tests `));
        info(chalk.grey(` -  --version : know version hjs`));
        info(chalk.grey(` -  --vs      : open visual code studio if exists`));
        info(chalk.grey(` -  --idea    : open intelliJ studio if exists`));
        info(chalk.grey(` -  --headers : add headers to check in the request`));
        info(chalk.grey(` -  --license : MIT\n\n`));
        info(chalk.grey(`Example: hjs new mock-service --vs\n`));
        info(chalk.yellow(`version: ${VERSION}\n`));
    }

    if(args._.length===0 && sizeObject(args) === 1){
        warn(chalk.red('\nSorry, you missed a parameter (hjs --help)'));
    }
}
