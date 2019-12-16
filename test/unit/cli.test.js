'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');

const chalk = require('chalk');

describe('cli', () => {
  let cli;
  let sizeObjectStub, generateCliStub, newCliStub;
  let startStub, execStub, infoStub, warnStub;

  beforeEach(() => {
    generateCliStub = stub();
    sizeObjectStub = stub();
    newCliStub = stub();
    startStub = stub();
    execStub = stub();
    infoStub = stub();
    warnStub = stub();
    cli = proxyquire('../../src/cli', {
      './generate/generate.cli': { generateCli: generateCliStub },
      './utils/utils.cli': { sizeObject: sizeObjectStub },
      './new/new.cli': { newCli: newCliStub },
      './start/start.cli': { start: startStub },
      'shelljs': { exec: execStub },
      'console': { info: infoStub, warn: warnStub }
    }).cli;
  });

  afterEach(() => proxyquire.callThru());

  describe('#newCli', () => {
    context('when new/n command is added', () => {
      ['new', 'n'].forEach(command => {
        it(`should call newCli with the args for "${command}"`, () => {
          const args = {
            _: [command, 'any name']
          };

          cli(args);

          assert.ok(newCliStub.calledOnceWith(args));
        });
      });
    });
  });

  describe('#generateCli', () => {
    context('when generate/g command is added', () => {
      ['generate', 'g'].forEach(command => {
        it(`should call generateCli with the args for "${command}"`, () => {
          const args = {
            _: [command, 'any name']
          };

          cli(args);

          assert.ok(generateCliStub.calledOnceWith(args));
        });
      });
    });
  });

  describe('#start', () => {
    context('when start/s command is added', () => {
      ['start', 's'].forEach(command => {
        it(`should call start with the args for "${command}"`, () => {
          const args = {
            _: [command, 'any name']
          };

          cli(args);

          assert.ok(startStub.calledOnceWith(args));
        });
      });
    });
  });

  describe('#test', () => {
    context('when test/t command is added', () => {
      ['test', 't'].forEach(command => {
        it(`should call test with the args for "${command}"`, () => {
          const args = {
            _: [command, 'any name']
          };

          cli(args);

          assert.ok(execStub.calledOnceWith('npm test'));
        });
      });
    });
  });

  describe('#version', () => {
    context('when version command is added "--version"', () => {
      it('shoul pass (make the mock works)', () => {
        const args = {
          version: true,
          _: ['']
        };

        cli(args);
      });

      it(`should call info with the args "`, () => {
        const args = {
          version: true,
          _: ['']
        };

        cli(args);

        assert.ok(infoStub.withArgs(chalk.yellow(`\nVersion: 0.83.0\n`)).calledOnce);
      });
    });
  });

  describe('#license', () => {
    context('when license command is added "--license"', () => {
      it(`should call info with the args "`, () => {
        const args = {
          license: true,
          _: ['']
        };

        cli(args);

        assert.ok(infoStub.withArgs(chalk.yellow(`\nLicense: MIT\n`)).calledOnce);
      });
    });
  });

  describe('#help', () => {
    context('when help command is added "--license"', () => {
      it(`should call info with the args "`, () => {
        const args = {
          help: true,
          _: ['']
        };

        cli(args);

        assert.ok(infoStub.withArgs(chalk.green('\nBelow, you can see different options for your mock:\n\n')).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  new/n [name-project]  : create new mock project `)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  generate/g  get/g/post/p/delete/d  [url]: create url section `)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  start     : run mock service `)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  test      : execute the tests `)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  --version : know version hjs`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  --vs      : open visual code studio if exists`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  --idea    : open intelliJ studio if exists`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  --headers : add headers to check in the request`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(` -  --license : MIT\n\n`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.green(`Example: hjs new mock-service --vs\n`)).calledOnce);
        assert.ok(infoStub.withArgs(chalk.yellow(`version: 0.83.0\n`)).calledOnce);
      });
    });
  });

  describe('#sorry', () => {
    it(`should pass`, () => {
      const args = {
        _: ['']
      };

      cli(args);
    });

    it(`should show warning`, () => {
      sizeObjectStub.returns(1);
      const args = {
        _: []
      };

      cli(args);

      assert.ok(warnStub.withArgs(chalk.red('\nSorry, you missed a parameter (hjs --help)')).calledOnce);
    });
  });
});
