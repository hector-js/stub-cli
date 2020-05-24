import { getHeaders, arrayToJson } from '../../../../utils.cli';
import { replacements } from '../../../replacements';

export function headers(headersArg) {
  const headers = getHeaders(headersArg);
  return replacements().headers.replace(/{headers}/g, arrayToJson(headers));
}
