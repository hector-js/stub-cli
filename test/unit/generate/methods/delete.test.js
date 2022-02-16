'use strict';

const { assert } = require('chai');
const { stub } = require('sinon');

const proxyquire = require('proxyquire');

describe('delete', () => {
  let deleteCli;
  let deleteCliStub;
  let deleteTemplateStub;
  let deleteTestTemplateStub;

  beforeEach(() => {
    deleteCliStub = stub();
    deleteTemplateStub = stub();
    deleteTestTemplateStub = stub();
    deleteCli = proxyquire('../../../../src/generate/methods/delete.cli', {
      '../../utils/scenario-finder.cli': { scenarioGenerator: deleteCliStub },
      '../../utils/templates/resources/delete.template': { deleteTemplate: deleteTemplateStub },
      '../../utils/templates/tests/delete.template': { deleteTestTemplate: deleteTestTemplateStub }
    });
  });

  afterEach(() => proxyquire.callThru());

  context('when generate cli is called', () => {
    it(`should call scenarioGenerator with the correct args`, () => {
      const args = {};

      deleteCli(args);

      assert.ok(deleteCliStub.calledOnceWith(args, deleteTemplateStub, deleteTestTemplateStub, 'delete'));
    });
  });
});
