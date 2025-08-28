<script lang="ts" setup>
import { iconToolRuler } from "@sit-onyx/icons";
import { DENSITIES, type SelectDialogOption } from "sit-onyx";
import { capitalize } from "vue";

const settingsStore = useSettingsStore();

const density = computed({
  get: () => settingsStore.settings.density,
  set: (value) => {
    settingsStore.settings.density = value;
  },
});

const open = ref(false);

const options = DENSITIES.map((density) => {
  return {
    label: capitalize(density),
    value: density,
  } satisfies SelectDialogOption;
});

onMounted(() => {
  watch(
    density,
    (newValue, oldValue) => {
      const classList = document.documentElement.classList;
      classList.remove(`onyx-density-${oldValue}`);
      classList.add(`onyx-density-${newValue}`);
    },
    { immediate: true },
  );
});
</script>

<template>
  <OnyxIconButton
    :label="$t('density.change')"
    :icon="iconToolRuler"
    color="neutral"
    @click="open = true"
  />

  <OnyxSelectDialog v-model="density" v-model:open="open" :label="$t('density.change')" :options>
    <template #description>{{ $t("density.description") }}</template>
  </OnyxSelectDialog>
</template>
