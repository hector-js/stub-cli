import { ResourceBuilder } from './builder/resource-builder.template';

export const deleteTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_delete', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqBody()
      .reqHeaders()
      .reqCookies()
      .endReq()
      .res()
      .xml()
      .status()
      .resBody()
      .endRes()
      .description()
      .endPath().endMethod()
      .build();
};
