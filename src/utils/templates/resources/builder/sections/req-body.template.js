export function reqBody() {
  return `
          "_body":{
            "dummy": "dummy"
          },`;
}

export function reqBodyXml() {
  return `
          "_body": "<xml><tbd>Xml request to be defined</tbd></xml>",`;
}
