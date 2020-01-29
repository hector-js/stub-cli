import { ResourceBuilder } from './builder/resource-builder.template';

export const putTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_put', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqBody()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .resBody()
      .delay()
      .status()
      .description()
      .build();
};
