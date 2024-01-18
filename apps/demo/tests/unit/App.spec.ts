import App from '@/App.vue';
import TopBarOrganism from '@/components/organisms/TopBarOrganism.vue';
import { initializeI18n } from '@/i18n';
import { routes } from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

describe('App.vue', () => {
  let i18n: ReturnType<typeof initializeI18n>;
  let router: ReturnType<typeof createRouter>;

  beforeEach(() => {
    i18n = initializeI18n();
    router = createRouter({ history: createWebHistory(), routes });
  });

  it('renders', () => {
    const wrapper = createWrapper();
    expect(wrapper).toBeDefined();
  });

  describe('provides a log out option', () => {
    it('which triggers the log out via the auth store', async () => {
      const wrapper = createWrapper();
      const store = useAuthStore();

      const topBar = wrapper.findComponent(TopBarOrganism);
      await topBar.trigger('logout');
      expect(store.logout).toHaveBeenCalledTimes(1);
    });

    it('which navigates to the LoggedOutView if the current page is protected', async () => {
      Object.defineProperty(router.currentRoute.value, 'meta', {
        get: vi.fn(() => ({ requiresAuth: true })),
      });
      const wrapper = createWrapper();
      const pushSpy = vi.spyOn(router, 'push').mockResolvedValue();

      const topBar = wrapper.findComponent(TopBarOrganism);
      await topBar.trigger('logout');

      await nextTick();
      expect(pushSpy).toHaveBeenCalledTimes(1);
      expect(pushSpy).toHaveBeenCalledWith('/logged-out');
    });
  });

  const createWrapper = () =>
    mount(App, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), i18n, router],
        stubs: {
          RouterView: true,
          TopBarOrganism: true,
        },
      },
    });
});
