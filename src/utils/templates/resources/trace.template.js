const { ResourceBuilder } = require('./builder/resource-builder.template');

const traceTemplate = (args, idsFormatted) => {
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

module.exports = {
  traceTemplate
};
