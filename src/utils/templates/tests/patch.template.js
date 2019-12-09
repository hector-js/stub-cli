import { TestBuilder } from './builder/test-builder.template';

export const patchTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'patch')
    .libraries()
    .describe().it().request()
    .method(idsFormatted).headers().cookies()
    .bodyReq()
    .assert().noErrors().status().body()
    .endAssert().endIt().endDes()
    .build();
}
