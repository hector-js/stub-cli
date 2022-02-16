const { replacements } = require('../../../replacements');

function describe(path, method) {
  return replacements().describe.replace(/{method}/g, method.toUpperCase()).replace(/{path}/g, path);
}

function endDes() {
  return replacements().endDes;
}

module.exports = {
  describe,
  endDes
};
