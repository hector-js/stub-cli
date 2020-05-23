import preset from './preset.json';

export function replacements(fromTemplate) {
  if (!fromTemplate) {
    return preset;
  }
  return {
    ...preset,
    ...fromTemplate
  };
}
