import { addComponent, addPlugin, createResolver, defineNuxtModule, useLogger } from "@nuxt/kit";
import type { NuxtOptions } from "@nuxt/schema";
import type { ModuleHooks as NuxtI18nModuleHooks } from "@nuxtjs/i18n";
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
    name: "@sit-onyx/nuxt",
    configKey: "onyx",
  },
  defaults: {},
  setup(options, nuxt) {
    const logger = useLogger("@sit-onyx/nuxt");
    const { resolve } = createResolver(import.meta.url);

    /**
     * The calc plugin of cssnano doesn't work with calc constants (https://developer.mozilla.org/en-US/docs/Web/CSS/calc-constant) used within onyx.
     * Therefor it needs to be disabled temporarily until they are either no longer used inside onyx or the calc plugin is fixed.
     * An issue was raised for inside the calc plugin: https://github.com/postcss/postcss-calc/issues/210
     */
    nuxt.options.postcss.plugins.cssnano = { preset: ["default", { calc: false }] };

    nuxt.options.css.push("sit-onyx/style.css");

    if (!options.disableGlobalStyles) {
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

    const i18nModuleIndex = getModuleIndex(
      nuxt.options.modules,
      "@nuxtjs/i18n",
      "@nuxtjs/i18n-edge",
    );

    // Quick check to warn the user as the @nuxtjs/i18n module needs to be registered after onyx for the default translations to work
    const onyxModuleIndex = getModuleIndex(nuxt.options.modules, "@sit-onyx/nuxt");
    if (onyxModuleIndex > i18nModuleIndex) {
      logger.warn(
        "The @nuxtjs/i18n module was registered before the @sit-onyx/nuxt module. The default translations of onyx won't be loaded, please register the @sit-onyx/nuxt module before @nuxtjs/i18n",
      );
    }

    // If the i18n module was registered all the onyx locales and the plugin should be registered
    if (i18nModuleIndex >= 0) {
      const registerOnyxLocales: NuxtI18nModuleHooks["i18n:registerModule"] = (register) => {
        register({
          langDir: resolve("./runtime/locales"),
          locales: [
            // we need to use .js files instead of .ts because the .ts files would be compiled to .js in the build step, so
            // when projects use this nuxt module, .ts files will throw a "can not find file" error
            { code: "de-DE", file: "de-DE.js" },
            { code: "en-US", file: "en-US.js" },
            { code: "ko-KR", file: "ko-KR.js" },
          ],
        });
      };

      nuxt.hook("i18n:registerModule", registerOnyxLocales);

      addPlugin({ src: resolve("./runtime/plugins/onyx") });
    }
  },
});

function getModuleIndex(modules: NuxtOptions["modules"], ...moduleNames: string[]) {
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];

    if (typeof module === "string" && moduleNames.includes(module)) return i;
    if (Array.isArray(module) && moduleNames.includes(module[0] as string)) return i;
  }

  return -1;
}
