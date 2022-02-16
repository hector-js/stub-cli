const { getStatus } = require('../../../../utils.cli');
const { replacements } = require('../../../replacements');

function assert() {
  return replacements().assert;
}

function noErrors() {
  return replacements().noErrors;
}

function status(statusArg) {
  const status = getStatus(statusArg);
  return replacements().status.replace(/{status}/g, status ? status : '200');
}

function body() {
  return replacements().body;
}

function bodyG(fromTemplate, key, value) {
  return replacements().bodyG.replace(/{bodyKey}/g, key).replace(/{bodyVal}/g, value);
}

function bodyGXml() {
  return replacements().bodyGXml;
}

function emptyBody() {
  return replacements().emptyBody;
}

function endAssert() {
  return replacements().endAssert;
}

module.exports = {
  assert,
  noErrors,
  status,
  body,
  bodyG,
  bodyGXml,
  emptyBody,
  endAssert
};
