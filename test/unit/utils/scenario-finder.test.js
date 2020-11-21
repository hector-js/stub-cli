'use strict';

import { assert, expect } from 'chai';
import { stub } from 'sinon';
import { PACKAGE_JSON, RESOURCES_PATH } from '../../../src/utils/constants-backend';

const proxyquire = require('proxyquire');

describe('scenario-provider', () => {
  describe('#scenarioGenerator', () => {
    let writeFileByDataStub;
    let createFileStub;
    let cdStub;
    let mkdirStub;
    let checkStub;
    let scenarioGenerator;

    beforeEach(() => {
      checkStub = stub();
      writeFileByDataStub = stub();
      createFileStub = stub();
      cdStub = stub();
      mkdirStub = stub();
      scenarioGenerator = proxyquire('../../../src/utils/scenario-finder.cli', {
        './file-utils.cli': {
          'checkPath': checkStub,
          'writeFileByData': writeFileByDataStub,
          'createFileInPath': createFileStub
        },
        'shelljs': {
          cd: cdStub,
          mkdir: mkdirStub
        }
      }).scenarioGenerator;
    });

    afterEach(() => proxyquire.callThru());

    describe('a template with package.json and resources folder', () => {
      let args;

      beforeEach(() => {
        args = {
          _: ['', '', '/any-path/{id}/data']
        };
        checkStub.withArgs(PACKAGE_JSON).returns(true);
        checkStub.withArgs(RESOURCES_PATH).returns(true);
        scenarioGenerator = proxyquire('../../../src/utils/scenario-finder.cli', {
          './file-utils.cli': {
            checkPath: checkStub,
            writeFileByData: writeFileByDataStub,
            createFileInPath: createFileStub
          },
          'shelljs': {
            cd: cdStub,
            mkdir: mkdirStub
          }
        }).scenarioGenerator;
      });

      describe('navigation path', () => {
        it('should navigate to the proper file', () => {
          scenarioGenerator(args, stub(), stub(), null);

          expect(cdStub.callCount).to.equals(3);
          assert.ok(cdStub.withArgs('resources').calledOnce);
          assert.ok(cdStub.withArgs('..').calledOnce);
          assert.ok(cdStub.withArgs('test').calledOnce);
        });
      });

      describe('resource template', () => {
        it('should write a file with the proper name and template', () => {
          const resourceTemplateStub = stub();
          resourceTemplateStub.withArgs(args, ['id']).returns('any template');

          scenarioGenerator(args, resourceTemplateStub, stub(), 'get');

          expect(cdStub.callCount).to.equals(3);
          assert.ok(resourceTemplateStub.calledOnceWith(args, ['id']));
          assert.ok(writeFileByDataStub.withArgs('any-path-id-data-get.json', 'any template').calledOnce);
        });
      });

      describe('test template', () => {
        it('should write a file with the proper name and template', () => {
          const testTemplateStub = stub();
          testTemplateStub.withArgs(args, ['id']).returns('any template');

          scenarioGenerator(args, stub(), testTemplateStub, 'get');

          expect(cdStub.callCount).to.equals(3);
          assert.ok(testTemplateStub.withArgs(args, ['id']).calledOnce);
          assert.ok(writeFileByDataStub.withArgs('any-path-id-data-get.test.js', 'any template').calledOnce);
        });
      });

      describe('path is set', () => {
        it('should generate the file under two levels', () => {
          args = {
            _: ['', '', '/any-path/{id}/data'],
            package: 'cases/data'
          };
          const testTemplateStub = stub();
          checkStub.withArgs('./cases').returns(false);
          checkStub.withArgs('./data').returns(false);
          mkdirStub.withArgs('cases').returns(false);
          mkdirStub.withArgs('data').returns(false);
          testTemplateStub.withArgs(args, ['id']).returns('any template');

          scenarioGenerator(args, stub(), testTemplateStub, 'get');

          expect(cdStub.callCount).to.equals(13);
          assert.ok(cdStub.withArgs('cases/data').calledTwice);
          expect(cdStub.withArgs('../..').callCount).to.equals(4);
          assert.ok(cdStub.withArgs('cases').calledTwice);
          assert.ok(cdStub.withArgs('data').calledTwice);
          assert.ok(testTemplateStub.withArgs(args, ['id']).calledOnce);
          assert.ok(writeFileByDataStub.withArgs('any-path-id-data-get.test.js', 'any template').calledOnce);
        });

        context('when the path starts with /', () => {
          it('should generate the file under two levels', () => {
            args = {
              _: ['', '', '/any-path/{id}/data'],
              package: '/cases/data'
            };
            const testTemplateStub = stub();
            testTemplateStub.withArgs(args, ['id']).returns('any template');

            scenarioGenerator(args, stub(), testTemplateStub, 'get');

            expect(cdStub.callCount).to.equals(13);
            assert.ok(cdStub.withArgs('cases/data').calledTwice);
            expect(cdStub.withArgs('../..').callCount).to.equals(4);
            assert.ok(cdStub.withArgs('cases').calledTwice);
            assert.ok(cdStub.withArgs('data').calledTwice);
            assert.ok(testTemplateStub.withArgs(args, ['id']).calledOnce);
            assert.ok(writeFileByDataStub.withArgs('any-path-id-data-get.test.js', 'any template').calledOnce);
          });
        });

        context('when the path ends with /', () => {
          it('should generate the file under two levels', () => {
            args = {
              _: ['', '', '/any-path/{id}/data'],
              package: 'cases/data/'
            };
            const testTemplateStub = stub();
            testTemplateStub.withArgs(args, ['id']).returns('any template');

            scenarioGenerator(args, stub(), testTemplateStub, 'get');

            expect(cdStub.callCount).to.equals(13);
            assert.ok(cdStub.withArgs('cases/data').calledTwice);
            expect(cdStub.withArgs('../..').callCount).to.equals(4);
            assert.ok(testTemplateStub.withArgs(args, ['id']).calledOnce);
            assert.ok(writeFileByDataStub.withArgs('any-path-id-data-get.test.js', 'any template').calledOnce);
          });
        });

        it('should generate the file under one level', () => {
          args = {
            _: ['', '', '/any-path/{id}/data'],
            package: 'cases'
          };
          const testTemplateStub = stub();
          testTemplateStub.withArgs(args, ['id']).returns('any template');

          scenarioGenerator(args, stub(), testTemplateStub, 'get');

          expect(cdStub.callCount).to.equals(11);
          expect(cdStub.withArgs('cases').callCount).to.equals(4);
          expect(cdStub.withArgs('..').callCount).to.equals(5);
          assert.ok(testTemplateStub.withArgs(args, ['id']).calledOnce);
          assert.ok(writeFileByDataStub.withArgs('any-path-id-data-get.test.js', 'any template').calledOnce);
        });
      });

      [null, undefined, ''].forEach((value) => it(`should return the same value for ${value}`, () => {
        args = {
          _: ['', '', value]
        };
        const resourceTemplateStub = stub();
        resourceTemplateStub.returns('any template');

        assert.throws(() => scenarioGenerator(args, stub(), stub(), null), Error, '');
      }));
    });

    describe('location is not right', () => {
      context('when the package.json is not at the same level', () => {
        it('should throw an error', () => {
          checkStub.withArgs(RESOURCES_PATH).returns(true);

          assert.throws(() => scenarioGenerator(null, null, null, null), Error, '');
          expect(cdStub.callCount).to.equals(0);
        });
      });

      context('when the resource package does not exist', () => {
        it('should throw an error', () => {
          checkStub.withArgs(PACKAGE_JSON).returns(true);

          assert.throws(() => scenarioGenerator(null, null, null, null), Error, '');
          expect(cdStub.callCount).to.equals(0);
        });
      });
    });
  });
});
