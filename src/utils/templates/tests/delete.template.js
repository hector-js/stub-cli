const { TestBuilder } = require('./builder/test-builder.template');

module.exports = deleteTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'delete')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .bodyReq()
      .assert().noErrors().status().body()
      .endAssert().endIt().endDes()
      .build();
};
