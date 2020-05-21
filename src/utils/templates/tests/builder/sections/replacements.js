import preset from './preset.json';

const prependNewLine = (obj) => (a, k) => ({ ...a, [k]: k === 'libraries' ? obj[k] : `\n${obj[k]}` });

export const prependNewLines = (obj) => Object.keys(obj).reduce(prependNewLine(obj), {});

const prependedPreset = prependNewLines(preset);

export function replacements(fromTemplate) {
  if (!fromTemplate) {
    return prependedPreset;
  }
  return {
    ...preset,
    ...fromTemplate
  };
}
