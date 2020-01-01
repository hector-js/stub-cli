export function reqBody() {
  return `
        "_requestBody":{
          "dummy": "dummy"
        },`;
}

export function reqBodyXml() {
  return `
        "_requestBody": "<xml><tbd>Xml request to be defined</tbd></xml>",`;
}
