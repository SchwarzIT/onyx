<script setup lang="ts">
import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import {
  OnyxAppLayout,
  OnyxNavItem,
  OnyxNavigationBar,
  OnyxUserMenu,
  type ListboxOption,
  type OnyxNavItemProps,
} from "sit-onyx";
import { RouterView, useRouter } from "vue-router";
import onyxLogo from "./assets/onyx-logo.svg";

const router = useRouter();

const navItems = [
  { label: "Home", href: "/" },
  { label: "Form Demo", href: "/form-demo" },
  { label: "Layout Demo", href: "/layout-demo" },
] satisfies OnyxNavItemProps[];

const userMenuOptions = [
  { value: "/settings", label: "Settings", icon: settings },
  { value: "logout", label: "Logout", icon: logout, color: "danger" },
] satisfies ListboxOption[];
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavigationBar
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
          @navigate="router.push"
        />

        <template #contextArea>
          <OnyxUserMenu username="John Doe" :options="userMenuOptions">
            <template #footer>
              App Version
              <span class="onyx-text--monospace">0.0.0</span>
            </template>
          </OnyxUserMenu>
        </template>
      </OnyxNavigationBar>
    </template>

    <RouterView />
  </OnyxAppLayout>
</template>
