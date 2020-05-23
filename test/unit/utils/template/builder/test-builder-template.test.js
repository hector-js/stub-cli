'use strict';

import { expect } from 'chai';
import { TestBuilder } from '../../../../../src/utils/templates/tests/builder/test-builder.template';
import { prependNewLines } from '../../../../../src/utils/templates/tests/builder/sections/replacements';
import preset from '../../../../../src/utils/templates/tests/builder/sections/preset.json';

describe('test-builder-template', () => {
  let args;

  beforeEach(() => {
    args = {
      _: ['', '', '/any-path/{id}/data']
    };
  });

  it('should use the default preset', () => {
    const testBuilder = TestBuilder.aTemplate(args, 'get');
    expect(testBuilder.assert().build()).to.equal(prependNewLines(preset).assert);
  });

  it('should allow overrides of the default preset', () => {
    const newPreset = {
      assert: 'assert'
    };
    const testBuilder = TestBuilder.aTemplate(args, 'get', newPreset);
    expect(testBuilder.assert().build()).to.equal(newPreset.assert);
  });
});
