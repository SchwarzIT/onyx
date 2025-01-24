<script setup lang="ts">
import type { ColorSchemeValue } from "sit-onyx";

const { onyxDocs } = useAppConfig();
const route = useRoute();
</script>

<template>
  <OnyxNavBar
    :app-name="onyxDocs.app.name"
    :logo-url="onyxDocs.app.logo"
    with-back-button
    @navigate-to-start="$router.push('/')"
    @navigate-back="$router.back"
  >
    <OnyxNavButton
      v-for="item in onyxDocs.nav.items"
      :key="item.href"
      v-bind="item"
      :active="item.href === route.path"
      @navigate="navigateTo($event)"
    />

    <template #contextArea>
      <OnyxUserMenu username="Jane Doe">
        <OnyxColorSchemeMenuItem v-model="$colorMode.preference as ColorSchemeValue" />
      </OnyxUserMenu>
    </template>
  </OnyxNavBar>
</template>
