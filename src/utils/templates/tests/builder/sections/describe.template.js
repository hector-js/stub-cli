import { replacements } from './replacements';

export function describe(path, method, fromTemplate) {
  return replacements(fromTemplate)
      .describe.replace(/{method}/g, method.toUpperCase())
      .replace(/{path}/g, path);
}

export function endDes(fromTemplate) {
  return replacements(fromTemplate).endDes;
}
