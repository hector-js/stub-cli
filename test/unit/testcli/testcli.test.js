'use strict';

import { expect } from 'chai';
import { stub, assert } from 'sinon';
import proxyquire from 'proxyquire';
import chalk from 'chalk';
import { version } from './../../../package.json';

describe('testcli', () => {
  let testcli;
  let runTestsCliStub;
  let cdCliStub;
  let infoStub;

  beforeEach(() => {
    runTestsCliStub = stub();
    cdCliStub = stub();
    infoStub = stub();
    testcli = proxyquire('../../../src/testcli/test.cli', {
      '../utils/runners.cli': { runTests: runTestsCliStub },
      'shelljs': { cd: cdCliStub },
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

      assert.calledOnceWithExactly(runTestsCliStub, undefined, undefined);
    });
  });

  context('when testcli is comming with help flag such as "--help"', () => {
    it('should show the help options', () => {
      const args = {
        _: ['test'],
        help: true
      };

      testcli(args);

      // expect(infoStub.withArgs(chalk.green('\nTest options:\n')).calledOnce).to.be.true;
      // expect(infoStub.withArgs(chalk.grey(` -  hjs test       : execute tests related to the mock`)).calledOnce).to.be.true;
      // expect(infoStub.withArgs(chalk.grey(` -  hjs test --path: execute test in the path`)).calledOnce).to.be.true;
      // expect(infoStub.withArgs(chalk.grey(`        Example: hjs test --path folderOne/folderTwo/projectFolder`)).calledOnce).to.be.true;


      expect(infoStub.withArgs(chalk.green('\n-- Test options --------------------------------\n')).calledOnce).to.be.true;
      expect(infoStub.withArgs(chalk.yellow(`hjs test`)).calledOnce).to.be.true;
      expect(infoStub.withArgs(chalk.grey(`  (execute tests related to the mock)`)).calledOnce).to.be.true;
      expect(infoStub.withArgs(chalk.yellow(`hjs test --path`)).calledOnce).to.be.true;
      expect(infoStub.withArgs(chalk.grey(`  (execute test in the path)`)).calledOnce).to.be.true;
      expect(infoStub.withArgs(chalk.grey(`  (Example: hjs test --path folderOne/folderTwo/projectFolder`)).calledOnce).to.be.true;
      expect(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce).to.be.true;
      expect(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce).to.be.true;
    });
  });

  describe('arguments', () => {
    context('when the argument is "--include path/to/navigate"', () => {
      it('should navigate to the directory from where you are first', () => {
        const args = {
          _: ['test'],
          path: 'path/to/navigate'
        };

        testcli(args);

        assert.calledOnceWithExactly(runTestsCliStub, undefined, undefined);
        assert.calledOnceWithExactly(cdCliStub, 'path/to/navigate');
      });
    });

    context('when the argument is "--profile flan"', () => {
      it('changes process.env.KEY to flan', () => {
        const args = {
          _: ['test'],
          profile: 'flan'
        };

        testcli(args);

        assert.calledOnceWithExactly(runTestsCliStub, undefined, undefined);
        expect(process.env.KEY).to.eq('flan');
      });
    });

    context('when the argument is "--include any-regex"', () => {
      it('includes the tests which match the regex', () => {
        const args = {
          _: ['test'],
          include: 'my-regex'
        };

        testcli(args);

        assert.calledOnceWithExactly(runTestsCliStub, undefined, 'my-regex');
      });
    });

    context('when the argument is "--root my-root"', () => {
      it('includes test under relative path root', () => {
        const args = {
          _: ['test'],
          root: 'my-root'
        };

        testcli(args);

        assert.calledOnceWithExactly(runTestsCliStub, 'my-root', undefined);
      });
    });
  });
});
