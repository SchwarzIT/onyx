import "@/styles/index.scss";

export { default as TestInput } from "@/components/TestInput/TestInput.vue";

export * from "@/types";

// export everything except "injectI18n" because we don't want that the import is suggested
// by projects using this library because they probably use "vue-i18n"
export { provideI18n, type ProvideI18nOptions, type Translation } from "@/i18n";
