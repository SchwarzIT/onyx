<script lang="ts" setup>
import { iconLogout } from "@sit-onyx/icons";
import { version } from "sit-onyx/package.json";
</script>

<template>
  <OnyxUserMenu full-name="Jane Doe">
    <OnyxMenuItem color="danger">
      <OnyxIcon :icon="iconLogout" />
      {{ $t("auth.logout") }}
    </OnyxMenuItem>

    <template #footer>
      {{ $t("app.version") }}
      <span class="onyx-text--monospace">{{ version }}</span>
    </template>
  </OnyxUserMenu>
</template>
