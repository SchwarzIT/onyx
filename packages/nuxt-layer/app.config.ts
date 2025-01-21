export default defineAppConfig({
  onyxDocs: {
    app: {
      name: "onyx docs template for Nuxt",
    },
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    onyxDocs?: {
      app?: {
        name?: string;
        logo?: string;
      };
    };
  }
}
