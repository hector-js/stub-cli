const { ResourceBuilder } = require('./builder/resource-builder.template');

module.exports = getTemplate = (args, idsFormatted) => {
  return ResourceBuilder.aTemplate(args, '_get', idsFormatted)
      .method().path()
      .req()
      .ids()
      .reqHeaders()
      .reqCookies()
      .res()
      .xml()
      .status()
      .resBodyG()
      .delay()
      .description()
      .build();
};
