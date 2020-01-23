import { ResourceBuilder } from './builder/resource-builder.template';

export const postTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_post', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqBody()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .resBody()
      .status()
      .description()
      .build();
};
