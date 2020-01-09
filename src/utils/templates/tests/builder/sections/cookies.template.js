import { getCookies, arrayToArrayValues } from '../../../../utils.cli';

export function cookies(cookiesArg) {
  const cookies = getCookies(cookiesArg);
  return `\n      ${cookies ? `.set('Cookie', [${arrayToArrayValues(cookies)}])` : ''}`;
}
