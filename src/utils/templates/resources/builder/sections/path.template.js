export function path(path) {
  return `
    "${firstCharacterMustBeSlash(path)}" : [
      {`;
}

export function pathXml(path) {
  return `
    "${firstCharacterMustBeSlash(path)}" : [
      {
        "_xml": true,`;
}

export function endPath() {
  return ` 
      }
    ]`;
}

function firstCharacterMustBeSlash(path) {
  return path.charAt(0) !== '/' ? `/${path}` : path;
}
