import { buildUrl } from '../../../../utils.cli';
import { replacements } from '../../../replacements';

export function methodReq(method, path, idsFormatted) {
  const pathWithDummyData = buildUrl(path, idsFormatted);
  return replacements().method.replace(/{method}/g, method).replace(/{path}/g, path.startsWith('/') ? pathWithDummyData : '/' + pathWithDummyData);
}
