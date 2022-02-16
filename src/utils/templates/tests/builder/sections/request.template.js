const { replacements } = require('../../../replacements');

module.exports = function request() {
  return replacements().request;
};
