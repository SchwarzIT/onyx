<script lang="ts" setup>
import logoUrl from '@/assets/logo.svg';
import config from '@/config';
import type { NavItemDefinition } from '@scu/core-ui/dist/types/components/scu-top-bar/types';
import { globe, login, logout, profile } from '@scu/icons';
import { ScuAvatar, ScuIcon, ScuLink, ScuTopBar, ScuTopBarContextDropdown, ScuTopBarUser } from '@scu/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  /** Currently selected application locale/language. */
  locale: keyof typeof config.i18n.locales;
  /** Nav items to display. */
  navItems?: NavItemDefinition[];
  /**
   * Username of the currently logged in user.
   * If unset, the user will be treated as logged out which displays a login action (instead of logout) and hides the user information in the fly out.
   */
  username?: string;
}>();

const emit = defineEmits<{
  /** triggered when a different application locale/language is selected. */
  'update:locale': [value: string];
  /** triggered when the back button is clicked. */
  backButtonClick: [];
  /** triggered when a navigation should be done (either by clicking a nav item or the app logo/name). */
  navigate: [route: string];
  /** triggered when the user is logged out and clicks the login action. */
  login: [];
  /** triggered when the user is logged in and clicks the logout action. */
  logout: [];
}>();

const { t } = useI18n();

/** Gets the formatted label for the current locale. */
const localeLabel = computed(() => {
  const [language, region = ''] = props.locale.toUpperCase().split('-');
  if (!region || language === region) return language;

  const hasOtherRegions =
    Object.keys(config.i18n.locales).filter((locale) => locale.toUpperCase().startsWith(language)).length > 1;

  return hasOtherRegions ? `${language} (${region})` : language;
});
</script>

<template>
  <ScuTopBar
    :app-icon-src="logoUrl"
    :app-name="config.app.name"
    :nav-items="props.navItems"
    :more-label="t('global.more')"
    show-back-button
    @scubackbuttonclick="emit('backButtonClick')"
    @scuhomenavigationclick="emit('navigate', '/')"
    @scunavitemclick="$event.detail.href && emit('navigate', $event.detail.href)"
  >
    <ScuTopBarContextDropdown slot="context-area" :icon="globe" :label="localeLabel" data-testid="language-dropdown">
      <ScuLink
        v-for="(languageName, languageLocale) in config.i18n.locales"
        :key="languageLocale"
        mode="list"
        :active="languageLocale === props.locale"
        @scuclick="emit('update:locale', languageLocale)"
      >
        {{ languageName }}
      </ScuLink>
    </ScuTopBarContextDropdown>

    <ScuTopBarUser
      slot="user-options"
      :icon="profile"
      :user-name="props.username ?? t('menu.login')"
      :hide-user-info="props.username == null"
      :app-version="t('menu.version', { version: config.app.version })"
    >
      <ScuAvatar slot="avatar" />

      <ScuLink v-if="props.username" mode="list" color="var(--sit-color-red)" @scuclick="emit('logout')">
        <ScuIcon :src="logout" />
        {{ t('menu.logout') }}
      </ScuLink>

      <ScuLink v-else mode="list" @scuclick="emit('login')">
        <ScuIcon :src="login" />
        {{ t('menu.login') }}
      </ScuLink>
    </ScuTopBarUser>
  </ScuTopBar>
</template>
