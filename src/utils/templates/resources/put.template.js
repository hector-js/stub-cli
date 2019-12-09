import { ResourceBuilder } from "./builder/resource-builder.template";

export const putTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_put', idsFormatted)
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
