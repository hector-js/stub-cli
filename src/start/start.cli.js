import { exec } from 'shelljs';
import { info } from 'console';

const chalk = require('chalk');

export function start(args) {
    if (args.help) {
        info(chalk.green('\nStart options:\n'));
        info(chalk.grey(` -  hjs start --dev : run service for dev (listening to changes)`));
        info(chalk.grey(` -  hjs start       : run service`));
    } else {
        const argumens = argsBy('logs', args.logs) + argsBy('port', args.port) + argsBy('cors', args.cors);
        let command;
        if (args.dev) {
            const root = `npm run start-dev`;
            command = argumens ? `${root} --${argumens}` : root;
        } else {
            command = `node app.js${argumens}`;
        }
        exec(command);
    }
}

function argsBy(argKey, argValue) {
    return argValue ? ` --${argKey} ${argValue}` : '';

}