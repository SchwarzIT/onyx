/**
 * If the user environment is "development".
 */
export const USER_DEV = process.env.NODE_ENV === "development";
/**
 * Conditional, tree-shakable logging, which is only done in the users "development" environment.
 *
 * Is the global console when in "development" environment, otherwise undefined.
 * When undefined code will be removed through tree-shaking.
 */
export const userConsole = USER_DEV === true ? globalThis.console : undefined;
