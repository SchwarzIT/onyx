import * as onyxMdc from "@sit-onyx/mdc";
import { addComponent, defineNuxtModule } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@sit-onyx/mdc",
  },
  setup(options, nuxt) {
    nuxt.options.css.push("@sit-onyx/mdc/style.css");

    Object.keys(onyxMdc)
      .filter((namedExport) => namedExport.startsWith("Prose"))
      .forEach((component) => {
        addComponent({
          filePath: "@sit-onyx/mdc",
          name: component,
          export: component,
          global: true, // required by Nuxt content
          priority: 1, // prevent warning because we are overriding default Nuxt content components
        });
      });
  },
});
