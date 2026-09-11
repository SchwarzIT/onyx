<script lang="ts" setup>
import { flagUS, flagDE } from "@sit-onyx/flags";
import { iconLogout, iconSettings } from "@sit-onyx/icons";
import {
  ColorSchemeValue,
  OnyxColorSchemeMenuItem,
  OnyxLanguageMenuItem,
  OnyxMenuItem,
  OnyxUserMenu,
  SelectDialogOption,
} from "sit-onyx";
import { ref } from "vue";

const colorScheme = ref<ColorSchemeValue>("auto");
const locale = ref("en");

const languages: SelectDialogOption[] = [
  { label: "English", value: "en", icon: flagUS },
  { label: "Deutsch", value: "de", icon: flagDE },
];

const handleLogout = () => {
  // your logout logic here...
};
</script>

<template>
  <OnyxUserMenu full-name="Jane Doe" description="Company Name">
    <OnyxMenuItem label="Settings" :icon="iconSettings" link="/settings" />
    <OnyxColorSchemeMenuItem v-model="colorScheme" />
    <OnyxLanguageMenuItem v-model="locale" :options="languages" />
    <OnyxMenuItem label="Logout" :icon="iconLogout" color="danger" @click="handleLogout" />

    <template #footer>
      App version
      <span class="onyx-text--monospace">1.0.0</span>
    </template>
  </OnyxUserMenu>
</template>
