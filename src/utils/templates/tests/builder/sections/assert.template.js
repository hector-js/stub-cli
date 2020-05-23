import { getStatus } from '../../../../utils.cli';
import { replacements } from './replacements';

export function assert(fromTemplate) {
  return replacements(fromTemplate).assert;
}

export function noErrors(fromTemplate) {
  return replacements(fromTemplate).noErrors;
}

export function status(statusArg, fromTemplate) {
  const status = getStatus(statusArg);
  return replacements(fromTemplate).status.replace(/{status}/g, status ? status : '200');
}

export function body(fromTemplate) {
  return replacements(fromTemplate).body;
}

export function bodyG(fromTemplate, key, value) {
  return replacements(fromTemplate).bodyG.replace(/{bodyKey}/g, key).replace(/{bodyVal}/g, value);
}
export function bodyGXml(fromTemplate) {
  return replacements(fromTemplate).bodyGXml;
}

export function emptyBody(fromTemplate) {
  return replacements(fromTemplate).emptyBody;
}

export function endAssert(fromTemplate) {
  return replacements(fromTemplate).endAssert;
}
