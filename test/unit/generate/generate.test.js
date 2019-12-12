'use strict';

import { assert, expect } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');

const chalk = require('chalk');

describe('generate', () => {
  describe('#generateCli', () => {
    describe('methods', () => {
      let generateCli;
      let getCliStub, deleteCliStub, headCliStub;
      let patchCliStub, postCliStub, putCliStub, traceCliStub;

      beforeEach(() => {
        deleteCliStub = stub();
        getCliStub = stub();
        headCliStub = stub();
        patchCliStub = stub();
        postCliStub = stub();
        putCliStub = stub();
        traceCliStub = stub();
        generateCli = proxyquire('../../../src/generate/generate.cli', {
          './methods/delete.cli': { deleteCli: deleteCliStub },
          './methods/get.cli': { getCli: getCliStub },
          './methods/head.cli': { headCli: headCliStub },
          './methods/patch.cli': { patchCli: patchCliStub },
          './methods/post.cli': { postCli: postCliStub },
          './methods/put.cli': { putCli: putCliStub },
          './methods/trace.cli': { traceCli: traceCliStub }
        }).generateCli;
      });

      afterEach(() => proxyquire.callThru());

      describe('delete', () => {
        context('when delete/d command is added', () => {
          ['delete', 'd'].forEach(method => {
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
          ['get', 'g'].forEach(method => {
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
          ['head', 'h'].forEach(method => {
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
          ['patch', 'pa'].forEach(method => {
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
          ['post', 'p'].forEach(method => {
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
          ['put', 'pu'].forEach(method => {
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
          ['trace', 't'].forEach(method => {
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
    });

    describe('help',()=>{
      let generateCli;
      let infoStub;

      beforeEach(() => {
        infoStub= stub();
        generateCli = proxyquire('../../../src/generate/generate.cli', {
          'console': { info: infoStub }
        }).generateCli;
      });

      afterEach(() => proxyquire.callThru());

      context('when just help is added "hjs --help"',()=>{
        it('should show common options',()=>{
          const args = {
            help: true
          }

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\nGenerate options:\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  hjs generate get [url]: scenario for a GET request`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  hjs generate post [url]: scenario for a POST request`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  hjs generate delete [url]: scenario for a DELETE request`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  hjs generate head [url]: scenario for a HEAD request`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  hjs generate put [url]: scenario for a PUT request`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  hjs generate patch [url]: scenario for a PATCH request`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.green(`\nYou can use the following abreviatures:\n`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  generate = g  (hjs g get ...)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  get = g       (hjs g g ...)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  post = p      (hjs g p ...)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  delete = d    (hjs g d ...)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  head = h      (hjs g h ...)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  put = pu      (hjs g pu ...)`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  patch = pa    (hjs g pa ...)\n`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(` -  trace = t     (hjs g t ...)\n`)).calledOnce);
          expect(infoStub.callCount).to.equal(16);
        });
      });

      context('when help has headers as well like "hjs --help --headers"',()=>{
        it('should show common options',()=>{
          const args = {
            help: true,
            headers: true
          }

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\nHeader options:\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  --headers [header1],[header2]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`    Example: hjs g g customrers --headers authorization,client_id`)).calledOnce);
          expect(infoStub.callCount).to.equal(3);
        });
      });

      context('when help has cookies as well like "hjs --help --cookies"',()=>{
        it('should show common options',()=>{
          const args = {
            help: true,
            cookies: true
          }

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\nCookies options:\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  --cookies [status]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`    Example: hjs g g customrers --cookies NormalCookie`)).calledOnce);
          expect(infoStub.callCount).to.equal(3);
        });
      });

      context('when help has status as well like "hjs --help --status"',()=>{
        it('should show common options',()=>{
          const args = {
            help: true,
            status: true
          }

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\nStatus options:\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  --status [status]`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`    Example: hjs g g customrers --status 404`)).calledOnce);
          expect(infoStub.callCount).to.equal(3);
        });
      });

      context('when help has description as well like "hjs --help --description"',()=>{
        it('should show common options',()=>{
          const args = {
            help: true,
            description: true
          }

          generateCli(args);

          assert.ok(infoStub.withArgs(chalk.green('\nDescription options:\n')).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`  --description "[status]"`)).calledOnce);
          assert.ok(infoStub.withArgs(chalk.grey(`    Example: hjs g g customrers --description "Hello world!"`)).calledOnce);
          expect(infoStub.callCount).to.equal(3);
        });
      });
    });
  });
});
