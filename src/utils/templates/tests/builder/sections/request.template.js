import { replacements } from "./replacements";

export function request(fromTemplate) {
  return replacements(fromTemplate).request;
}
