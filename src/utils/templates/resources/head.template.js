import { ResourceBuilder } from "./builder/resource-builder.template";

export const headTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_head', idsFormatted)
    .method().path()
    .ids()
    .reqHeaders()
    .reqCookies()
    .status()
    .description()
    .endPath().endMethod()
    .build();
};
