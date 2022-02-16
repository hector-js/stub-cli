const { TestBuilder } = require('./builder/test-builder.template');

const getTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'get')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .assert().noErrors().status().bodyG()
      .endAssert().endIt().endDes()
      .build();
};

module.exports = getTestTemplate;
