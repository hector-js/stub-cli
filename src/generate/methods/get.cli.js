const { getTestTemplate } = require('../../utils/templates/tests/get.template');
const { getTemplate } = require('../../utils/templates/resources/get.template');
const { scenarioGenerator } = require('../../utils/scenario-finder.cli');

const METHOD = 'get';

module.exports = function getCli(args) {
  scenarioGenerator(args, getTemplate, getTestTemplate, METHOD );
};
