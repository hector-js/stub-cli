'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');
const chalk = require('chalk');

describe('start', () => {
  let start;
  let execCliStub, infoStub;

  beforeEach(() => {
    execCliStub = stub();
    infoStub = stub();
    start = proxyquire('../../../src/start/start.cli', {
      'shelljs': { exec: execCliStub },
      'console': { info: infoStub}
    }).start;
  });

  afterEach(() => proxyquire.callThru());

  context('when start cli is called', () => {
    it(`should call exec with the correct args`, () => {
      const args = {
        _:['start'],
      }
      
      start(args);

      assert.ok(execCliStub.calledOnceWith('node app.js'));
    });
  });

  context('when start is comming with dev flag such as "--dev"',()=>{
    it('should run the application with nodemon',()=>{
      const args = {
        _:['start'],
        dev: true
      }

      start(args);

      assert.ok(execCliStub.calledOnceWith('npm run start-dev'));
    });
  });

  context('when start is comming with help flag such as "--help"',()=>{
    it('displays the options',()=>{
      const args = {
        _:['start'],
        help: true
      }

      start(args);

      assert.ok(infoStub.withArgs(chalk.green('\nStart options:\n')).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` -  hjs start --dev : run service for dev (listening to changes)`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` -  hjs start       : run service`)).calledOnce);
    });
  });
});
