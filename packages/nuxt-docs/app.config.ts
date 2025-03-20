import type { OnyxNavButtonProps } from "sit-onyx";

export default defineAppConfig({
  onyxDocs: {},
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    onyxDocs?: {
      app?: {
        name: string;
        logo?: string;
      };
      nav?: {
        items?: OnyxNavButtonProps[];
      };
    };
  }
}
