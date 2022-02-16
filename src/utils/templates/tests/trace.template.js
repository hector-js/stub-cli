const { TestBuilder } = require('./builder/test-builder.template');

module.exports = traceTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'trace')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .assert().noErrors().status().emptyBody()
      .endAssert().endIt().endDes()
      .build();
};
