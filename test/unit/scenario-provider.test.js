'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');

describe('scenario-provider', () => {
  describe('#scenarioGenerator', () => {
    let checkStub;
    let writeFileByDataStub;
    let createFileStub;
    let cdStub;
    let pq;

    beforeEach(() => {
      checkStub = stub();
      writeFileByDataStub = stub();
      createFileStub = stub();
      cdStub = stub();
      pq = proxyquire('../../src/utils/scenario-finder.cli', {
        './file-utils.cli': {
          checkPath: checkStub,
          writeFileByData: writeFileByDataStub,
          createFileInPath: createFileStub
        },
        'shelljs': {
          cd: cdStub
        }
      });
    });

    describe('a template with package.json and resources folder', () => {
      let args;

      beforeEach(() => {
        args = {
          _: ['', '', '/any-path/{id}/data']
        }
        checkStub.withArgs('./package.json').returns(true);
        checkStub.withArgs('./resources/').returns(true);
      });

      describe('navigation path', () => {
        /**
         * @description We need to run this test to make proxy works
         * @fixme
         */
        it('should navigate to the proper file', () => {
          pq.scenarioGenerator(args, stub(), stub(), null);
        });      

         it('should navigate to the proper file', () => {
          pq.scenarioGenerator(args, stub(), stub(), null);

          assert.ok(cdStub.withArgs('resources'));
          assert.ok(cdStub.withArgs('..').calledOnce);
          assert.ok(cdStub.withArgs('test').calledOnce);
        });
      });

      describe('resource template', () => {
        it('should write a file with the proper name and template', () => {
          const resourceTemplateStub = stub();
          resourceTemplateStub.withArgs(args, ['id']).returns('any template')

          pq.scenarioGenerator(args, resourceTemplateStub, stub(), 'get');

          assert.ok(resourceTemplateStub.calledOnceWith(args, ['id']));
          assert.ok(writeFileByDataStub.withArgs('any-path-id-data.get.json', 'any template').calledOnce);
        });
      });

      describe('test template', () => {
        it('should write a file with the proper name and template', () => {
          const testTemplateStub = stub();
          testTemplateStub.withArgs(args, ['id']).returns('any template')

          pq.scenarioGenerator(args, stub(), testTemplateStub, 'get');

          assert.ok(testTemplateStub.withArgs(args, ['id']).calledOnce);
          assert.ok(writeFileByDataStub.withArgs('any-path-id-data-get.test.js', 'any template').calledOnce);
        });
      });
    });

    describe('location is not right',()=>{
      context('when the package.json is not at the same level', () => {
        it('should throw an error', () => {
          checkStub.withArgs('./resources/').returns(true);
  
          assert.throws(() => pq.scenarioGenerator(null, null, null, null), Error, '');
        });
      });
  
      context('when the resource package does not exist', () => {
        it('should throw an error', () => {
          checkStub.withArgs('./package.json').returns(true);

          assert.throws(() => pq.scenarioGenerator(null, null, null, null), Error, '');
        });
      });
    });
  });
});
