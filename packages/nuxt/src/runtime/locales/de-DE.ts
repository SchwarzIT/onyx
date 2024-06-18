import { defineI18nLocale } from "#i18n";
import { useRuntimeConfig } from "#imports";
import deDE from "sit-onyx/locales/de-DE.json";

export default defineI18nLocale(() => {
  const config = useRuntimeConfig();
  return { [config.public.onyx.i18n.prefix]: deDE };
});
