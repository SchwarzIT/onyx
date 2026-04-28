<script lang="ts" setup>
import { iconLogin, iconLogout } from "@sit-onyx/icons";

const { t } = useI18n();
const { user, clear } = useUserSession();
const { login } = useLogin();
</script>

<template>
  <OnyxTooltip v-if="!user" :text="t('auth.informationSchwarz')">
    <template #default="{ trigger }">
      <OnyxUnstableNavButton
        v-bind="trigger"
        :label="t('auth.login')"
        :icon="iconLogin"
        color="primary"
        @click="login"
      />
    </template>
  </OnyxTooltip>

  <OnyxUserMenu v-else :full-name="user.name">
    <OnyxMenuItem color="danger" @click="clear">
      <OnyxIcon :icon="iconLogout" />
      {{ t("auth.logout") }}
    </OnyxMenuItem>
  </OnyxUserMenu>
</template>
