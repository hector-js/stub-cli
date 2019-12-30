import { TestBuilder } from './builder/test-builder.template';

export const postTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'post')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .bodyReq()
      .assert().noErrors().status().body()
      .endAssert().endIt().endDes()
      .build();
};
