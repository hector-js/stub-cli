import { getCookies, arrayToArrayValues } from '../../../../utils.cli';
import { replacements } from '../../../replacements';

export function cookies(cookiesArg) {
  const cookies = getCookies(cookiesArg);
  return replacements().cookies.replace(/{cookies}/g, arrayToArrayValues(cookies));
}
