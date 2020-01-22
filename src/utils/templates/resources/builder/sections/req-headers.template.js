import { convertArrayToJsonProperties } from '../../../../utils.cli';

export function reqHeaders(headers) {
  return `
          "_headers" : [ ${convertArrayToJsonProperties(headers)} ],`;
}
