import { TestBuilder } from './builder/test-builder.template';

export const deleteTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'delete')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .bodyReq()
      .assert().noErrors().status().body()
      .endAssert().endIt().endDes()
      .build();
};
