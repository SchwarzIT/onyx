import { initializeI18n } from '@/i18n';
import { useAuthStore } from '@/stores/authStore';
import LoggedOutView from '@/views/LoggedOutView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('LoggedOutView', () => {
  let i18n: ReturnType<typeof initializeI18n>;
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ createSpy: vi.fn }));
    i18n = initializeI18n();
    authStore = useAuthStore();
  });

  it('renders', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('returns to the previous page when the login button is clicked', async () => {
    const wrapper = createWrapper();
    const loginSpy = vi.spyOn(authStore, 'login');
    const loginButton = wrapper.findComponent('[data-testid="login-button"]');

    await loginButton.trigger('click');
    expect(loginSpy).toHaveBeenCalledWith('/');
  });

  const createWrapper = () => {
    return mount(LoggedOutView, {
      global: {
        plugins: [i18n],
      },
    });
  };
});
