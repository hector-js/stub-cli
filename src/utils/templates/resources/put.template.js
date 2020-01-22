import { ResourceBuilder } from './builder/resource-builder.template';

export const putTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_put', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqBody()
      .reqHeaders()
      .reqCookies()
      .endReq()
      .res()
      .xml()
      .resBody()
      .status()
      .endRes()
      .description()
      .endPath().endMethod()
      .build();
};
