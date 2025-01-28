<script setup lang="ts">
import logout from "@sit-onyx/icons/logout.svg?raw";
import { useColorMode } from "@vueuse/core";
import {
  OnyxAppLayout,
  OnyxColorSchemeMenuItem,
  OnyxIcon,
  OnyxMenuItem,
  OnyxNavBar,
  OnyxNavButton,
  OnyxToast,
  OnyxUserMenu,
  useThemeTransition,
  type OnyxNavButtonProps,
} from "sit-onyx";
import { useTemplateRef, watch } from "vue";
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
  { label: "Data-Grid Demo", href: "/data-grid" },
] satisfies OnyxNavButtonProps[];

const { store: colorScheme } = useColorMode({ disableTransition: false });
useThemeTransition(colorScheme);

const navBar = useTemplateRef("navBarRef");

watch(
  () => route.path,
  () => {
    navBar.value?.closeMobileMenus();
  },
);
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
        ref="navBarRef"
        app-name="Demo App"
        :logo-url="onyxLogo"
        show-back-button
        @back-button-click="router.back"
        @app-area-click="router.push('/')"
      >
        <OnyxNavButton
          v-for="item in navItems"
          :key="item.href"
          v-bind="item"
          :active="item.href === router.currentRoute.value.path"
          @navigate="router.push"
        />

        <template #contextArea>
          <OnyxUserMenu username="John Doe">
            <OnyxColorSchemeMenuItem v-model="colorScheme" />

            <OnyxMenuItem color="danger">
              <OnyxIcon :icon="logout" />
              Logout
            </OnyxMenuItem>

            <template #footer>
              App Version
              <span class="onyx-text--monospace">0.0.0</span>
            </template>
          </OnyxUserMenu>
        </template>
      </OnyxNavBar>
    </template>

    <RouterView />

    <OnyxToast />
  </OnyxAppLayout>
</template>
