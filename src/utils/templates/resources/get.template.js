import { ResourceBuilder } from './builder/resource-builder.template';

export const getTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_get', idsFormatted)
      .method().path()
      .ids()
      .reqHeaders()
      .reqCookies()
      .resBodyG()
      .status()
      .description()
      .endPath().endMethod()
      .build();
};
