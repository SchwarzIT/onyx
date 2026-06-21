<script lang="ts" setup>
import { iconLogout } from "@sit-onyx/icons";
import type { OnyxUserMenuProps } from "sit-onyx";
import { version } from "sit-onyx/package.json";

const props = defineProps<Pick<OnyxUserMenuProps, "position">>();
</script>

<template>
  <OnyxUserMenu v-bind="props" full-name="Jane Doe">
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
