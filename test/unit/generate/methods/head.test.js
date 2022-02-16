'use strict';

const { assert } = require('chai');
const { stub } = require('sinon');

const proxyquire = require('proxyquire');

describe('head', () => {
  let headCli;
  let headCliStub;
  let headTemplateStub;
  let headTestTemplateStub;

  beforeEach(() => {
    headCliStub = stub();
    headTemplateStub = stub();
    headTestTemplateStub = stub();
    headCli = proxyquire('../../../../src/generate/methods/head.cli', {
      '../../utils/scenario-finder.cli': { scenarioGenerator: headCliStub },
      '../../utils/templates/resources/head.template': { headTemplate: headTemplateStub },
      '../../utils/templates/tests/head.template': { headTestTemplate: headTestTemplateStub }
    });
  });

  afterEach(() => proxyquire.callThru());

  context('when generate cli is called', () => {
    it(`should call scenarioGenerator with the correct args`, () => {
      const args = {};

      headCli(args);

      assert.ok(headCliStub.calledOnceWith(args, headTemplateStub, headTestTemplateStub, 'head'));
    });
  });
});
