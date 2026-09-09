import * as onyxComark from "@sit-onyx/comark";
import { addComponent, defineNuxtModule } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@sit-onyx/comark",
  },
  setup(options, nuxt) {
    nuxt.options.css.push("@sit-onyx/comark/style.css");

    Object.keys(onyxComark)
      .filter((namedExport) => namedExport.startsWith("Prose"))
      .forEach((component) => {
        addComponent({
          filePath: "@sit-onyx/comark",
          name: component,
          export: component,
          global: true, // required by Nuxt content
          priority: 1, // prevent warning because we are overriding default Nuxt content components
        });
      });
  },
});
