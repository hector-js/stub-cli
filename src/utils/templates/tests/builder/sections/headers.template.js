const { getHeaders, arrayToJson } = require('../../../../utils.cli');
const { replacements } = require('../../../replacements');

function headers(headersArg) {
  const headers = getHeaders(headersArg);
  return replacements().headers.replace(/{headers}/g, arrayToJson(headers));
};

module.exports = {
  headers
};
