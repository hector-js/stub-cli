'use strict';

const { assert } = require('chai');
const { stub } = require('sinon');

const proxyquire = require('proxyquire');

describe('put', () => {
  let putCli;
  let putCliStub;
  let putTemplateStub;
  let putTestTemplateStub;

  beforeEach(() => {
    putCliStub = stub();
    putTemplateStub = stub();
    putTestTemplateStub = stub();
    putCli = proxyquire('../../../../src/generate/methods/put.cli', {
      '../../utils/scenario-finder.cli': { scenarioGenerator: putCliStub },
      '../../utils/templates/resources/put.template': { putTemplate: putTemplateStub },
      '../../utils/templates/tests/put.template': { putTestTemplate: putTestTemplateStub }
    }).putCli;
  });

  afterEach(() => proxyquire.callThru());

  context('when generate cli is called', () => {
    it(`should call scenarioGenerator with the correct args`, () => {
      const args = {};

      putCli(args);

      assert.ok(putCliStub.calledOnceWith(args, putTemplateStub, putTestTemplateStub, 'put'));
    });
  });
});
