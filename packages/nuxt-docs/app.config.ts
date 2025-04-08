import type { OnyxNavBarProps, OnyxNavItemProps } from "sit-onyx";

declare module "@nuxt/schema" {
  interface AppConfigInput {
    onyxDocs?: OnyxAppConfig;
  }

  interface AppConfig {
    onyxDocs: OnyxAppConfig & typeof defaultAppConfig;
  }
}

export type OnyxAppConfig = {
  nav?: Partial<OnyxNavBarProps> & {
    items?: (OnyxNavItemProps & { children?: OnyxNavItemProps[] })[];
  };
};

const defaultAppConfig = {
  nav: {
    appName: "Documentation",
    withBackButton: true,
  },
} satisfies OnyxAppConfig;

export default defineAppConfig({
  onyxDocs: defaultAppConfig,
});
