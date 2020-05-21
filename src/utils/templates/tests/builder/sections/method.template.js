import { buildUrl } from '../../../../utils.cli';
import { replacements } from './replacements';

export function methodReq(method, args, idsFormatted, fromTemplate) {
  const path = args._[2];
  const pathWithDummyData = buildUrl(path, idsFormatted);
  return replacements(fromTemplate)
      .method.replace(/{method}/g, method)
      .replace(/{path}/g, path.startsWith('/') ? pathWithDummyData : '/' + pathWithDummyData);
}
