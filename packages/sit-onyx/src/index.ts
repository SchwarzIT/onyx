import "@/styles/index.scss";

export { default as OnyxButton } from "@/components/OnyxButton/OnyxButton.vue";
export * from "@/components/OnyxButton/types";
export * from "@/components/OnyxCheckbox/types";
export { default as OnyxCheckboxGroup } from "@/components/OnyxCheckboxGroup/OnyxCheckboxGroup.vue";
export * from "@/components/OnyxCheckboxGroup/types";
export { default as OnyxHeadline } from "@/components/OnyxHeadline/OnyxHeadline.vue";
export * from "@/components/OnyxHeadline/types";
export { default as OnyxIcon } from "@/components/OnyxIcon/OnyxIcon.vue";
export * from "@/components/OnyxIcon/types";
export { default as TestInput } from "@/components/TestInput/TestInput.vue";
export type { OnyxTranslations, ProvideI18nOptions } from "@/i18n";
export * from "@/types/colors";
export * from "@/types/i18n";
export * from "@/types/utils";

export { createOnyx } from "@/utils/plugin";
