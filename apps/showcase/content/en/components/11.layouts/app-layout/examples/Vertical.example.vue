<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import { iconLogin, iconLogout, iconPlaceholder, iconSearch, iconSettings } from "@sit-onyx/icons";
import {
  ColorSchemeValue,
  ONYX_BREAKPOINTS,
  OnyxAppLayout,
  OnyxColorSchemeMenuItem,
  OnyxMenuItem,
  OnyxNavBar,
  OnyxNavItem,
  OnyxUnstableNavButton,
  OnyxUserMenu,
  useResizeObserver,
} from "sit-onyx";
import { computed, ref } from "vue";

const user = ref<{ name: string } | undefined>({ name: "Jane Doe" });
const colorScheme = ref<ColorSchemeValue>("auto");

const handleLogin = () => {
  // your logout logic here...
  user.value = { name: "Jane Doe" };
};

const handleLogout = () => {
  // your logout logic here...
  user.value = undefined;
};

const { width: viewportWidth } = useResizeObserver();

/**
 * Whether to use a horizontal nav bar for small / mobile viewports.
 */
const isMobile = computed(() => viewportWidth.value <= ONYX_BREAKPOINTS.xs);
</script>

<template>
  <OnyxAppLayout :nav-bar-alignment="isMobile ? 'top' : 'left'">
    <template #navBar>
      <OnyxNavBar app-name="App name" :logo-url :orientation="isMobile ? 'horizontal' : 'vertical'">
        <OnyxNavItem label="Page 1" link="/page-1" :icon="iconPlaceholder" />

        <OnyxNavItem label="Page 2" link="/page-2" :icon="iconPlaceholder">
          <template #children>
            <OnyxNavItem label="Child 1" link="/page-2/1" />
            <OnyxNavItem label="Child 2" link="/page-2/2" />
            <OnyxNavItem label="Child 3" link="/page-2/3" />
          </template>
        </OnyxNavItem>

        <template #globalContextArea>
          <OnyxUnstableNavButton label="Search" :icon="iconSearch" hide-label />
        </template>

        <template #contextArea>
          <OnyxUserMenu v-if="user" full-name="Jane Doe" description="Description" position="right">
            <OnyxMenuItem label="Settings" :icon="iconSettings" link="/settings" />
            <OnyxColorSchemeMenuItem v-model="colorScheme" />
            <OnyxMenuItem label="Logout" :icon="iconLogout" color="danger" @click="handleLogout" />

            <template #footer>
              App version
              <span class="onyx-text--monospace">1.0.0</span>
            </template>
          </OnyxUserMenu>

          <OnyxUnstableNavButton
            v-else
            label="Login"
            :icon="iconLogin"
            color="primary"
            @click="handleLogin"
          />
        </template>
      </OnyxNavBar>
    </template>
  </OnyxAppLayout>
</template>
