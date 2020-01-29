import { ResourceBuilder } from './builder/resource-builder.template';

export const traceTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_trace', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .delay()
      .status()
      .description()
      .build();
};
