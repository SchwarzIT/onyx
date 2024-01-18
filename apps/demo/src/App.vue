<script lang="ts" setup>
import TopBarOrganism from '@/components/organisms/TopBarOrganism.vue';
import { useAuthStore } from '@/stores/authStore';
import { ScuSpace, ScuToastController } from '@scu/vue';
import {
  GlobalInfoTileMolecule,
  SystemModalMolecule,
  provideGlobalInfoTile,
  provideSystemModal,
  provideToastController,
  useNavItems,
} from '@sit/vue-core';
import { provideI18n } from 'sit-onyx';
import deDE from 'sit-onyx/locales/de-DE.json';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView, useRouter } from 'vue-router';
import { changeLocale } from './i18n';
import { getNavBarItems } from './router/navItems';

const { t, locale } = useI18n();
provideI18n({ locale, messages: { 'de-DE': deDE } });

const router = useRouter();
const authStore = useAuthStore();

// For more information see: https://vue-blueprint.schwarz/packages/vue-core.html#error-handling
const { globalInfoTileProps } = provideGlobalInfoTile();
const { bindToastController } = provideToastController();
const { systemModalProps } = provideSystemModal(
  computed(() => ({
    closeButtonText: t('global.close'),
    copyButtonText: t('global.copy'),
    debugInformationTitle: t('global.debugInformation'),
    environment: {
      url: window.location.href,
    },
  }))
);

const { items: navItems } = useNavItems({
  currentRoute: router.currentRoute,
  navItems: getNavBarItems(t, authStore),
});

const login = () => authStore.login(router.currentRoute.value.fullPath);
const logout = async () => {
  await authStore.logout();

  if (router.currentRoute.value.meta.requiresAuth) {
    await router.push('/logged-out');
  }
};
</script>

<template>
  <ScuSpace class="app">
    <TopBarOrganism
      data-testid="top-bar"
      :nav-items="navItems"
      :locale="locale"
      :username="authStore.username"
      @navigate="router.push"
      @back-button-click="router.back"
      @login="login"
      @logout="logout"
      @update:locale="changeLocale"
    />

    <main class="app__main">
      <GlobalInfoTileMolecule v-bind="globalInfoTileProps" />
      <RouterView />
    </main>

    <ScuToastController :ref="bindToastController" />
    <SystemModalMolecule v-bind="systemModalProps" />
  </ScuSpace>
</template>

<style lang="scss">
@use '@/styles/index.scss';

/* the main content is defined as scroll container so the scroll bar does not overlap the top-bar. */
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    height: 100%;
    overflow: auto;
  }
}
</style>
