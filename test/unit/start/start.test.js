'use strict';

const { assert } = require('chai');
const { stub } = require('sinon');
const { version } = require('./../../../package.json');

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
    });
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

      assert.ok(execCliStub.calledOnceWith(`nodemon ${appHJS}`));
    });
  });

  context('when start is comming with no delays flag such as "--no-delays"', () => {
    it('should run the application with nodemon', () => {
      const args = {
        _: ['start'],
        no_delays: true
      };

      start(args);

      assert.ok(execCliStub.calledOnceWith(`node ${appHJS} --no_delays true`));
    });
  });

  context('when start is comming with help flag such as "--help"', () => {
    it('displays the options', () => {
      const args = {
        _: ['start'],
        help: true
      };

      start(args);


      assert.ok(infoStub.withArgs(chalk.green('\n-- Start options --------------------------------\n')).calledOnce);
      assert.ok(infoStub.withArgs(chalk.yellow(`hjs start`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(`  (run service)`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.yellow(`hjs start --dev`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(`  (run service for dev (listening to changes))`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.yellow(`hjs start --path`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` (run service from different directory)`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` (Example: hjs start --path folderOne/folderTwo/projectFolder)`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.yellow(`hjs start --open`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` (open chrome browser)`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.yellow(`hjs start --ui-enable`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` (enable ui)`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
      assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
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

      context('when the argument is "--open"', () => {
        it('should execute a command with the open command', () => {
          const args = {
            _: ['start'],
            open: true,
            dev: true
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`nodemon ${appHJS} --open`));
        });
      });
    });

    describe('ui-enable', () => {
      context('when the argument is "--ui-enable"', () => {
        it('executes a command with ui-enable', () => {
          const args = {
            '_': ['start'],
            'ui-enable': true
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`node ${appHJS} --ui-enable`));
        });
      });

      context('when therer is no argument --ui-enable', () => {
        it('executes a command without ui-enable', () => {
          const args = {
            '_': ['start']
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`node ${appHJS}`));
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

      context('when the argument is "--open"', () => {
        it('should execute a command with the open command', () => {
          const args = {
            _: ['start'],
            open: true
          };

          start(args);

          assert.ok(execCliStub.calledOnceWith(`node ${appHJS} --open`));
        });
      });
    });
  });
});
