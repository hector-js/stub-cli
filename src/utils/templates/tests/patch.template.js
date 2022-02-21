const { TestBuilder } = require('./builder/test-builder.template');

const patchTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'patch')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .bodyReq()
      .assert().noErrors().status().body()
      .endAssert().endIt().endDes()
      .build();
};

module.exports = {
  patchTestTemplate
};
