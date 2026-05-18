<script lang="ts" setup>
import type { ComponentsEnCollectionItem } from "@nuxt/content";
import { iconNew, iconTestTube } from "@sit-onyx/icons";
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
    beta: {
      label: t("components.status.beta.label"),
      color: "info",
      icon: iconTestTube,
    },
  };
});
</script>

<template>
  <OnyxTag v-bind="tagProps[props.status]" />
</template>
