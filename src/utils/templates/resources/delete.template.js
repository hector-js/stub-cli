import { ResourceBuilder } from "./builder/resource-builder.template";

export const deleteTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_delete', idsFormatted)
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
