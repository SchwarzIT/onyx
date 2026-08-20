<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import { iconLogin, iconLogout, iconSettings, iconTranslate } from "@sit-onyx/icons";
import {
  ColorSchemeValue,
  OnyxAppLayout,
  OnyxColorSchemeMenuItem,
  OnyxFlyoutMenu,
  OnyxMenuItem,
  OnyxNavBar,
  OnyxNavItem,
  OnyxSeparator,
  OnyxUnstableNavButton,
  OnyxUserMenu,
} from "sit-onyx";
import { ref } from "vue";

const user = ref<{ name: string } | undefined>({ name: "Jane Doe" });
const locale = ref("en");
const colorScheme = ref<ColorSchemeValue>("auto");

const handleLogin = () => {
  // your logout logic here...
  user.value = { name: "Jane Doe" };
};

const handleLogout = () => {
  // your logout logic here...
  user.value = undefined;
};
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="App name" :logo-url>
        <OnyxNavItem label="Page 1" link="/page-1" />

        <template #contextArea>
          <OnyxFlyoutMenu label="Choose application language">
            <template #button="{ trigger }">
              <OnyxUnstableNavButton
                v-bind="trigger"
                :label="locale.toUpperCase()"
                :icon="iconTranslate"
              />
            </template>

            <template #options>
              <OnyxMenuItem label="English" :active="locale === 'en'" @click="locale = 'en'" />
              <OnyxMenuItem label="Deutsch" :active="locale === 'de'" @click="locale = 'de'" />
            </template>
          </OnyxFlyoutMenu>

          <OnyxSeparator orientation="vertical" />

          <OnyxUserMenu v-if="user" :full-name="user.name" description="Description">
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
