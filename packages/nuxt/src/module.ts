import { addComponent, defineNuxtModule } from "@nuxt/kit";
import * as onyx from "sit-onyx";

export interface ModuleOptions {
  /**
   * By default, the global onyx styles (`global.css` file) will be included
   * which applies some global styles like background color and font styles.
   * This is recommended when building a whole application with onyx.
   *
   * You can set this option to `true` to disable this.
   *
   * @see https://onyx.schwarz/development/#installation
   */
  disableGlobalStyles?: boolean;
}

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
    nuxt.options.postcss.plugins.cssnano = { preset: ["default", { calc: false }] };

    nuxt.options.css.push("sit-onyx/style.css");

    if (!_options.disableGlobalStyles) {
      nuxt.options.css.push("sit-onyx/global.css");
    }

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
