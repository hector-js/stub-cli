import { replacements } from './replacements';

export function it(fromTemplate) {
  return replacements(fromTemplate).it;
}

export function endIt(fromTemplate) {
  return replacements(fromTemplate).endIt;
}

export function endItDelay(delay, fromTemplate) {
  return replacements(fromTemplate).endItDelay.replace(/{delay}/g, delay);
}
