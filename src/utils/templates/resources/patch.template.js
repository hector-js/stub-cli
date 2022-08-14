const { ResourceBuilder } = require('./builder/resource-builder.template');

const patchTemplate = (args, idsFormatted) => {
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

module.exports = {
  patchTemplate
};
