const { getCookies, arrayToArrayValues } = require('../../../../utils.cli');
const { replacements } = require('../../../replacements');

function cookies(cookiesArg) {
  const cookies = getCookies(cookiesArg);
  return replacements().cookies.replace(/{cookies}/g, arrayToArrayValues(cookies));
};

module.exports = {
  cookies
};
