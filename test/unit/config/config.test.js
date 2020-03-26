'use strict';

import { assert, expect } from 'chai';
import { stub } from 'sinon';
import { HJS_PATH, PACKAGE_ROOT_JSON, BANNER_FILE } from '../../../src/utils/constants-backend';

const proxyquire = require('proxyquire');
const chalk = require('chalk');

describe('config', () => {
  describe('#config', () => {
    describe('validation', () => {
      let checkPathStub;
      let writeFileStub;
      let configCli;
      let infoStub;
      let handleQuestionStub;
      let args;

      beforeEach(() => {
        checkPathStub = stub();
        writeFileStub = stub();
        handleQuestionStub = stub();
        infoStub = stub();
        configCli = proxyquire('../../../src/config/config.cli', {
          './../utils/file-utils.cli': {
            checkPath: checkPathStub,
            handleQuestion: handleQuestionStub,
            writeFileByData: writeFileStub
          },
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
          it('is not displaying info message', async () => {
            checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(true);
            checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(true);

            await configCli(args);

            assert.ok(infoStub.notCalled);
          });
        });

        context('when "--port" is added', () => {
          it('should generate with port section', async () => {
            args.port = 3005;

            await configCli(args);

            const data = JSON.stringify({ port: 3005 }, null, '\t');
            assert.ok(writeFileStub.calledOnceWith('.hjs.config.json', data));
          });
        });

        context('when "--logs" is added', () => {
          it('should generate with logs section', async () => {
            args.logs = 'tiny';

            await configCli(args);

            const data = JSON.stringify({ logs: 'tiny' }, null, '\t');
            assert.ok(writeFileStub.calledOnceWith('.hjs.config.json', data));
          });
        });

        context('when no properties are added', () => {
          it('generates a file empty', async () => {
            await configCli(args);

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

        describe('banner already exist', () => {
          beforeEach(() => checkPathStub.withArgs(`./${BANNER_FILE}`).returns(true));
          context('when "--banner" is added', () => {
            beforeEach(() => args.banner = true);

            it('is asking for replacing the file', async () => {
              await configCli(args);

              assert.ok(checkPathStub.calledWith(`./${BANNER_FILE}`));
              assert.ok(handleQuestionStub.calledOnceWith('Custom banner already exists. Do you want to replace it? [Yn] '));
            });

            context('response different', () => {
              it('is creating a file', async () => {
                handleQuestionStub.returns(Promise.resolve('n'));

                await configCli(args);

                assert.ok(writeFileStub.notCalled);
              });
            });

            ['y', 'Y', 'yes', 'YES', 'Yes'].forEach((value) => {
              context(`response ${value}`, () => {
                it('is creating a file', async () => {
                  handleQuestionStub.returns(Promise.resolve(value));

                  await configCli(args);

                  const data = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
                  assert.ok(writeFileStub.calledOnceWith('.hjs.banner.js', data));
                });
              });
            });
          });
        });

        describe('banner no exist', () => {
          beforeEach(() => checkPathStub.withArgs(`./${BANNER_FILE}`).returns(false));
          context('when "--banner" is added', () => {
            beforeEach(() => args.banner = true);
            it('is creating a file without asking', async () => {
              await configCli(args);

              const data = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
              assert.ok(writeFileStub.calledOnceWith('.hjs.banner.js', data));
              assert.ok(handleQuestionStub.notCalled);
            });
          });
        });

        context('when "--banner" and "--logs 8080" are added', () => {
          it('creates a .hjs.banner.js and .hjs.config.json files are created', async () => {
            handleQuestionStub.returns(Promise.resolve('y'));
            checkPathStub.withArgs(BANNER_FILE).returns(false);
            args.banner = true;
            args.port = 8080;

            await configCli(args);

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
          it('should show an info message', async () => {
            checkPathStub.withArgs(HJS_PATH).returns(false);

            await configCli(args);

            expect(infoStub.callCount).to.equal(1);
            assert.ok(infoStub.calledOnceWith(chalk.red('Package.json should exists :(')));
          });
        });

        context('when there is no resources file', () => {
          it('should show an info message', async () => {
            checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(false);

            await configCli(args);

            expect(infoStub.callCount).to.equal(1);
            assert.ok(infoStub.calledOnceWith(chalk.red('Package.json should exists :(')));
          });
        });
      });

      describe('help', () => {
        context('when help property is added after config', () => {
          it('should display help options for config', async () => {
            args = { _: ['config'], help: true };

            await configCli(args);

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
