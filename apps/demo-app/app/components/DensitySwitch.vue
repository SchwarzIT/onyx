<script lang="ts" setup>
import { iconToolRuler } from "@sit-onyx/icons";
import { DENSITIES, type SelectDialogOption } from "sit-onyx";
import { capitalize } from "vue";

const settingsStore = useSettingsStore();

const open = ref(false);

const options = DENSITIES.map((density) => {
  return {
    label: capitalize(density),
    value: density,
  } satisfies SelectDialogOption;
});
</script>

<template>
  <OnyxUnstableNavButton
    :label="$t('density.change')"
    :icon="iconToolRuler"
    hide-label
    @click="open = true"
  />

  <OnyxSelectDialog
    v-model="settingsStore.settings.density"
    v-model:open="open"
    :label="$t('density.change')"
    :options
  >
    <template #description>{{ $t("density.description") }}</template>
  </OnyxSelectDialog>
</template>
