<script lang="ts" setup>
import { iconDashboard, iconDraggable, iconDraggableHorizontal } from "@sit-onyx/icons";
import { type SelectDialogOption } from "sit-onyx";
import { computed, ref } from "vue";

const isVertical = defineModel<boolean>({ default: false });

const open = ref(false);

const options = computed(
  () =>
    [
      {
        label: $t("navigation.horizontal"),
        icon: iconDraggable,
        value: "horizontal",
      },
      {
        label: $t("navigation.vertical"),
        icon: iconDraggableHorizontal,
        value: "vertical",
      },
    ] satisfies SelectDialogOption<string>[],
);

const selectedOrientation = computed({
  get: () => (isVertical.value ? "vertical" : "horizontal"),
  set: (newValue) => {
    isVertical.value = newValue === "vertical";
  },
});
</script>

<template>
  <OnyxUnstableNavButton
    :label="$t('navigation.changeOrientation')"
    :icon="iconDashboard"
    hide-label
    @click="open = true"
  />

  <OnyxSelectDialog
    v-model="selectedOrientation"
    v-model:open="open"
    :label="$t('navigation.changeOrientation')"
    :options="options"
  >
    <template #description>{{ $t("navigation.orientationDescription") }}</template>
  </OnyxSelectDialog>
</template>
