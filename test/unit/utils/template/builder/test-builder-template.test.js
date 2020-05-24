'use strict';

import { expect } from 'chai';
import { TestBuilder } from '../../../../../src/utils/templates/tests/builder/test-builder.template';
import preset from '../../../../../src/utils/templates/preset.json';

describe('test-builder-template', () => {
  let args;
  let ids;

  beforeEach(() => {
    args = {
      _: ['', '', '/any-path/{id}/data']
    };
    ids = ['id'];
  });

  it('should use the default preset', () => {
    const testBuilder = TestBuilder.aTemplate(args, 'get');
    expect(testBuilder.assert().build()).to.equal(preset.assert);
  });

  it('should allow overrides of the default preset', () => {
    const newPreset = {
      assert: 'assert'
    };
    const testBuilder = TestBuilder.aTemplate(args, 'get', newPreset);
    expect(testBuilder.assert().build()).to.equal(newPreset.assert);
  });

  it('should create the method from the default preset', () => {
    const testBuilder = TestBuilder.aTemplate(args, 'get');
    expect(testBuilder.method().build()).to.equal('\n      .get(\'/any-path/{id}/data\')');
  });

  it('should use the method from the supplied description', () => {
    const testBuilder = TestBuilder.aTemplate(args, 'get', undefined, 'different');
    expect(testBuilder.method().build()).to.equal('\n      .get(\'/different\')');
  });
});
