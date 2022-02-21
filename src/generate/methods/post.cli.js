const { postTemplate } = require('../../utils/templates/resources/post.template');
const { postTestTemplate } = require('../../utils/templates/tests/post.template');
const { scenarioGenerator } = require('../../utils/scenario-finder.cli');

const METHOD = 'post';

function postCli(args) {
  scenarioGenerator(args, postTemplate, postTestTemplate, METHOD);
};

module.exports = {
  postCli
};
