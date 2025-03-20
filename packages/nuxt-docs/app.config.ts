import type { OnyxNavButtonProps } from "sit-onyx";

declare module "@nuxt/schema" {
  interface AppConfigInput {
    onyxDocs?: OnyxAppConfig;
  }

  interface AppConfig {
    onyxDocs: OnyxAppConfig & typeof defaultAppConfig;
  }
}

export type OnyxAppConfig = {
  app?: {
    name?: string;
    logo?: string;
  };
  nav?: {
    items?: OnyxNavButtonProps[];
  };
};

const defaultAppConfig = {
  app: {
    name: "Documentation",
  },
} satisfies OnyxAppConfig;

export default defineAppConfig({
  onyxDocs: defaultAppConfig,
});
