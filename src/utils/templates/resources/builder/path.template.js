export function path(path, template) {
  template[firstCharacterMustBeSlash(path)] = [{}];
}


function firstCharacterMustBeSlash(path) {
  return path.charAt(0) !== '/' ? `/${path}` : path;
}
