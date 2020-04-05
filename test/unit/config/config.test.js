'use strict';

import { assert, expect } from 'chai';
import { stub } from 'sinon';
import { HJS_PATH, PACKAGE_ROOT_JSON, BANNER_FILE, UNDER_HJS, ROOT_PROJECT } from '../../../src/utils/constants-backend';

const proxyquire = require('proxyquire');
const chalk = require('chalk');

describe('config', () => {
  describe('#config', () => {
    describe('validation', () => {
      let checkPathStub;
      let writeFileStub;
      let configCli;
      let infoStub;
      let multipleOptsStub;
      let args;
      const optsBanner = [
        { title: 'Yes', value: 'y' },
        { title: 'No', value: 'n' }
      ];

      beforeEach(() => {
        checkPathStub = stub();
        writeFileStub = stub();
        multipleOptsStub = stub();
        infoStub = stub();
        configCli = proxyquire('../../../src/config/config.cli', {
          './../utils/file-utils.cli': {
            checkPath: checkPathStub,
            multipleOpts: multipleOptsStub,
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
        const choices = [
          { title: 'Under _hjs folder', value: UNDER_HJS },
          { title: 'Root project', value: ROOT_PROJECT }
        ];

        beforeEach(() => {
          checkPathStub.withArgs(HJS_PATH).returns(true);
          checkPathStub.withArgs(PACKAGE_ROOT_JSON).returns(true);
        });

        it('asks for multiple choices', async () => {
          args.banner = true;

          await configCli(args);

          assert.ok(multipleOptsStub.calledWith('Where do you want to create it?', choices));
        });

        context('config file root project', () => {
          beforeEach(() => {
            multipleOptsStub.withArgs('Where do you want to create it?', choices).returns(Promise.resolve(ROOT_PROJECT));
          });

          describe('banner already exist', () => {
            beforeEach(() => checkPathStub.withArgs(`./${BANNER_FILE}`).returns(true));
            context('when "--banner" is added', () => {
              beforeEach(() => args.banner = true);

              it('is asking for replacing the file', async () => {
                await configCli(args);

                assert.ok(checkPathStub.calledWith(`./${BANNER_FILE}`));
                assert.ok(multipleOptsStub.calledWith('Custom banner already exists. Do you want to replace it?', optsBanner));
              });

              context('response "No"', () => {
                it('is creating a file', async () => {
                  multipleOptsStub
                      .withArgs('Custom banner already exists. Do you want to replace it?', optsBanner)
                      .returns(Promise.resolve({ data: 'n' }));

                  await configCli(args);

                  assert.ok(writeFileStub.notCalled);
                });
              });

              context(`response "Yes"`, () => {
                it('is creating a file', async () => {
                  multipleOptsStub
                      .withArgs('Custom banner already exists. Do you want to replace it?', optsBanner)
                      .returns(Promise.resolve({ data: 'y' }));

                  await configCli(args);

                  const data = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
                  assert.ok(writeFileStub.calledOnceWith('.hjs.banner.js', data));
                });
              });
            });
          });

          describe('banner no exist', () => {
            beforeEach(() => checkPathStub.withArgs(`./${BANNER_FILE}`).returns(false));

            describe('root project', () => {
              context('when "--banner" is added', () => {
                beforeEach(() => args.banner = true);
                it('is creating a file without asking', async () => {
                  await configCli(args);

                  const data = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
                  assert.ok(writeFileStub.calledOnceWith('.hjs.banner.js', data));
                  assert.ok(multipleOptsStub
                      .withArgs('Custom banner already exists. Do you want to replace it?', optsBanner).notCalled);
                });
              });
            });
          });
        });

        context('config file under _hjs', () => {
          beforeEach(() => {
            multipleOptsStub.withArgs('Where do you want to create it?', choices).returns(Promise.resolve(UNDER_HJS));
          });

          describe('banner already exist', () => {
            beforeEach(() => checkPathStub.withArgs(`./_hjs/${BANNER_FILE}`).returns(true));
            context('when "--banner" is added', () => {
              beforeEach(() => args.banner = true);

              it('is asking for replacing the file', async () => {
                await configCli(args);

                assert.ok(checkPathStub.calledWith(`./_hjs/${BANNER_FILE}`));
                assert.ok(multipleOptsStub
                    .calledWith('Custom banner already exists. Do you want to replace it?', optsBanner));
              });

              context('response "No"', () => {
                it('is creating a file', async () => {
                  multipleOptsStub
                      .withArgs('Custom banner already exists. Do you want to replace it?', optsBanner)
                      .returns(Promise.resolve({ data: 'n' }));

                  await configCli(args);

                  assert.ok(writeFileStub.notCalled);
                });
              });

              context(`response "Yes"`, () => {
                it('is creating a file', async () => {
                  multipleOptsStub
                      .withArgs('Custom banner already exists. Do you want to replace it?', optsBanner)
                      .returns(Promise.resolve({ data: 'y' }));

                  await configCli(args);

                  const data = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
                  assert.ok(writeFileStub.calledOnceWith('_hjs/.hjs.banner.js', data));
                });
              });
            });
          });

          describe('banner no exist', () => {
            beforeEach(() => checkPathStub.withArgs(`./_hjs/${BANNER_FILE}`).returns(false));

            describe('root project', () => {
              context('when "--banner" is added', () => {
                beforeEach(() => args.banner = true);
                it('is creating a file without asking', async () => {
                  await configCli(args);

                  const data = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
                  assert.ok(writeFileStub.calledOnceWith('_hjs/.hjs.banner.js', data));
                  assert.ok(multipleOptsStub
                      .withArgs('Custom banner already exists. Do you want to replace it?', optsBanner));
                });
              });
            });
          });
        });

        context('when "--banner" and "--logs 8080" are added', () => {
          context('config file root project', () => {
            it('creates a .hjs.banner.js and .hjs.config.json files are created', async () => {
              multipleOptsStub
                  .withArgs('Where do you want to create it?', choices)
                  .returns(Promise.resolve(ROOT_PROJECT));

              multipleOptsStub
                  .withArgs('Custom banner already exists. Do you want to replace it?', optsBanner)
                  .returns(Promise.resolve({ data: 'y' }));
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

          context('config file under _hjs', () => {
            it('creates a .hjs.banner.js and .hjs.config.json files are created', async () => {
              multipleOptsStub.withArgs('Where do you want to create it?', choices).returns(Promise.resolve(UNDER_HJS));

              multipleOptsStub
                  .withArgs('Custom banner already exists. Do you want to replace it?', optsBanner).returns(Promise.resolve({ data: 'y' }));
              checkPathStub.withArgs(BANNER_FILE).returns(false);
              args.banner = true;
              args.port = 8080;

              await configCli(args);

              assert.ok(writeFileStub.calledTwice);
              const dataBanner = 'module.exports= function (){\n console.log("custom banner ready to set:)")\n};\n';
              assert.ok(writeFileStub.calledWith('_hjs/.hjs.banner.js', dataBanner));
              const dataConfig = JSON.stringify({ port: 8080 }, null, '\t');
              assert.ok(writeFileStub.calledWith('_hjs/.hjs.config.json', dataConfig));
            });
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
