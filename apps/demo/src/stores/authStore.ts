import config from '@/config';
import { createSiamAuthStore } from '@sit/vue-core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const siamAuthStore = createSiamAuthStore(config.auth);

  // put custom computed etc. here
  const isLoggedIn = computed(() => !!siamAuthStore.user.value);
  const username = computed(() => siamAuthStore.user.value?.profile.fullName);

  return { ...siamAuthStore, isLoggedIn, username };
});
