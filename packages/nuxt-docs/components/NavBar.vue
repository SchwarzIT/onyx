<script setup lang="ts">
import circleContrast from "@sit-onyx/icons/circle-contrast.svg?raw";
import { extractLinkProps, type ColorSchemeValue } from "sit-onyx";

const { onyxDocs } = useAppConfig();
const router = useRouter();
const colorMode = useColorMode();

const isColorSchemeDialogOpen = ref(false);

const colorScheme = computed({
  get: () => {
    return colorMode.preference === "system" ? "auto" : (colorMode.preference as ColorSchemeValue);
  },
  set: (newValue) => {
    colorMode.preference = newValue === "auto" ? "system" : newValue;
  },
});
</script>

<template>
  <OnyxNavBar v-bind="onyxDocs.nav" @navigate-back="router.back">
    <OnyxNavItem
      v-for="item in onyxDocs.nav?.items"
      :key="extractLinkProps(item.link ?? '').href"
      v-bind="item"
    >
      <template v-if="item.children?.length" #children>
        <OnyxNavItem v-for="child in item.children" :key="child.label" v-bind="child" />
      </template>
    </OnyxNavItem>

    <template #contextArea>
      <OnyxIconButton
        label="Toggle color scheme"
        :icon="circleContrast"
        color="neutral"
        @click="isColorSchemeDialogOpen = true"
      />
    </template>

    <OnyxColorSchemeDialog
      v-model="colorScheme"
      :open="isColorSchemeDialogOpen"
      @close="isColorSchemeDialogOpen = false"
    />
  </OnyxNavBar>
</template>
