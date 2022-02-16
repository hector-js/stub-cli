const { TestBuilder } = require('./builder/test-builder.template');

module.exports = headTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'head')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .assert().noErrors().status().emptyBody()
      .endAssert().endIt().endDes()
      .build();
};
