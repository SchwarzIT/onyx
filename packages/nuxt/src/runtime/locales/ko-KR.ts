import { defineI18nLocale } from "#i18n";
import { useRuntimeConfig } from "#imports";
import koKR from "sit-onyx/locales/ko-KR.json";

export default defineI18nLocale(() => {
  const config = useRuntimeConfig();
  return { [config.public.onyx.i18n.prefix]: koKR };
});
