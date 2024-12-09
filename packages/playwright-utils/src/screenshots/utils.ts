/**
 * Escapes the given string so its save to be used as CSS grid-area, e.g. by replacing whitespaces.
 */
export const escapeGridAreaName = (name: string) => {
  return name.replace(/\W/g, "-");
};
