import { addComponent, defineNuxtModule } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@sit-onyx/showcase",
  },
  defaults: {},
  setup() {
    const globalComponents = ["OnyxTag", "OnyxHeadline"];

    // register specific components globally so they can be used in markdown files
    globalComponents.forEach((component) => {
      addComponent({
        filePath: "sit-onyx",
        name: component,
        export: component,
        global: true,
        priority: 1,
      });
    });
  },
});
