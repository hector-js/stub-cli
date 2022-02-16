const { ResourceBuilder } = require('./builder/resource-builder.template');

module.exports = patchTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_patch', idsFormatted)
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
