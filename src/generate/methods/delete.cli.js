const { deleteTemplate } = require('../../utils/templates/resources/delete.template');
const { deleteTestTemplate } = require('../../utils/templates/tests/delete.template');
const { scenarioGenerator } = require('../../utils/scenario-finder.cli');

const METHOD = 'delete';

module.exports = function deleteCli(args) {
  scenarioGenerator(args, deleteTemplate, deleteTestTemplate, METHOD);
};
