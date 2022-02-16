const { ResourceBuilder } = require('./builder/resource-builder.template');

module.exports = headTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_head', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .status()
      .delay()
      .description()
      .build();
};
