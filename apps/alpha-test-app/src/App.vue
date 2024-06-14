<script setup lang="ts">
import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { useDark, useToggle } from "@vueuse/core";
import {
  OnyxAppLayout,
  OnyxNavBar,
  OnyxNavItem,
  OnyxSwitch,
  OnyxUserMenu,
  type OnyxNavItemProps,
  type SelectOption,
} from "sit-onyx";
import { RouterView, useRoute, useRouter } from "vue-router";
import onyxLogo from "./assets/onyx-logo.svg";
import { useGridStore } from "./stores/grid-store";

const router = useRouter();
const route = useRoute();
const gridStore = useGridStore();

const navItems = [
  { label: "Home", href: "/" },
  { label: "Form Demo", href: "/form-demo" },
  { label: "Layout Demo", href: "/layout-demo" },
  { label: "Grid Demo", href: "/grid" },
] satisfies OnyxNavItemProps[];

const userMenuOptions = [
  { value: "/settings", label: "Settings", icon: settings },
  { value: "logout", label: "Logout", icon: logout, color: "danger" },
] satisfies SelectOption[];

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <OnyxAppLayout
    :class="{
      'onyx-grid-max-md': gridStore.isMaxWidth,
      'onyx-grid-center': gridStore.isCentered,
    }"
  >
    <template
      v-if="
        /* the layout demo showcases all possible overlay features that AppLayout offers, 
        including different nav bar behaviors which OnyxNavBar das not support yet
        so it currently has its own demo nav bar placed. */
        route.path !== '/layout-demo'
      "
      #navBar
    >
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
          <!-- TODO: include the theme selection into the user menu once it supports that feature -->
          <OnyxSwitch label="Dark Mode" :model-value="isDark" @update:model-value="toggleDark" />

          <OnyxUserMenu username="John Doe" :options="userMenuOptions">
            <template #footer>
              App Version
              <span class="onyx-text--monospace">0.0.0</span>
            </template>
          </OnyxUserMenu>
        </template>
      </OnyxNavBar>
    </template>

    <RouterView />
  </OnyxAppLayout>
</template>
