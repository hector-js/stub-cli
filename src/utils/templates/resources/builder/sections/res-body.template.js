export function resBody() {
  return `
        "_body" : { "dummyResponse": "dummyResponse" },`;
}

export function resBodyG() {
  return `
        "_body" : { "body": "To be defined" },`;
}

export function resBodyGXml() {
  return `
        "_body" : "<xml><tbd>Xml response to be defined</tbd></xml>",`;
}
