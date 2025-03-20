<script setup lang="ts">
import { extractLinkProps, type ColorSchemeValue } from "sit-onyx";

const { onyxDocs } = useAppConfig();
const router = useRouter();
const colorMode = useColorMode();

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
  <OnyxNavBar
    :app-name="onyxDocs.app.name"
    :logo-url="onyxDocs.app?.logo"
    with-back-button
    @navigate-back="router.back"
  >
    <OnyxNavButton
      v-for="item in onyxDocs.nav?.items"
      :key="extractLinkProps(item.link ?? '').href"
      v-bind="item"
    />

    <template #contextArea>
      <OnyxUserMenu full-name="Jane Doe">
        <OnyxColorSchemeMenuItem v-model="colorScheme" />
      </OnyxUserMenu>
    </template>
  </OnyxNavBar>
</template>
