import { ResourceBuilder } from "./builder/resource-builder.template";

export const traceTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_trace', idsFormatted)
    .method().path()
    .ids()
    .reqHeaders()
    .reqCookies()
    .status()
    .description()
    .endPath().endMethod()
    .build();
};
