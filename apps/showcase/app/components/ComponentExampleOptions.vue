<script lang="ts" setup>
import { iconSettings } from "@sit-onyx/icons";
import { DENSITIES, type Density } from "sit-onyx";

export type ComponentExampleOptions = {
  density?: Density;
  colorScheme?: "light" | "dark";
};

const options = defineModel<ComponentExampleOptions>({ default: () => ({}) });
</script>

<template>
  <OnyxFlyoutMenu
    :label="$t('components.options.change')"
    drilldown-mode="external"
    trigger="click"
  >
    <template #button="{ trigger }">
      <OnyxIconButton
        v-bind="trigger"
        :label="$t('components.options.change')"
        :icon="iconSettings"
        density="compact"
        color="neutral"
      />
    </template>

    <template #options>
      <OnyxMenuItem :label="$t('components.options.density')">
        <template #children>
          <OnyxMenuItem
            v-for="density in DENSITIES"
            :key="density"
            :label="density"
            :active="options.density === density"
            @click="options.density = density"
          />
        </template>
      </OnyxMenuItem>

      <OnyxMenuItem :label="$t('components.options.appearance')">
        <template #children>
          <OnyxMenuItem
            :label="$t('components.options.appearances.light')"
            :active="options.colorScheme === 'light'"
            @click="options.colorScheme = 'light'"
          />
          <OnyxMenuItem
            :label="$t('components.options.appearances.dark')"
            :active="options.colorScheme === 'dark'"
            @click="options.colorScheme = 'dark'"
          />
        </template>
      </OnyxMenuItem>
    </template>
  </OnyxFlyoutMenu>
</template>
