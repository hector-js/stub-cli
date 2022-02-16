const { ResourceBuilder } = require('./builder/resource-builder.template');

module.exports = postTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_post', idsFormatted)
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
