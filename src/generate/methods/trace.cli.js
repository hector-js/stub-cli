const { traceTestTemplate } = require('../../utils/templates/tests/trace.template');
const { traceTemplate } = require('../../utils/templates/resources/trace.template');
const { scenarioGenerator } = require('../../utils/scenario-finder.cli');

const METHOD = 'trace';

module.exports = function traceCli(args) {
  scenarioGenerator(args, traceTemplate, traceTestTemplate, METHOD);
};
