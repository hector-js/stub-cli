'use strict';

import { assert } from 'chai';
import { stub } from 'sinon';

const proxyquire = require('proxyquire');

describe('start', () => {
  let start;
  let execCliStub;

  beforeEach(() => {
    execCliStub = stub();
    start = proxyquire('../../../src/start/start.cli', {
      'shelljs': { exec: execCliStub }
    }).start;
  });

  afterEach(() => proxyquire.callThru());

  context('when start cli is called', () => {
    it(`should call exec with the correct args`, () => {
      start();

      assert.ok(execCliStub.calledOnceWith('node app.js'));
    });
  });
});
