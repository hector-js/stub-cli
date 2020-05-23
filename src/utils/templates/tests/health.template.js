import { TestBuilder } from './builder/test-builder.template';

export const healthTest = (args) => {
  return TestBuilder.aTemplate(args, 'get', { bodyKey: '\'STATUS\'', bodyVal: '\'UP\'' }, 'health')
      .libraries()
      .describe().it().request()
      .method().headers().cookies()
      .assert().noErrors().status().bodyG()
      .endAssert().endIt().endDes()
      .build();
};

