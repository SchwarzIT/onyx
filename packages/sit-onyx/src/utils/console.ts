export const DEV = process.env.NODE_ENV === "development";
/**
 * console instance, which will be removed in the production build.
 */
export const userConsole = DEV === true ? console : undefined;
