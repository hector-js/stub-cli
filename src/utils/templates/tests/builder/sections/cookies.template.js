const { getCookies, arrayToArrayValues } = require('../../../../utils.cli');
const { replacements } = require('../../../replacements');

module.exports = function cookies(cookiesArg) {
  const cookies = getCookies(cookiesArg);
  return replacements().cookies.replace(/{cookies}/g, arrayToArrayValues(cookies));
};
