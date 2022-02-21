'use strict';

const { assert, expect } = require('chai');
const { stub } = require('sinon');
const { version } = require('./../../../package.json');
const proxyquire = require('proxyquire');
const chalk = require('chalk');

describe('generate', () => {
  describe('#generateCli', () => {
    describe('methods', () => {
      let generateCli;
      let getCliStub; let deleteCliStub; let headCliStub; let warnStub;
      let patchCliStub; let postCliStub; let putCliStub; let traceCliStub;

      beforeEach(() => {
        deleteCliStub = stub();
        getCliStub = stub();
        headCliStub = stub();
        patchCliStub = stub();
        postCliStub = stub();
        putCliStub = stub();
        traceCliStub = stub();
        warnStub = stub();
        generateCli = proxyquire('../../../src/generate/generate.cli', {
          './methods/delete.cli': { deleteCli: deleteCliStub },
          './methods/get.cli': { getCli: getCliStub },
          './methods/head.cli': { headCli: headCliStub },
          './methods/patch.cli': { patchCli: patchCliStub },
          './methods/post.cli': { postCli: postCliStub },
          './methods/put.cli': { putCli: putCliStub },
          './methods/trace.cli': { traceCli: traceCliStub },
          'console': { warn: warnStub }
        }).generateCli;
      });

      afterEach(() => proxyquire.callThru());

      describe('delete', () => {
        context('when delete/d command is added', () => {
          ['delete', 'd'].forEach((method) => {
            it(`should call deleteCli with the args for "${method}"`, () => {
              const args = {
                _: ['generate', method]
              };

              generateCli(args);

              assert.ok(deleteCliStub.calledOnceWith(args));
            });
          });
        });
      });

      describe('get', () => {
        context('when get/g command is added', () => {
          ['get', 'g'].forEach((method) => {
            it(`should call getCli with the args for "${method}"`, () => {
              const args = {
                _: ['generate', method]
              };

              generateCli(args);

              assert.ok(getCliStub.calledOnceWith(args));
            });
          });
        });
      });

      describe('head', () => {
        context('when head/h command is added', () => {
          ['head', 'h'].forEach((method) => {
            it(`should call headCli with the args for "${method}"`, () => {
              const args = {
                _: ['generate', method]
              };

              generateCli(args);

              assert.ok(headCliStub.calledOnceWith(args));
            });
          });
        });
      });

      describe('patch', () => {
        context('when patch/pa command is added', () => {
          ['patch', 'pa'].forEach((method) => {
            it(`should call patchCli with the args for "${method}"`, () => {
              const args = {
                _: ['generate', method]
              };

              generateCli(args);

              assert.ok(patchCliStub.calledOnceWith(args));
            });
          });
        });
      });

      describe('post', () => {
        context('when post/p command is added', () => {
          ['post', 'p'].forEach((method) => {
            it(`should call postCli with the args for "${method}"`, () => {
              const args = {
                _: ['generate', method]
              };

              generateCli(args);

              assert.ok(postCliStub.calledOnceWith(args));
            });
          });
        });
      });

      describe('put', () => {
        context('when put/pu command is added', () => {
          ['put', 'pu'].forEach((method) => {
            it(`should call putCli with the args for "${method}"`, () => {
              const args = {
                _: ['generate', method]
              };

              generateCli(args);

              assert.ok(putCliStub.calledOnceWith(args));
            });
          });
        });
      });

      describe('trace', () => {
        context('when trace/t command is added', () => {
          ['trace', 't'].forEach((method) => {
            it(`should call traceCli with the args for "${method}"`, () => {
              const args = {
                _: ['generate', method]
              };

              generateCli(args);

              assert.ok(traceCliStub.calledOnceWith(args));
            });
          });
        });
      });

      describe('no method found', () => {
        context('when no method is found', () => {
          ['any', 'other'].forEach((method) => {
            it(`should show warning message for "${method}"`, () => {
              const args = {
                _: ['generate', method]
              };

              generateCli(args);

              assert.ok(chalk.yellow('\nMethod not found :(\n'));
            });
          });
        });
      });
    });

    describe('help', ()=>{
      let generateCli;
      let infoStub;

      beforeEach(() => {
        infoStub= stub();
        generateCli = proxyquire('../../../src/generate/generate.cli', {
          'console': { info: infoStub }
        }).generateCli;
      });

      afterEach(() => proxyquire.callThru());

      context('when just help is added "hjs --help"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true
          };

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\n--Generate options --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate/g [method] [url]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate get/g [url]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (scenario for a GET request)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate post/p [url]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (scenario for a POST request)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate delete/d [url]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (scenario for a DELETE request)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate head/h [url]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (scenario for a HEAD request)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate put/pu [url]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (scenario for a PUT request)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate patch/pa [url]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (scenario for a PATCH request)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`\nOther options:\n`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (xml, headers, cookies, skip-install, status,\n`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  package, description, delay, template)\n`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(19);
        });
      });

      context('when help has headers as well like "hjs g --help --headers"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true,
            headers: true
          };

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\n--Header option --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate [method] --headers [header1],[header2]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Example: hjs g g customers --headers authorization,client_id)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(5);
        });
      });

      context('when help has cookies as well like "hjs g --help --cookies"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true,
            cookies: true
          };

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\n--Cookies option --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate [method] --cookies [key-cookie]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Example: hjs g g customers --cookies NormalCookie)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(5);
        });
      });

      context('when help has status as well like "hjs g --help --status"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true,
            status: true
          };

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\n--Status option --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate [method] --status [status-code]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Example: hjs g g customers --status 404)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(5);
        });
      });

      context('when help has status as well like "hjs g g path --package --help"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true,
            package: true
          };

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\n--Package option --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate [method] --package [folder-name]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Generate the file resource and test under the package.)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Example: hjs g g customers --package my-package/my-subpackage)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(6);
        });
      });

      context('when help has description as well like "hjs g --help --description"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true,
            description: true
          };

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\n--Description option --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate [method] --description "[description]"`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Example: hjs g g customers --description "Hello world!")`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(5);
        });
      });

      context('when help has delay as well like "hjs g --help --delay"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true,
            delay: 10
          };

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\n--Delay option --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate [method] --delay [milliseconds]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Example: hjs g g customers --delay 1000)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(5);
        });
      });

      context('when help has template as well like "hjs g --help --template"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true,
            template: 'template.json'
          };

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\n--Template option --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate [method] --template [path/to/file.json]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Example: hjs g g customers --template template.json)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(5);
        });
      });

      context('when help has xml as well like "hjs g --help --xml"', ()=>{
        it('should show common options', ()=>{
          const args = {
            help: true,
            xml: true
          };

          generateCli(args);
          assert.ok(infoStub.withArgs(chalk.green('\n--XML option --------------------------------\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.yellow(`hjs generate [method] --xml`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Response body is a xml)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  (Example: hjs g g customers --xml)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green('\n-----------------------------------------------')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`                                version: ${version}`)).calledOnce);
          expect(infoStub.callCount).to.equal(6);
        });
      });
    });
  });
});
