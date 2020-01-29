'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');
const chalk = require('chalk');

describe('cli', () => {
  let cli;
  let sizeObjectStub; let generateCliStub; let newCliStub;
  let startStub; let infoStub; let warnStub; let testcliStub; let configStub;
  let args;

  beforeEach(() => {
    generateCliStub = stub();
    sizeObjectStub = stub();
    newCliStub = stub();
    startStub = stub();
    infoStub = stub();
    warnStub = stub();
    testcliStub = stub();
    configStub = stub();
    cli = proxyquire('../../src/cli', {
      './generate/generate.cli': { generateCli: generateCliStub },
      './utils/utils.cli': { sizeObject: sizeObjectStub },
      './new/new.cli': { newCli: newCliStub },
      './start/start.cli': { start: startStub },
      './testcli/test.cli': { testcli: testcliStub },
      './config/config.cli': { config: configStub },
      'console': { info: infoStub, warn: warnStub }
    }).cli;
    args = {
      _: ['']
    };
  });

  afterEach(() => proxyquire.callThru());

  describe('first arg', () => {
    describe('#newCli', () => {
      context('when new/n command is added', () => {
        ['new', 'n'].forEach((command) => {
          it(`should call newCli with the args for "${command}"`, () => {
            args = {
              _: [command, 'any name']
            };

            cli(args);

            assertStubBy(newCliStub);
          });
        });
      });
    });

    describe('#generateCli', () => {
      context('when generate/g command is added', () => {
        ['generate', 'g'].forEach((command) => {
          it(`should call generateCli with the args for "${command}"`, () => {
            args = {
              _: [command, 'any name']
            };

            cli(args);

            assertStubBy(generateCliStub);
          });
        });
      });
    });

    describe('#start', () => {
      context('when start/s command is added', () => {
        ['start', 's'].forEach((command) => {
          it(`should call start with the args for "${command}"`, () => {
            args = {
              _: [command, 'any name']
            };

            cli(args);

            assertStubBy(startStub);
          });
        });
      });
    });

    describe('#test', () => {
      context('when test/t command is added', () => {
        ['test', 't'].forEach((command) => {
          it(`should call test with the args for "${command}"`, () => {
            args = {
              _: [command, 'any name']
            };

            cli(args);

            assertStubBy(testcliStub);
          });
        });
      });
    });

    describe('#config', () => {
      context('when the second param is config', () => {
        ['config', 'c'].forEach((arg) => {
          it(`should call with ${arg}`, () => {
            args = {
              _: [arg, 'any value']
            };

            cli(args);

            assertStubBy(configStub);
          });
        });
      });
    });

    function assertStubBy(stubToCompare) {
      const stubs = [configStub, testcliStub, startStub, generateCliStub, newCliStub];
      stubs.filter((value) => value === stubToCompare).forEach((stub) => assert.ok(stub.calledOnceWith(args)));
      stubs.filter((value) => value !== stubToCompare).forEach((stub) => assert.ok(stub.notCalled));
    }
  });

  describe('#version', () => {
    context('when version command is added "--version"', () => {
      it('shoul pass (make the mock works) :(', () => cli(args));

      it(`should call info with the args "`, () => {
        args = {
          version: true,
          _: ['']
        };

        cli(args);

        assert.ok(infoStub.withArgs(chalk.yellow(`\nVersion: 0.93.0\n`)).calledOnce);
      });
    });
  });

  describe('#license', () => {
    context('when license command is added "--license"', () => {
      it(`shoul pass (make the mock works) :(`, () => cli(args));

      it(`should call info with the args "--license"`, () => {
        args = {
          license: true,
          _: ['']
        };

        cli(args);

        assert.ok(infoStub.withArgs(chalk.yellow(`\nLicense: MIT\n`)).calledOnce);
      });
    });
  });

  describe('#help', () => {
    context('when help command is added "--help"', () => {
      it(`shoul pass (make the mock works) :(`, () => cli(args));

      it(`should call info with the args "--help"`, () => {
        args = {
          help: true,
          _: ['']
        };

        cli(args);

        assert.ok(infoStub.withArgs(chalk.green('\nBelow, you can see different options for your mock:\n')).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  new/n [name-project]  : create new mock project `)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  generate/g  get/g/post/p/delete/d  [url]: create url section `)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  start     : run mock service `)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  test      : execute the tests `)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  --version : know version hjs`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  --vs      : open visual code studio if exists`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  --idea    : open intelliJ studio if exists`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  --headers : add headers to check in the request`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(` -  --license : MIT\n\n`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.grey(`Example: hjs new mock-service --vs\n`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.yellow(`version: 0.93.0\n`)).calledOnce);
      });
    });
  });

  describe('#sorry', () => {
    it(`should pass`, () => cli(args));

    it(`should show warning`, () => {
      sizeObjectStub.returns(1);
      args = {
        _: []
      };

      cli(args);

      assert.ok(warnStub.withArgs(chalk.red('\nSorry, you missed a parameter (hjs --help)')).calledOnce);
    });
  });
});
