<script lang="ts" setup>
import { iconLogout, iconPlaceholder, iconSearch, iconSettings } from "@sit-onyx/icons";
import { OnyxAppLayout, OnyxPageLayout } from "../../../index.js";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxColorSchemeMenuItem from "../../OnyxNavBar/modules/OnyxColorSchemeMenuItem/OnyxColorSchemeMenuItem.vue";
import OnyxMenuItem from "../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNavItem from "../../OnyxNavBar/modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxUserMenu from "../../OnyxNavBar/modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "../../OnyxNavBar/OnyxNavBar.vue";
</script>

<template>
  <OnyxAppLayout nav-bar-alignment="left">
    <template #navBar>
      <OnyxNavBar app-name="App name" logo-url="/onyx-logo.svg" orientation="vertical">
        <OnyxNavItem label="Router Link" link="#router-link" active :icon="iconPlaceholder" />
        <OnyxNavItem label="Router Link" link="#router-link" :icon="iconPlaceholder" />

        <template #contextArea>
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

        <template #globalContextArea>
          <OnyxNavItem color="neutral" :icon="iconSearch" label="Search" />
        </template>
      </OnyxNavBar>
    </template>

    <OnyxPageLayout> This is the main page content. </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.navigation {
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);
  height: 100%;
  padding: var(--onyx-density-md);
}
</style>
