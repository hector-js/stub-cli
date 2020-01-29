import { ResourceBuilder } from './builder/resource-builder.template';

export const getTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_get', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .status()
      .resBodyG()
      .delay()
      .description()
      .build();
};
