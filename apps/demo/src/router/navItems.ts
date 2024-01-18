import type { T } from '@/i18n';
import type { useAuthStore } from '@/stores/authStore';
import type { NavItemDefinition } from '@scu/core-ui/dist/types/components/scu-top-bar/types';
import { computed, type ComputedRef } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getNavBarItems(t: T, authStore: ReturnType<typeof useAuthStore>): ComputedRef<NavItemDefinition[]> {
  // authStore can optionally be used to show/hide nav items depending on the current user
  return computed(() => [{ label: t('pages.home.pageName'), href: '/' }]);
}
