import { getCookies, arrayToArrayValues } from '../../../../utils.cli';
import { replacements } from './replacements';

export function cookies(cookiesArg, fromTemplate) {
  const cookies = getCookies(cookiesArg);
  return replacements(fromTemplate).cookies.replace(/{cookies}/g, arrayToArrayValues(cookies));
}
