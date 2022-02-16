const { TestBuilder } = require('./builder/test-builder.template');

module.exports = postTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'post')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .bodyReq()
      .assert().noErrors().status().body()
      .endAssert().endIt().endDes()
      .build();
};
