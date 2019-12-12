'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');

describe('trace', () => {
  let traceCli;
  let traceCliStub;
  let traceTemplateStub;
  let traceTestTemplateStub;

  beforeEach(() => {
    traceCliStub = stub();
    traceTemplateStub = stub();
    traceTestTemplateStub = stub();
    traceCli = proxyquire('../../../../src/generate/methods/trace.cli', {
      '../../utils/scenario-finder.cli': { scenarioGenerator: traceCliStub },
      '../../utils/templates/resources/trace.template': { traceTemplate: traceTemplateStub },
      '../../utils/templates/tests/trace.template': { traceTestTemplate: traceTestTemplateStub }
    }).traceCli;
  });

  afterEach(() => proxyquire.callThru());

  context('when generate cli is called', () => {
    it(`should call scenarioGenerator with the correct args`, () => {
      const args = {};

      traceCli(args);

      assert.ok(traceCliStub.calledOnceWith(args, traceTemplateStub, traceTestTemplateStub, 'trace'));
    });
  });
});
