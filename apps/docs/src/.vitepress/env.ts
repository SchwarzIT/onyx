/**
 * Gets the Storybook host from the VITE_STORYBOOK_HOST env variable.
 * If env variable is not set, a fallback value will be used.
 */
export const getStorybookHost = (): string => {
  let envValue: string | undefined;

  if (import.meta.env) envValue = import.meta.env?.VITE_STORYBOOK_HOST;
  else if (process) envValue = process.env.VITE_STORYBOOK_HOST;

  return envValue || "https://onyx-storybook-prod.apps.01.cf.eu01.stackit.cloud";
};
