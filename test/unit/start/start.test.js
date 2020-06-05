'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');
const chalk = require('chalk');

describe('start', () => {
  const appHJS ='.\/node_modules\/@hectorjs\/stub-backend\/lib\/server.js';
  let start;
  let execCliStub;
  let cdCliStub;
  let infoStub;

  beforeEach(() => {
    execCliStub = stub();
    cdCliStub = stub();
    infoStub = stub();
    start = proxyquire('../../../src/start/start.cli', {
      'shelljs': { exec: execCliStub, cd: cdCliStub },
      'console': { info: infoStub }
    }).start;
  });

  afterEach(() => proxyquire.callThru());

  context('when start cli is called', () => {
    it(`should call exec with the correct args`, () => {
      const args = {
        _: ['start']
      };

      start(args);

      assert.ok(execCliStub.calledOnceWith(`node ${appHJS}`));
    });
  });

  context('when start is comming with dev flag such as "--dev"', () => {
    it('should run the application with nodemon', () => {
      const args = {
        _: ['start'],
        dev: true
      };

      start(args);

      assert.ok(execCliStub.calledOnceWith('nodemon .\/node_modules\/@hectorjs\/stub-backend\/lib\/server.js'));
    });
  });

  context('when start is comming with help flag such as "--help"', () => {
    it('displays the options', () => {
      const args = {
        _: ['start'],
        help: true
      };

      start(args);

      assert.ok(infoStub.withArgs(chalk.green('\nStart options:\n')).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` -  hjs start --dev : run service for dev (listening to changes)`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` -  hjs start       : run service`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` -  hjs start --path: run service from different directory`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(`        Example: hjs start --path folderOne/folderTwo/projectFolder`)).calledOnce);
    });
  });

  describe('arguments', () => {
    context('when the argument is "--path path/to/navigate"', () => {
      it('should navigate to the directory from where you are first', () => {
        const args = {
          _: ['start'],
          path: 'path/to/navigate'
        };

        start(args);

        assert.ok(execCliStub.calledOnceWith(`node ${appHJS}`));
        assert.ok(cdCliStub.calledOnceWith('path/to/navigate'));
      });
    });

    describe('dev mode', () => {
      context('when the argument is "--logs tiny"', () => {
        it('should execute a command with the logs in tiny mode', () => {
          const args = {
            _: ['start'],
            logs: 'tiny',
            dev: true
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`nodemon ${appHJS} --logs tiny`));
        });
      });

      context('when the argument is "--port 8080"', () => {
        it('should execute a command with the port in the 8080', () => {
          const args = {
            _: ['start'],
            port: '8080',
            dev: true
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`nodemon ${appHJS} --port 8080`));
        });
      });

      context('when the argument is "--cors business.uk.org,localhost"', () => {
        it('should execute a command with the cors in the business.uk.org,localhost', () => {
          const args = {
            _: ['start'],
            cors: 'business.uk.org,localhost',
            dev: true
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`nodemon ${appHJS} --cors business.uk.org,localhost`));
        });
      });

      context('when the argument is "--ui"', () => {
        it('should execute a command with the ui', () => {
          const args = {
            _: ['start'],
            ui: true,
            dev: true
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`nodemon ${appHJS} --ui`));
        });
      });
    });

    describe('normal mode', () => {
      context('when the argument is "--logs tiny"', () => {
        it('should execute a command with the logs in tiny mode', () => {
          const args = {
            _: ['start'],
            logs: 'tiny'
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`node ${appHJS} --logs tiny`));
        });
      });

      context('when the argument is "--port 8080"', () => {
        it('should execute a command with the port in the 8080', () => {
          const args = {
            _: ['start'],
            port: '8080'
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`node ${appHJS} --port 8080`));
        });
      });

      context('when the argument is "--cors business.uk.org,localhost"', () => {
        it('should execute a command with the cors in the business.uk.org,localhost', () => {
          const args = {
            _: ['start'],
            cors: 'business.uk.org,localhost'
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`node ${appHJS} --cors business.uk.org,localhost`));
        });
      });

      context('when the argument is "--ui"', () => {
        it('should execute a command with the ui', () => {
          const args = {
            _: ['start'],
            ui: true
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`node ${appHJS} --ui`));
        });
      });
    });
  });
});
