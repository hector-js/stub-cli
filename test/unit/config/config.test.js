'use strict';

import { assert, expect } from 'chai';
import { stub } from 'sinon';
import { HJS_PATH, PACKAGE_ROOT_JSON } from '../../../src/utils/constants-backend';

const proxyquire = require('proxyquire');

const chalk = require('chalk');


describe('config', () => {
  describe('#config', () => {
    describe('validation', () => {
      let checkPathStub;
      let writeFileStub;
      let configCli;
      let infoStub;
      let args;

      beforeEach(() => {
        checkPathStub = stub();
        writeFileStub = stub();
        infoStub = stub();
        configCli = proxyquire('../../../src/config/config.cli', {
          './../utils/file-utils.cli': { checkPath: checkPathStub, writeFileByData: writeFileStub },
          'console': { info: infoStub }
        }).config;
        args = { _: ['config'] };
      });

      afterEach(() => proxyquire.callThru());

      describe('generate .hjs.config.json', () => {
        beforeEach(() => {
          checkPathStub.withArgs(HJS_PATH).returns(true);
          checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(true);
        });

        context('when resource folder and package.json file exist', () => {
          it('is not displaying info message', () => {
            checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(true);
            checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(true);

            configCli(args);

            assert.ok(infoStub.notCalled);
          });
        });

        context('when "--port" is added', () => {
          it('should generate with port section', () => {
            args.port = 3005;

            configCli(args);

            const data = JSON.stringify({ port: 3005 }, null, '\t');
            assert.ok(writeFileStub.calledOnceWith('.hjs.config.json', data));
          });
        });

        context('when "--logs" is added', () => {
          it('should generate with logs section', () => {
            args.logs = 'tiny';

            configCli(args);

            const data = JSON.stringify({ logs: 'tiny' }, null, '\t');
            assert.ok(writeFileStub.calledOnceWith('.hjs.config.json', data));
          });
        });

        context('when no properties are added', () => {
          it('generates a file empty', () => {
            configCli(args);

            const data = JSON.stringify({}, null, '\t');
            assert.ok(writeFileStub.calledOnceWith('.hjs.config.json', data));
          });
        });
      });

      describe('generate .hjs.banner.js', () => {
        beforeEach(() => {
          checkPathStub.withArgs(HJS_PATH).returns(true);
          checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(true);
        });

        context('when "--banner" is added', ()=>{
          it('creates a .hjs.banner.js file with example code', ()=>{
            args.banner = true;

            configCli(args);

            const data = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
            assert.ok(writeFileStub.calledOnceWith('.hjs.banner.js', data));
          });
        });

        context('when "--banner" and "--logs 8080" are added', ()=>{
          it('creates a .hjs.banner.js and .hjs.config.json files are created', ()=>{
            args.banner = true;
            args.port = 8080;

            configCli(args);

            assert.ok(writeFileStub.calledTwice);
            const dataBanner = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
            assert.ok(writeFileStub.calledWith('.hjs.banner.js', dataBanner));
            const dataConfig = JSON.stringify({ port: 8080 }, null, '\t');
            assert.ok(writeFileStub.calledWith('.hjs.config.json', dataConfig));
          });
        });
      });

      describe('error creation', () => {
        context('when the root does not contain a package.json', () => {
          it('should show an info message', () => {
            checkPathStub.withArgs(HJS_PATH).returns(false);

            configCli(args);

            expect(infoStub.callCount).to.equal(1);
            assert.ok(infoStub.calledOnceWith(chalk.red('Package.json should exists :(')));
          });
        });

        context('when there is no resources file', () => {
          it('should show an info message', () => {
            checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(false);

            configCli(args);

            expect(infoStub.callCount).to.equal(1);
            assert.ok(infoStub.calledOnceWith(chalk.red('Package.json should exists :(')));
          });
        });
      });

      describe('help', () => {
        context('when help property is added after config', () => {
          it('should display help options for config', () => {
            args = { _: ['config'], help: true };

            configCli(args);

            expect(infoStub.callCount).to.equal(5);
            assert.ok(infoStub.withArgs(chalk.green('\nConfig options:\n')).calledOnce);
            assert.ok(infoStub.withArgs(chalk.grey(' -  hjs config --port [port]: select port')).calledOnce);
            assert.ok(infoStub.withArgs(chalk.grey(' -  hjs config --logs [logs]: select logs')).calledOnce);
            assert.ok(infoStub.withArgs(chalk.grey(' -  hjs config --banner: create custom banner')).calledOnce);
            assert.ok(infoStub.withArgs(chalk.grey('\n        Example: hjs config --port 3004 --logs tiny --banner')).calledOnce);
          });
        });
      });
    });
  });
});
