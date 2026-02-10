<script lang="ts" setup>
import {
  iconBrowserTerminal,
  iconLogout,
  iconPlaceholder,
  iconSearch,
  iconSettings,
} from "@sit-onyx/icons";
import {
  OnyxAppLayout,
  OnyxColorSchemeMenuItem,
  OnyxHeadline,
  OnyxIcon,
  OnyxMenuItem,
  OnyxPageLayout,
  OnyxUserMenu,
} from "sit-onyx";
import { ref } from "vue";
import OnyxTag from "../../OnyxTag/OnyxTag.vue";
import OnyxNavBar from "../OnyxNavBar.vue";
import OnyxNavItem from "../modules/OnyxNavItem/OnyxNavItem.vue";

const collapsed = ref(true);
</script>

<template>
  <OnyxAppLayout nav-bar-alignment="left">
    <template #navBar>
      <OnyxNavBar
        v-model:collapsed="collapsed"
        app-name="App name"
        logo-url="/onyx-logo.svg"
        orientation="vertical"
        with-back-button
      >
        <OnyxNavItem label="Router Link" link="#router-link" active :icon="iconPlaceholder" />
        <OnyxNavItem label="Nesting" :icon="iconPlaceholder">
          <template #children>
            <OnyxNavItem label="Nested Router Link" link="#nested-router-link" />
            <OnyxNavItem label="Nested Button" />
          </template>
        </OnyxNavItem>

        <template #contextArea>
          <OnyxTag color="warning" :icon="iconBrowserTerminal" label="QA stage" />
        </template>

        <template #globalContextArea>
          <OnyxNavItem color="neutral" :icon="iconSearch" label="Search" />
        </template>
        <template #footer>
          <OnyxUserMenu description="Company Name" full-name="Jane Doe">
            <OnyxMenuItem>
              <OnyxIcon :icon="iconSettings" />
              Settings
            </OnyxMenuItem>
            <OnyxColorSchemeMenuItem model-value="auto" />
            <OnyxMenuItem color="danger">
              <OnyxIcon :icon="iconLogout" />
              Logout
            </OnyxMenuItem>

            <template #footer>
              App version
              <span class="onyx-text--monospace">1.0.0</span>
            </template>
          </OnyxUserMenu>
        </template>
      </OnyxNavBar>
    </template>
    <OnyxPageLayout>
      <template #sidebar> </template>

      <!-- page content -->
      <OnyxHeadline is="h1">Page content</OnyxHeadline>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-page {
  height: 100vh;
}
</style>
