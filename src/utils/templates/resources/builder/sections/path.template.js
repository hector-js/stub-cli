export function path(path) {
  return `
    "${firstCharacterMustBeSlash(path)}" : [
      {`;
}

export function endPath() {
  return ` 
      }
    ]`;
}

function firstCharacterMustBeSlash(path) {
  return path.charAt(0) !== '/' ? `/${path}` : path;
}
