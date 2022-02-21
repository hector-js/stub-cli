const { getTestTemplate } = require('../../utils/templates/tests/get.template');
const { getTemplate } = require('../../utils/templates/resources/get.template');
const { scenarioGenerator } = require('../../utils/scenario-finder.cli');

const METHOD = 'get';

function getCli(args) {
  scenarioGenerator(args, getTemplate, getTestTemplate, METHOD );
};

module.exports = {
  getCli
};
