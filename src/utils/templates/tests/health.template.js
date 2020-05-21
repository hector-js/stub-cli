import { TestBuilder } from './builder/test-builder.template';

export const healthTest = (args = { _: [, , 'health'] }) => {
  return TestBuilder.aTemplate(args, 'get')
      .libraries()
      .describe().it().request()
      .method(['health']).headers().cookies()
      .assert().noErrors().status().bodyG()
      .endAssert().endIt().endDes()
      .build();
};

