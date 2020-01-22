import { ResourceBuilder } from './builder/resource-builder.template';

export const postTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_post', idsFormatted)
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
