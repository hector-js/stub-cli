import { ResourceBuilder } from './builder/resource-builder.template';

export const patchTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_patch', idsFormatted)
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
