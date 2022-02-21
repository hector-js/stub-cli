const { headTestTemplate } = require('../../utils/templates/tests/head.template');
const { headTemplate } = require('../../utils/templates/resources/head.template');
const { scenarioGenerator } = require('../../utils/scenario-finder.cli');

const METHOD = 'head';

function headCli(args) {
  scenarioGenerator(args, headTemplate, headTestTemplate, METHOD);
};

module.exports = {
  headCli
};
