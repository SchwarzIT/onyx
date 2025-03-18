import { addComponent, addPlugin, createResolver, defineNuxtModule, useLogger } from "@nuxt/kit";
import type { NuxtOptions } from "@nuxt/schema";
import type { ModuleHooks as NuxtI18nModuleHooks } from "@nuxtjs/i18n";
import type { OnyxTheme } from "sit-onyx";
import * as onyx from "sit-onyx";

export interface ModuleOptions {
  /**
   * The onyx theme to use. See: [https://onyx.schwarz/development/theming.html](https://onyx.schwarz/development/theming.html)
   * @default "onyx"
   */
  theme: OnyxTheme;
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
  /**
   * Settings related to the integration with @nuxtjs/i18n
   */
  i18n?: {
    /**
     * Mapping for registering the translations from onyx with @nuxtjs/i18n.
     * @example
     * ```ts
     * registerLocales: { "en_US": "en-US" }
     * ```
     * This would register the onyx translations for the language "en-US" to the code "en_US" of your projects locales.
     */
    registerLocales?: Record<string, "en-US" | "de-DE" | "ko-KR">;
  };
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@sit-onyx/nuxt",
    configKey: "onyx",
  },
  defaults: {
    theme: "onyx",
  },
  setup(options, nuxt) {
    const logger = useLogger("@sit-onyx/nuxt");
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.css.push("sit-onyx/style.css");

    if (options.theme !== "onyx") {
      nuxt.options.css.push(`sit-onyx/themes/${options.theme}-light.css`);
      nuxt.options.css.push(`sit-onyx/themes/${options.theme}-dark.css`);
    }

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
      const registerOnyxLocales: NuxtI18nModuleHooks["i18n:registerModule"] = (register) => {
        register({
          langDir: resolve("./runtime/locales"),
          // we need to use .js files instead of .ts because the .ts files would be compiled to .js in the build step, so
          // when projects use this nuxt module, .ts files will throw a "can not find file" error
          locales: Object.entries(options.i18n?.registerLocales ?? {}).map(([code, language]) => ({
            code,
            file: `${language}.js`,
          })),
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
