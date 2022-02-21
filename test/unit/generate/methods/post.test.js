'use strict';

const { assert } = require('chai');
const { stub } = require('sinon');

const proxyquire = require('proxyquire');

describe('post', () => {
  let postCli;
  let postCliStub;
  let postTemplateStub;
  let postTestTemplateStub;

  beforeEach(() => {
    postCliStub = stub();
    postTemplateStub = stub();
    postTestTemplateStub = stub();
    postCli = proxyquire('../../../../src/generate/methods/post.cli', {
      '../../utils/scenario-finder.cli': { scenarioGenerator: postCliStub },
      '../../utils/templates/resources/post.template': { postTemplate: postTemplateStub },
      '../../utils/templates/tests/post.template': { postTestTemplate: postTestTemplateStub }
    }).postCli;
  });

  afterEach(() => proxyquire.callThru());

  context('when generate cli is called', () => {
    it(`should call scenarioGenerator with the correct args`, () => {
      const args = {};

      postCli(args);

      assert.ok(postCliStub.calledOnceWith(args, postTemplateStub, postTestTemplateStub, 'post'));
    });
  });
});
