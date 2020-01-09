import { getHeaders, arrayToJson } from '../../../../utils.cli';

export function headers(headersArg) {
  const headers = getHeaders(headersArg);
  return `\n      ${headers ? `.set({${arrayToJson(headers)}})` : ''}`;
}
