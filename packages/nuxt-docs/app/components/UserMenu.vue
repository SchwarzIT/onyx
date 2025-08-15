<script lang="ts" setup>
import { iconLogout } from "@sit-onyx/icons";
import type { AuthProviderName } from "../../shared/types/auth.js";

const { data: providers } = await useFetch("/api/_auth/providers", { default: () => [] });
const { user, clear, openInPopup, ready } = useUserSession();

const handleLogin = async (provider: AuthProviderName) => {
  openInPopup(`/auth/${provider}`);
};
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -- intended usage -->
<template>
  <template v-if="providers.length">
    <template v-if="!user">
      <OnyxButton
        v-if="providers.length === 1"
        label="Login"
        mode="outline"
        :skeleton="!ready"
        @click="handleLogin(providers[0]!.name)"
      />

      <OnyxFlyoutMenu v-else label="Login with provider">
        <template #button>
          <OnyxButton label="Login" mode="outline" :skeleton="!ready" />
        </template>

        <template #options>
          <OnyxMenuItem
            v-for="provider in providers"
            :key="provider.name"
            :label="provider.name"
            @click="handleLogin(provider.name)"
          />
        </template>
      </OnyxFlyoutMenu>
    </template>

    <OnyxUserMenu v-else :full-name="user.name" :avatar="user.picture">
      <LocaleSwitch type="menuItem" />
      <ColorSchemeSwitch type="menuItem" />

      <OnyxMenuItem color="danger" @click="clear">
        <OnyxIcon :icon="iconLogout" />
        Logout
      </OnyxMenuItem>
    </OnyxUserMenu>
  </template>
</template>
