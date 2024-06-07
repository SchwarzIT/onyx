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
    /**
     * The calc plugin of cssnano doesn't work with calc constants (https://developer.mozilla.org/en-US/docs/Web/CSS/calc-constant) used within onyx.
     * Therefor it needs to be disabled temporarily until they are either no longer used inside onyx or the calc plugin is fixed.
     * An issue was raised for inside the calc plugin: https://github.com/postcss/postcss-calc/issues/210
     */
    nuxt.options.postcss.plugins.cssnano ??= {};
    nuxt.options.postcss.plugins.cssnano.preset = ["default", { calc: false }];

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
