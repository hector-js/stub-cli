import { TestBuilder } from './builder/test-builder.template';

export const getTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'get')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .assert().noErrors().status().bodyG()
      .endAssert().endIt().endDes()
      .build();
};
