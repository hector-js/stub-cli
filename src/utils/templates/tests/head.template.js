const { TestBuilder } = require('./builder/test-builder.template');

const headTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'head')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .assert().noErrors().status().emptyBody()
      .endAssert().endIt().endDes()
      .build();
};

module.exports = {
  headTestTemplate
};
