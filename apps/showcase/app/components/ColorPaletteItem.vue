<script lang="ts" setup>
import { getCSSVariableValue } from "@sit-onyx/chartjs-plugin";
import { iconCode, iconColors, iconFileSketch } from "@sit-onyx/icons";
import { useToast, type OnyxColor } from "sit-onyx";

const props = withDefaults(
  defineProps<{
    /**
     * The CSS variable to use for this color.
     */
    cssVariable: string;
    /**
     * The text color to use.
     */
    textColor?: OnyxColor | "white" | "inverted";
  }>(),
  {
    textColor: "white",
  },
);

defineSlots<{
  /**
   * (Text) content.
   */
  default?(): unknown;
}>();

const toast = useToast();
const { t } = useI18n();
const { copy } = useClipboard();

const button = useTemplateRef("button");

const color = computed(() => {
  if (props.textColor === "white") return "#fff";
  if (props.textColor === "neutral") return "var(--onyx-color-text-icons-neutral-intense)";
  if (props.textColor === "inverted") return "var(--onyx-color-text-icons-neutral-inverted)";
  return `var(--onyx-color-text-icons-${props.textColor}-bold)`;
});

const cssVariableName = computed(() => getCssVariableName(props.cssVariable));

const handleCopyCss = async () => {
  await copy(props.cssVariable);

  toast.show({
    headline: t("copiedToClipboard"),
    description: t("variables.copy.css.success", { value: props.cssVariable }),
    color: "success",
  });
};

const handleCopyFigma = async () => {
  if (!cssVariableName.value) return;

  const figmaName = cssVariableName.value.split("-").slice(-2).join("-");
  await copy(figmaName);

  toast.show({
    headline: t("copiedToClipboard"),
    description: t("variables.copy.figma.success", { value: figmaName }),
    color: "success",
  });
};

const handleCopyHex = async () => {
  if (!cssVariableName.value) return;
  const value = getCSSVariableValue(cssVariableName.value, button.value ?? undefined);
  await copy(value);

  toast.show({
    headline: t("copiedToClipboard"),
    description: t("variables.copy.hex.success", { value }),
    color: "success",
  });
};
</script>

<template>
  <OnyxFlyoutMenu class="flyout" :label="$t('actions')" trigger="click">
    <template #button="{ trigger }">
      <button
        ref="button"
        v-bind="trigger"
        class="color"
        :style="{ backgroundColor: props.cssVariable, color }"
        type="button"
      >
        <slot></slot>
      </button>
    </template>

    <template #options>
      <OnyxMenuItem
        :label="$t('variables.copy.css.label')"
        :icon="iconCode"
        @click="handleCopyCss"
      />
      <OnyxMenuItem
        :label="$t('variables.copy.figma.label')"
        :icon="iconFileSketch"
        @click="handleCopyFigma"
      />
      <OnyxMenuItem
        :label="$t('variables.copy.hex.label')"
        :icon="iconColors"
        @click="handleCopyHex"
      />
    </template>

    <template #footer>
      <div class="flyout__footer onyx-text--small">{{ props.cssVariable }}</div>
    </template>
  </OnyxFlyoutMenu>
</template>

<style lang="scss" scoped>
.flyout {
  flex-grow: 1;

  &__footer {
    color: var(--onyx-color-text-icons-neutral-medium);
    padding: var(--onyx-density-xs) var(--onyx-density-sm);
    border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}

.color {
  flex-grow: 1;
  padding: var(--onyx-density-xs);
  padding-bottom: var(--onyx-density-2xl);
  cursor: pointer;
  border: none;
  font: inherit;
  text-align: left;
}
</style>
