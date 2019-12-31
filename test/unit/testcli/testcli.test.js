'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');
const chalk = require('chalk');

describe('testcli', () => {
  let testcli;
  let execCliStub;
  let cdCliStub;
  let infoStub;

  beforeEach(() => {
    execCliStub = stub();
    cdCliStub = stub();
    infoStub = stub();
    testcli = proxyquire('../../../src/testcli/test.cli', {
      'shelljs': { exec: execCliStub, cd: cdCliStub },
      'console': { info: infoStub }
    }).testcli;
  });

  afterEach(() => proxyquire.callThru());

  context('when testcli is called', () => {
    it(`should call exec with the correct args`, () => {
      const args = {
        _: ['test']
      };

      testcli(args);

      assert.ok(execCliStub.calledOnceWith('npm test'));
    });
  });

  context('when testcli is comming with help flag such as "--help"', () => {
    it('should show the help options', () => {
      const args = {
        _: ['test'],
        help: true
      };

      testcli(args);

      assert.ok(infoStub.withArgs(chalk.green('\nTest options:\n')).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` -  hjs test       : execute tests related to the mock`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(` -  hjs test --path: execute test in the path`)).calledOnce);
      assert.ok(infoStub.withArgs(chalk.grey(`        Example: hjs test --path folderOne/folderTwo/projectFolder`)).calledOnce);
    });
  });

  describe('arguments', () => {
    context('when the argument is "--path path/to/navigate"', () => {
      it('should navigate to the directory from where you are first', () => {
        const args = {
          _: ['test'],
          path: 'path/to/navigate'
        };

        testcli(args);

        assert.ok(execCliStub.calledOnceWith('npm test'));
        assert.ok(cdCliStub.calledOnceWith('path/to/navigate'));
      });
    });

    context('when the argument is "--logs tiny"', () => {
      it('should execute a command with the logs in tiny mode', () => {
        const args = {
          _: ['test'],
          logs: 'tiny'
        };

        testcli(args);

        assert.ok(execCliStub.calledOnceWith('npm test -- --logs tiny'));
      });
    });

    context('when the argument is "--port 8080"', () => {
      it('should execute a command with the port in the 8080', () => {
        const args = {
          _: ['test'],
          port: '8080'
        };

        testcli(args);

        assert.ok(execCliStub.calledOnceWith('npm test -- --port 8080'));
      });
    });

    context('when the argument is "--cors business.uk.org,localhost"', () => {
      it('should execute a command with the cors in the business.uk.org,localhost', () => {
        const args = {
          _: ['test'],
          cors: 'business.uk.org,localhost'
        };

        testcli(args);

        assert.ok(execCliStub.calledOnceWith('npm test -- --cors business.uk.org,localhost'));
      });
    });
  });
});
