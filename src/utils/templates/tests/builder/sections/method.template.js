const { buildUrl } = require('../../../../utils.cli');
const { replacements } = require('../../../replacements');

module.exports = function methodReq(method, path, idsFormatted) {
  const pathWithDummyData = buildUrl(path, idsFormatted);
  return replacements().method
      .replace(/{method}/g, method)
      .replace(/{path}/g, path.startsWith('/') ? pathWithDummyData : '/' + pathWithDummyData);
};
