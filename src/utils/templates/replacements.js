import { existsSync, readFileSync } from 'fs';
import preset from './preset.json';

let fromTemplate = preset;

export function setTemplate(template) {
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
