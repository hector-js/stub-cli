const { replacements } = require('../../../replacements');

function it() {
  return replacements().it;
}

function endIt() {
  return replacements().endIt;
}

function endItDelay(delay) {
  return replacements().endItDelay.replace(/{delay}/g, delay);
}

module.exports = {
  it,
  endIt,
  endItDelay
};
