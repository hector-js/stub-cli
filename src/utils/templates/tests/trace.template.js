import { TestBuilder } from './builder/test-builder.template';

export const traceTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'trace')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .assert().noErrors().status().emptyBody()
      .endAssert().endIt().endDes()
      .build();
};
