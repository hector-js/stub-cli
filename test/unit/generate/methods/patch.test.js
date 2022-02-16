'use strict';

const { assert } = require('chai');
const { stub } = require('sinon');

const proxyquire = require('proxyquire');

describe('patch', () => {
  let patchCli;
  let patchCliStub;
  let patchTemplateStub;
  let patchTestTemplateStub;

  beforeEach(() => {
    patchCliStub = stub();
    patchTemplateStub = stub();
    patchTestTemplateStub = stub();
    patchCli = proxyquire('../../../../src/generate/methods/patch.cli', {
      '../../utils/scenario-finder.cli': { scenarioGenerator: patchCliStub },
      '../../utils/templates/resources/patch.template': { patchTemplate: patchTemplateStub },
      '../../utils/templates/tests/patch.template': { patchTestTemplate: patchTestTemplateStub }
    });
  });

  afterEach(() => proxyquire.callThru());

  context('when generate cli is called', () => {
    it(`should call scenarioGenerator with the correct args`, () => {
      const args = {};

      patchCli(args);

      assert.ok(patchCliStub.calledOnceWith(args, patchTemplateStub, patchTestTemplateStub, 'patch'));
    });
  });
});
