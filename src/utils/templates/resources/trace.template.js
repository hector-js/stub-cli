const { ResourceBuilder } = require('./builder/resource-builder.template');

module.exports = traceTemplate = (args, idsFormatted) => {
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
