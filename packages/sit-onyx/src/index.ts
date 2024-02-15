import "@/styles/index.scss";

export { default as OnyxHeadline } from "@/components/OnyxHeadline/OnyxHeadline.vue";
export * from "@/components/OnyxHeadline/types";
export { default as OnyxIcon } from "@/components/OnyxIcon/OnyxIcon.vue";
export * from "@/components/OnyxIcon/types";
export { default as TestInput } from "@/components/TestInput/TestInput.vue";
export * from "@/types/colors";
export * from "@/types/i18n";
export * from "@/types/utils";

// export everything except "injectI18n" because we don't want that the import is suggested
// to projects using this library because they probably use "vue-i18n"
export { provideI18n, type OnyxTranslations, type ProvideI18nOptions } from "@/i18n";

export { createOnyx } from "@/utils/plugin";
