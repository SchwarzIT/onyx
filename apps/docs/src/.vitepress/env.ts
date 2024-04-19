/**
 * Gets the Storybook host from the VITE_STORYBOOK_HOST env variable.
 * If env variable is not set, a fallback value will be used.
 *
 * @param env Optional environment to use. Useful if default "import.meta.env" is not available,
 * e.g. when used inside .vitepress/config.ts
 */
export const getStorybookHost = (env: Record<string, string> = import.meta.env): string => {
  return env.VITE_STORYBOOK_HOST || "https://storybook.onyx.schwarz";
};
