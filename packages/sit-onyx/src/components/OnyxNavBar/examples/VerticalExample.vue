<script lang="ts" setup>
import {
  iconBrowserTerminal,
  iconLogout,
  iconPlaceholder,
  iconSearch,
  iconSettings,
} from "@sit-onyx/icons";
import { computed, ref } from "vue";
import { useResizeObserver } from "../../../composables/useResizeObserver.js";
import {
  ONYX_BREAKPOINTS,
  OnyxAppLayout,
  OnyxColorSchemeMenuItem,
  OnyxHeadline,
  OnyxIcon,
  OnyxMenuItem,
  OnyxNavBar,
  OnyxNavItem,
  OnyxPageLayout,
  OnyxTag,
  OnyxUserMenu,
} from "../../../index.js";

const expanded = ref(false);

const { width } = useResizeObserver();
const isMobile = computed(() => width.value <= ONYX_BREAKPOINTS.xs);
</script>

<template>
  <OnyxAppLayout :nav-bar-alignment="isMobile ? 'top' : 'left'">
    <template #navBar>
      <OnyxNavBar
        v-model:expanded="expanded"
        app-name="App name"
        logo-url="/onyx-logo.svg"
        :orientation="isMobile ? 'horizontal' : 'vertical'"
        with-back-button
      >
        <OnyxNavItem label="Router Link" link="#router-link" active :icon="iconPlaceholder" />
        <OnyxNavItem label="External Link" link="https://it.schwarz/" :icon="iconPlaceholder" />
        <OnyxNavItem label="Nesting" :icon="iconPlaceholder">
          <template #children>
            <OnyxNavItem label="Item 1" link="#nested-router-link" />
            <OnyxNavItem label="Item 2" />
            <OnyxNavItem label="Item 3" link="https://it.schwarz/" />
          </template>
        </OnyxNavItem>

        <template #contextArea>
          <OnyxTag color="warning" :icon="iconBrowserTerminal" label="QA stage" />
          <OnyxUserMenu description="Company Name" full-name="Jane Doe" position="right">
            <OnyxMenuItem>
              <OnyxIcon :icon="iconSettings" />
              Settings
            </OnyxMenuItem>
            <OnyxMenuItem>
              <OnyxIcon :icon="iconSettings" />
              Settings
            </OnyxMenuItem>
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

        <template #globalContextArea>
          <OnyxNavItem color="neutral" :icon="iconSearch" label="Search" />
        </template>
      </OnyxNavBar>
    </template>

    <OnyxPageLayout>
      <!-- page content -->
      <OnyxHeadline is="h1">Page content</OnyxHeadline>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss">
.onyx-user-menu .onyx-basic-popover__dialog {
  margin-block: var(--onyx-spacing-xs);
}
</style>
