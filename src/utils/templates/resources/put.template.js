const { ResourceBuilder } = require('./builder/resource-builder.template');

const putTemplate = (args, idsFormatted) => {
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

module.exports = {
  putTemplate
};
