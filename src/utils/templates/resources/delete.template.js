import { ResourceBuilder } from './builder/resource-builder.template';

export const deleteTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_delete', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqBody()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .status()
      .resBody()
      .description()
      .build();
};
