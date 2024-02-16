import "@/styles/index.scss";

export * from "@/components/OnyxCheckbox/types";
export { default as OnyxHeadline } from "@/components/OnyxHeadline/OnyxHeadline.vue";
export { default as OnyxButton } from "@/components/OnyxButton/OnyxButton.vue";
export * from "@/components/OnyxHeadline/types";
export * from "@/components/OnyxButton/types";
export { default as OnyxIcon } from "@/components/OnyxIcon/OnyxIcon.vue";
export * from "@/components/OnyxIcon/types";
export { default as TestInput } from "@/components/TestInput/TestInput.vue";
export * from "@/types/colors";
export * from "@/types/i18n";
export * from "@/types/utils";
export { type OnyxTranslations } from "@/i18n";

export { createOnyx } from "@/utils/plugin";
