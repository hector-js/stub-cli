const { TestBuilder } = require('./builder/test-builder.template');

module.exports = patchTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'patch')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .bodyReq()
      .assert().noErrors().status().body()
      .endAssert().endIt().endDes()
      .build();
};
