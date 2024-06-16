<script setup lang="ts">
import circleContrast from "@sit-onyx/icons/circle-contrast.svg?raw";
import logout from "@sit-onyx/icons/logout.svg?raw";
import { useColorMode } from "@vueuse/core";
import {
  OnyxAppLayout,
  OnyxColorSchemeDialog,
  OnyxNavBar,
  OnyxNavItem,
  OnyxUserMenu,
  type OnyxNavItemProps,
  type SelectOption,
} from "sit-onyx";
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import onyxLogo from "./assets/onyx-logo.svg";
import { useGridStore } from "./stores/grid-store";

const router = useRouter();
const gridStore = useGridStore();

const navItems = [
  { label: "Home", href: "/" },
  { label: "Form Demo", href: "/form-demo" },
  { label: "Layout Demo", href: "/layout-demo" },
  { label: "Grid Demo", href: "/grid" },
] satisfies OnyxNavItemProps[];

const userMenuOptions = [
  { value: "color-scheme", label: "Appearance", icon: circleContrast },
  { value: "logout", label: "Logout", icon: logout, color: "danger" },
] as const satisfies SelectOption[];

const { store: colorScheme } = useColorMode();
const isColorSchemeDialogOpen = ref(false);

const handleOptionClick = (value: (typeof userMenuOptions)[number]["value"]) => {
  if (value === "color-scheme") {
    isColorSchemeDialogOpen.value = true;
  }
};
</script>

<template>
  <OnyxAppLayout
    :class="{
      'onyx-grid-max-md': gridStore.isMaxWidth,
      'onyx-grid-center': gridStore.isCentered,
    }"
  >
    <template #navBar>
      <OnyxNavBar
        app-name="Alpha Test App"
        :logo-url="onyxLogo"
        show-back-button
        @back-button-click="router.back"
        @app-area-click="router.push('/')"
      >
        <OnyxNavItem
          v-for="item in navItems"
          :key="item.href"
          v-bind="item"
          :active="item.href === router.currentRoute.value.path"
          @click="router.push"
        />

        <template #contextArea>
          <OnyxUserMenu
            username="John Doe"
            :options="userMenuOptions"
            @option-click="handleOptionClick"
          >
            <template #footer>
              App Version
              <span class="onyx-text--monospace">0.0.0</span>
            </template>
          </OnyxUserMenu>
        </template>
      </OnyxNavBar>
    </template>

    <RouterView />

    <OnyxColorSchemeDialog
      v-model="colorScheme"
      :open="isColorSchemeDialogOpen"
      @close="isColorSchemeDialogOpen = false"
    />
  </OnyxAppLayout>
</template>
