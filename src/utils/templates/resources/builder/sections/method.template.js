export function method(method) {
  return `{
  "${method}" : {`;
}

export function endMethod() {
  return `
  }
}`;
}
