<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { mergeVueProps, type OnyxTagProps } from "sit-onyx";

const props = defineProps<{
  label: string;
  tooltipText?: string;
}>();

const { t } = useI18n();

const tagProps = computed<OnyxTagProps>(() => {
  if (props.label === "deprecated") {
    return {
      label: t("components.status.deprecated.label"),
      color: "danger",
      icon: iconCircleAttention,
    };
  }

  return { label: props.label, color: "neutral" };
});
</script>

<template>
  <OnyxTooltip :disabled="!props.tooltipText">
    <template #default="{ trigger }">
      <OnyxTag v-bind="mergeVueProps(trigger, tagProps)" />
    </template>

    <template v-if="props.tooltipText" #tooltip>
      <MDC class="content" :value="props.tooltipText" />
    </template>
  </OnyxTooltip>
</template>

<style lang="scss" scoped>
:deep(.content) {
  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  code {
    color: var(--onyx-color-text-icons-neutral-intense);
  }
}
</style>
