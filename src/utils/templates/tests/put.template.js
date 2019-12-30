import { TestBuilder } from './builder/test-builder.template';

export const putTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'put')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .bodyReq()
      .assert().noErrors().status().body()
      .endAssert().endIt().endDes()
      .build();
};
