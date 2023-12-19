export const vitepressEnv = {
  storybookHost:
    import.meta.env.VITE_STORYBOOK_HOST ||
    "https://onyx-storybook-dev.apps.01.cf.eu01.stackit.cloud",
} as const;
