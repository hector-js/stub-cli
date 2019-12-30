import { convertIdsToJsonProperties } from '../../../../utils.cli';

export function ids(ids) {
  return `
        ${convertIdsToJsonProperties(ids)}`;
}
