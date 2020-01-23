import { ResourceBuilder } from './builder/resource-builder.template';

export const patchTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_patch', idsFormatted)
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
