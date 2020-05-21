import { replacements } from './replacements';

export function bodyReq(fromTemplate) {
  return replacements(fromTemplate).bodyReq;
}

export function bodyReqXml(fromTemplate) {
  return replacements(fromTemplate).bodyReqXml;
}
