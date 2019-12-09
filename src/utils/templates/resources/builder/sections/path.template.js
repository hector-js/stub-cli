export function path(path) {
  if (path.charAt(0) !== '/') {
    path = `/${path}`;
  }
  return `
    "${path}" : [
      {`;
}

export function endPath() {
  return ` 
      }
    ]`;
}
