import { getHeaders, arrayToJson } from '../../../../utils.cli';
import { replacements } from './replacements';

export function headers(headersArg, fromTemplate) {
  const headers = getHeaders(headersArg);
  return replacements(fromTemplate).headers.replace(/{headers}/g, arrayToJson(headers));
}
