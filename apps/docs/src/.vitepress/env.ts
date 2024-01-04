export const vitepressEnv = {
  storybookHost: import.meta.env.VITE_STORYBOOK_HOST || "https://dev.storybook.onyx.schwarz",
} as const;
