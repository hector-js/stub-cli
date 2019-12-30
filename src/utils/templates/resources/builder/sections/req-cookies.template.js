import { convertArrayToJsonProperties } from '../../../../utils.cli';

export function reqCookies(cookies) {
  return `
        "_cookies" : [ ${convertArrayToJsonProperties(cookies)} ],`;
}
