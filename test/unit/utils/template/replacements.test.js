'use strict';

const { expect } = require('chai');
const { stub } = require('sinon');
const { addReplacements, restoreReplacements } = require('../../../../src/utils/templates/replacements');
const preset = require('../../../../src/utils/templates/preset.json');
const proxyquire = require('proxyquire');

describe('replacements', () => {
  let replacements;
  let setTemplate;
  let existsSyncStub;
  let readFileSyncStub;

  beforeEach(()=>{
    existsSyncStub = stub();
    readFileSyncStub = stub();
    const proxy = proxyquire('../../../../src/utils/templates/replacements', {
      'fs': {
        existsSync: existsSyncStub,
        readFileSync: readFileSyncStub
      }
    });
    replacements = proxy.replacements;
    setTemplate = proxy.setTemplate;
  });
  it('uses the default preset', () => {
    expect(replacements().dataname).to.equal(preset.dataname);
  });

  it('overrides the default preset with a directly supplied extra template', () => {
    expect(replacements({ dataname: preset.dataname + '-changed' }).dataname).to.equal(preset.dataname + '-changed');
  });
  afterEach(() => proxyquire.callThru());

  it('combines the preset with a file supplied to setTemplate', () => {
    const toRestore = addReplacements({});
    existsSyncStub.returns(true);
    readFileSyncStub.returns('{"dataname": "changed"}');
    setTemplate('template.json');

    expect(replacements().dataname).to.equal('changed');
    restoreReplacements(toRestore);
  });

  it('uses an extra template with addReplacements', () => {
    const { addReplacements, replacements } = require('../../../../src/utils/templates/replacements');
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
