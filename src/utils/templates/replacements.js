const { existsSync, readFileSync } = require('fs');
const preset = require('./preset.json');

let fromTemplate = preset;

function setTemplate(template) {
  if (template && existsSync(template)) {
    try {
      const parsed = JSON.parse(readFileSync(template));
      if (parsed) {
        fromTemplate = {
          ...fromTemplate,
          ...parsed
        };
      }
    } catch (err) {}
  }
}

function addReplacements(extraTemplate) {
  const toRestore = fromTemplate;
  if (extraTemplate) {
    fromTemplate = {
      ...fromTemplate,
      ...extraTemplate
    };
  }
  return toRestore;
}

function restoreReplacements(toRestore) {
  fromTemplate = toRestore;
}

function replacements(extraTemplate) {
  if (extraTemplate) {
    return {
      ...fromTemplate,
      ...extraTemplate
    };
  }
  return fromTemplate;
}

module.exports = {
  setTemplate,
  addReplacements,
  restoreReplacements,
  replacements
};
