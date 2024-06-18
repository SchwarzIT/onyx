import { defineI18nLocale } from "#i18n";
import { useRuntimeConfig } from "#imports";
import enUS from "sit-onyx/locales/en-US.json";

export default defineI18nLocale(() => {
  const config = useRuntimeConfig();
  return { [config.public.onyx.i18n.prefix]: enUS };
});
