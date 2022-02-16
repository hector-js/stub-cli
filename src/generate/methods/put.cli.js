const { putTemplate } = require('../../utils/templates/resources/put.template');
const { putTestTemplate } = require('../../utils/templates/tests/put.template');
const { scenarioGenerator } = require('../../utils/scenario-finder.cli');

const METHOD = 'put';

module.exports = function putCli(args) {
  scenarioGenerator(args, putTemplate, putTestTemplate, METHOD);
};
