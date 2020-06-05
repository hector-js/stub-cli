import { replacements } from '../../../replacements';

export function it() {
  return replacements().it;
}

export function endIt() {
  return replacements().endIt;
}

export function endItDelay(delay) {
  return replacements().endItDelay.replace(/{delay}/g, delay);
}
