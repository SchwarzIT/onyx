<script lang="ts" setup>
import { iconLogout } from "@sit-onyx/icons";

const { t } = useI18n();
const { user, clear } = useUserSession();

const handleLogin = () => navigateTo("/auth/siam", { external: true });
</script>

<template>
  <LazyOnyxTooltip v-if="!user" :text="t('auth.informationSchwarz')">
    <template #default="{ trigger }">
      <OnyxButton v-bind="trigger" :label="t('auth.login')" @click="handleLogin" />
    </template>
  </LazyOnyxTooltip>

  <LazyOnyxUserMenu v-else :full-name="user.name">
    <OnyxMenuItem color="danger" @click="clear">
      <OnyxIcon :icon="iconLogout" />
      {{ t("auth.logout") }}
    </OnyxMenuItem>
  </LazyOnyxUserMenu>
</template>
