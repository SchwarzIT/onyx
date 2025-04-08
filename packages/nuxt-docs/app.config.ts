import type { OnyxNavBarProps, OnyxNavItemProps } from "sit-onyx";

// TYPES
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
    items?: NavItem[];
  };
};

export type NavItem = OnyxNavItemProps & { children?: NavItem[] };

// CONFIG
const defaultAppConfig = {
  nav: {
    appName: "Documentation",
    withBackButton: true,
  },
} satisfies OnyxAppConfig;

export default defineAppConfig({
  onyxDocs: defaultAppConfig,
});
