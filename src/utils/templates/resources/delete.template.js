const { ResourceBuilder } = require('./builder/resource-builder.template');

module.exports = deleteTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_delete', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqBody()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .status()
      .resBody()
      .delay()
      .description()
      .build();
};
