import { addComponent, defineNuxtModule } from "@nuxt/kit";
import * as onyx from "sit-onyx";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "onyx-nuxt",
    configKey: "onyx",
  },
  defaults: {},
  setup(_options, nuxt) {
    nuxt.options.css.push("sit-onyx/style.css");

    Object.keys(onyx)
      .filter((namedExport) => namedExport.startsWith("Onyx"))
      .forEach((component) => {
        addComponent({
          filePath: "sit-onyx",
          name: component,
          export: component,
        });
      });
  },
});
