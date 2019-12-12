'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');

describe('get', () => {
  let getCli;
  let getCliStub;
  let getTemplateStub;
  let getTestTemplateStub;

  beforeEach(() => {
    getCliStub = stub();
    getTemplateStub = stub();
    getTestTemplateStub = stub();
    getCli = proxyquire('../../../../src/generate/methods/get.cli', {
      '../../utils/scenario-finder.cli': { scenarioGenerator: getCliStub },
      '../../utils/templates/resources/get.template': { getTemplate: getTemplateStub },
      '../../utils/templates/tests/get.template': { getTestTemplate: getTestTemplateStub }
    }).getCli;
  });

  afterEach(() => proxyquire.callThru());

  context('when generate cli is called', () => {
    it(`should call scenarioGenerator with the correct args`, () => {
      const args = {};

      getCli(args);

      assert.ok(getCliStub.calledOnceWith(args, getTemplateStub, getTestTemplateStub, 'get'));
    });
  });
});
