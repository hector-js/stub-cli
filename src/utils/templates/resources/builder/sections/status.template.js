export function status(status) {
  return `
        ${status ? `"_status": ${status},` : ''}`;
}