<script lang="ts" setup>
import type { ComponentsEnCollectionItem } from "@nuxt/content";
import { iconCircleAttention, iconNew, iconTestTube } from "@sit-onyx/icons";
import type { OnyxTagProps } from "sit-onyx";

const props = defineProps<{
  status: NonNullable<ComponentsEnCollectionItem["status"]>;
}>();

const { t } = useI18n();

const tagProps = computed<Record<typeof props.status, OnyxTagProps>>(() => {
  return {
    new: {
      label: t("components.status.new"),
      color: "primary",
      icon: iconNew,
    },
    experimental: {
      label: t("components.status.experimental.label"),
      color: "info",
      icon: iconTestTube,
    },
    deprecated: {
      label: t("components.status.deprecated.label"),
      color: "danger",
      icon: iconCircleAttention,
    },
  };
});
</script>

<template>
  <OnyxTag v-bind="tagProps[props.status]" />
</template>
