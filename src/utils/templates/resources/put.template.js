const { ResourceBuilder } = require('./builder/resource-builder.template');

module.exports = putTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_put', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqBody()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .resBody()
      .delay()
      .status()
      .description()
      .build();
};
