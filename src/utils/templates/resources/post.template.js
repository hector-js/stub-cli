import { ResourceBuilder } from './builder/resource-builder.template';

export const postTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_post', idsFormatted)
      .method().path()
      .ids()
      .reqBody()
      .reqHeaders()
      .reqCookies()
      .resBody()
      .status()
      .description()
      .endPath().endMethod()
      .build();
};
