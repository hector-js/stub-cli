import { existsSync, readFileSync } from 'fs';
import preset from './preset.json';

let fromTemplate = preset;

export function setTemplate(template) {
  if (template && existsSync(template)) {
    fromTemplate = {
      ...fromTemplate,
      ...readFileSync(template)
    };
  }
}

export function addReplacements(extraTemplate) {
  const toRestore = fromTemplate;
  if (extraTemplate) {
    fromTemplate = {
      ...fromTemplate,
      ...extraTemplate
    };
  }
  return toRestore;
}

export function restoreReplacements(toRestore) {
  fromTemplate = toRestore;
}

export function replacements(extraTemplate) {
  if (extraTemplate) {
    return {
      ...fromTemplate,
      ...extraTemplate
    };
  }
  return fromTemplate;
}
