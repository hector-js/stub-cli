import { ResourceBuilder } from './builder/resource-builder.template';

export const headTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_head', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .status()
      .delay()
      .description()
      .build();
};
