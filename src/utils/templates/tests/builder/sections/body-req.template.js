
export function bodyReq() {
  return `\n      .send({'dummy': 'dummy'})`;
}

export function bodyReqXml() {
  return `\n      .set('Accept', 'text/xml; charset=utf-8')
      .type('application/xml')
      .send('<xml><tbd>Xml request to be defined</tbd></xml>')`;
}
