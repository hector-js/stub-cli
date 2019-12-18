import { exec } from 'shelljs';
import { info } from 'console';

const chalk = require('chalk');

export function start(args) {
    if(args.help){
        info(chalk.green('\nStart options:\n'));
        info(chalk.grey(` -  hjs start --dev : run service for dev (listening to changes)`));
        info(chalk.grey(` -  hjs start       : run service`));
    }else{
        let command = args.dev?'npm run start-dev':'node app.js';
        exec(command);
    }
}
