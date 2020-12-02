'use strict';

import fs from 'fs';
import { expect } from 'chai';
import { setTemplate, addReplacements, restoreReplacements, replacements } from '../../../../src/utils/templates/replacements';
import preset from '../../../../src/utils/templates/preset.json';

describe('replacements', () => {
  it('uses the default preset', () => {
    expect(replacements().dataname).to.equal(preset.dataname);
  });

  it('overrides the default preset with a directly supplied extra template', () => {
    expect(replacements({ dataname: preset.dataname + '-changed' }).dataname).to.equal(preset.dataname + '-changed');
  });

  it('combines the preset with a file supplied to setTemplate', () => {
    const toRestore = addReplacements({});
    const { existsSync, readFileSync } = fs;
    fs.existsSync = () => true;
    fs.readFileSync = () => '{"dataname": "changed"}';
    setTemplate('template.json');
    expect(replacements().dataname).to.equal('changed');
    fs.existsSync = existsSync;
    fs.readFileSync = readFileSync;
    restoreReplacements(toRestore);
  });

  it('uses an extra template with addReplacements', () => {
    const toRestore = addReplacements({ dataname: preset.dataname + '-changed' });
    expect(replacements().dataname).to.equal(preset.dataname + '-changed');
    restoreReplacements(toRestore);
  });

  it('restores the previous template with restoreReplacements', () => {
    const toRestore = addReplacements({ dataname: preset.dataname + '-changed' });
    restoreReplacements(toRestore);
    expect(replacements().dataname).to.equal(preset.dataname);
  });
});
