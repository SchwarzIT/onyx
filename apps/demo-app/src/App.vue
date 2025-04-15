<script setup lang="ts">
import logout from "@sit-onyx/icons/logout.svg?raw";
import { useColorMode } from "@vueuse/core";
import {
  OnyxAppLayout,
  OnyxColorSchemeMenuItem,
  OnyxIcon,
  OnyxLanguageMenuItem,
  OnyxMenuItem,
  OnyxNavBar,
  OnyxNavItem,
  OnyxToast,
  OnyxUserMenu,
  useThemeTransition,
} from "sit-onyx";
import { useI18n } from "vue-i18n";
import { RouterView, useRoute, useRouter } from "vue-router";
import onyxLogo from "./assets/onyx-logo.svg";
import { useGridStore } from "./stores/grid-store";

const router = useRouter();
const route = useRoute();
const gridStore = useGridStore();
const { locale, availableLocales } = useI18n();

const { store: colorScheme } = useColorMode({ disableTransition: false });
useThemeTransition(colorScheme);
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
        route.path !== '/demos/layout'
      "
      #navBar
    >
      <OnyxNavBar
        app-name="Demo App"
        :logo-url="onyxLogo"
        show-back-button
        @back-button-click="router.back"
      >
        <OnyxNavItem label="Home" link="/" />

        <OnyxNavItem label="Demos">
          <template #children>
            <OnyxNavItem label="Form" link="/demos/form" />
            <OnyxNavItem label="Layout" link="/demos/layout" />
            <OnyxNavItem label="Grid" link="/demos/grid" />
            <OnyxNavItem label="Data grid" link="/demos/data-grid" />
          </template>
        </OnyxNavItem>

        <template #contextArea>
          <OnyxUserMenu full-name="John Doe">
            <OnyxLanguageMenuItem
              v-model="locale"
              :options="availableLocales.map((locale) => ({ value: locale, label: locale }))"
            />

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
