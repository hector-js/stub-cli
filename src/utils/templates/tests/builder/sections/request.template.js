const { replacements } = require('../../../replacements');

function request() {
  return replacements().request;
};

module.exports = {
  request
};
