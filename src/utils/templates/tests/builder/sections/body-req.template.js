const { replacements } = require('../../../replacements');

function bodyReq() {
  return replacements().bodyReq;
}

function bodyReqXml() {
  return replacements().bodyReqXml;
}

module.exports = {
  bodyReq,
  bodyReqXml
};
