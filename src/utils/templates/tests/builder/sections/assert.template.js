import { getStatus } from '../../../../utils.cli';
import { replacements } from '../../../replacements';

export function assert() {
  return replacements().assert;
}

export function noErrors() {
  return replacements().noErrors;
}

export function status(statusArg) {
  const status = getStatus(statusArg);
  return replacements().status.replace(/{status}/g, status ? status : '200');
}

export function body() {
  return replacements().body;
}

export function bodyG(fromTemplate, key, value) {
  return replacements()
    .bodyG.replace(/{bodyKey}/g, key)
    .replace(/{bodyVal}/g, value);
}
export function bodyGXml() {
  return replacements().bodyGXml;
}

export function emptyBody() {
  return replacements().emptyBody;
}

export function endAssert() {
  return replacements().endAssert;
}
