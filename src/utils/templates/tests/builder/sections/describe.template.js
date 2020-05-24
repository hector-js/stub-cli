import { replacements } from '../../../replacements';

export function describe(path, method) {
  return replacements().describe.replace(/{method}/g, method.toUpperCase()).replace(/{path}/g, path);
}

export function endDes() {
  return replacements().endDes;
}
