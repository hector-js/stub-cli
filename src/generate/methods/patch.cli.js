const { patchTemplate } = require('../../utils/templates/resources/patch.template');
const { patchTestTemplate } = require('../../utils/templates/tests/patch.template');
const { scenarioGenerator } = require('../../utils/scenario-finder.cli');

const METHOD = 'patch';

function patchCli(args) {
  scenarioGenerator(args, patchTemplate, patchTestTemplate, METHOD);
};

module.exports = {
  patchCli
};
