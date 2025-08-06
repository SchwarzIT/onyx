import { addComponent, addPlugin, createResolver, defineNuxtModule, useLogger } from "@nuxt/kit";
import type { NuxtOptions } from "@nuxt/schema";
import type { ModuleHooks as NuxtI18nModuleHooks } from "@nuxtjs/i18n";
import { stat } from "node:fs/promises";
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
    if (i18nModuleIndex >= 0 && onyxModuleIndex > i18nModuleIndex) {
      logger.warn(
        "The @nuxtjs/i18n module was registered before the @sit-onyx/nuxt module. The default translations of onyx won't be loaded, please register the @sit-onyx/nuxt module before @nuxtjs/i18n",
      );
    }

    // If the i18n module was registered all the onyx locales and the plugin should be registered
    if (i18nModuleIndex >= 0) {
      const registerOnyxLocales: NuxtI18nModuleHooks["i18n:registerModule"] = async (register) => {
        // auto-detect onyx locales to register
        const onyxLocalesToRegister: Record<string, string> = {};

        await Promise.allSettled(
          nuxt.options.i18n?.locales?.map(async (projectLocale) => {
            const locale =
              typeof projectLocale === "string"
                ? { code: projectLocale, language: projectLocale }
                : projectLocale;

            const language = locale.language ?? locale.code;
            await stat(resolve(`./runtime/locales/${language}.js`));
            onyxLocalesToRegister[locale.code] = language;
          }) ?? [],
        );

        register({
          langDir: resolve("./runtime/locales"),
          // we need to use .js files instead of .ts because the .ts files would be compiled to .js in the build step, so
          // when projects use this nuxt module, .ts files will throw a "can not find file" error
          locales: Object.entries(onyxLocalesToRegister).map(([code, language]) => ({
            code,
            language,
            file: `${language}.js`,
          })),
        });
      };

      nuxt.hook("i18n:registerModule", registerOnyxLocales);
    }

    addPlugin({ src: resolve("./runtime/plugins/onyx") });
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
