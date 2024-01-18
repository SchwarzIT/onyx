<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore';
import { ScuButton } from '@scu/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const authStore = useAuthStore();

// you can specify the route here where the user should be redirect to after login
// we use the home route by default
const login = () => authStore.login('/');
</script>

<template>
  <div class="page">
    <div class="align-center logged-out">
      {{ t('pages.logout.success') }}
      <ScuButton :text="t('pages.logout.login')" data-testid="login-button" @click="login" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logged-out {
  gap: var(--sit-space-s);
}
</style>
