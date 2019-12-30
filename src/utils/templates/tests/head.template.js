import { TestBuilder } from './builder/test-builder.template';

export const headTestTemplate = (args, idsFormatted) => {
  return TestBuilder.aTemplate(args, 'head')
      .libraries()
      .describe().it().request()
      .method(idsFormatted).headers().cookies()
      .assert().noErrors().status().emptyBody()
      .endAssert().endIt().endDes()
      .build();
};
