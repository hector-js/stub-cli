const { TestBuilder } = require('./builder/test-builder.template');

const putTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'put')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .bodyReq()
      .assert().noErrors().status().body()
      .endAssert().endIt().endDes()
      .build();
};

module.exports = {
  putTestTemplate
};
