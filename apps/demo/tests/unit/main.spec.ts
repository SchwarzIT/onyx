import AppVue from '@/App.vue';
import config from '@/config';
import * as i18n from '@/i18n';
import { setupApp } from '@/main';
import { useAuthStore } from '@/stores/authStore';
import { applyPolyfills, defineCustomElements } from '@scu/core-ui/dist/loader';
import * as vueCore from '@sit/vue-core';
import { describe, expect, it, vi } from 'vitest';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

vi.mock('vue', async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();

  return {
    ...actual,
    // mocked methods
    createApp: vi.fn(() => {
      const app = actual.createApp({});
      app.mount = vi.fn();
      return app;
    }),
  };
});

vi.mock('@/stores/authStore', async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();

  return {
    ...actual,
    // mocked methods
    useAuthStore: vi.fn(() => {
      const store = actual.useAuthStore();
      store.login = vi.fn();
      return store;
    }),
  };
});

vi.mock('@scu/core-ui/dist/loader', async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();

  return {
    ...actual,
    // mocked methods
    applyPolyfills: vi.fn(),
    defineCustomElements: vi.fn(),
  };
});

vi.mock('vue-router', async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();

  return {
    ...actual,
    // mocked methods
    createRouter: vi.fn((options) => {
      const router = (actual.createRouter as typeof createRouter)({ ...options, scrollBehavior: undefined });
      router.beforeEach = vi.fn();
      router.isReady = vi.fn();
      return router;
    }),
    createWebHistory: vi.fn(actual.createWebHistory),
  };
});

vi.mock('@sit/vue-core', async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();
  return {
    // resolves error: "Cannot redefine property: createOAuthLoginGuard"
    ...actual,
  };
});

describe('main.ts', () => {
  const i18nConfig: (typeof config)['i18n'] = {
    locales: {
      test1: 'Test 1',
      test2: 'Test 2',
    },
  };
  config.i18n = i18nConfig;
  config.app.baseUrl = 'testBaseUrl';

  it('creates and mounts vue app', async () => {
    const app = await setupApp();

    expect(createApp).toHaveBeenCalledWith(AppVue);
    expect(app.mount).toHaveBeenCalled();
  });

  it('sets up CoreUI', async () => {
    await setupApp();

    expect(applyPolyfills).toHaveBeenCalled();
    expect(defineCustomElements).toHaveBeenCalled();
  });

  it('sets up i18n with user preferred locale', async () => {
    const createI18nSpy = vi.spyOn(i18n, 'initializeI18n');
    const getUserPreferredLocaleSpy = vi.spyOn(i18n, 'getUserPreferredLocale').mockReturnValue('testLocale');
    const changeLocaleSpy = vi.spyOn(i18n, 'changeLocale');

    await setupApp();

    expect(createI18nSpy).toHaveBeenCalledOnce();
    expect(getUserPreferredLocaleSpy).toHaveBeenCalled();
    expect(changeLocaleSpy).toHaveBeenCalledWith('testLocale', false);
  });

  it('sets up i18n without user preferred locale', async () => {
    const createI18nSpy = vi.spyOn(i18n, 'initializeI18n');
    const getUserPreferredLocaleSpy = vi.spyOn(i18n, 'getUserPreferredLocale').mockReturnValue(undefined);
    const changeLocaleSpy = vi.spyOn(i18n, 'changeLocale');

    await setupApp();

    expect(createI18nSpy).toHaveBeenCalledOnce();
    expect(getUserPreferredLocaleSpy).toHaveBeenCalled();
    expect(changeLocaleSpy).not.toHaveBeenCalled();
  });

  it('sets up router when auth is disabled', async () => {
    const createLoginGuardSpy = vi.spyOn(vueCore, 'createOAuthLoginGuard');
    const createAuthorizationGuardSpy = vi.spyOn(vueCore, 'createAuthorizationGuard');

    config.auth.disabled = true;

    await setupApp();

    expect(createWebHistory).toHaveBeenCalledWith('testBaseUrl');
    expect(createRouter).toHaveBeenCalled();
    expect(createLoginGuardSpy).not.toHaveBeenCalled();
    expect(createAuthorizationGuardSpy).not.toHaveBeenCalled();
  });

  it('sets up router when auth is enabled', async () => {
    const createLoginGuardSpy = vi.spyOn(vueCore, 'createOAuthLoginGuard');
    const createAuthorizationGuardSpy = vi.spyOn(vueCore, 'createAuthorizationGuard');

    config.auth.disabled = false;

    await setupApp();

    expect(createWebHistory).toHaveBeenCalledWith('testBaseUrl');
    expect(createRouter).toHaveBeenCalled();

    const authStore = useAuthStore();
    expect(createLoginGuardSpy).toHaveBeenCalledWith({ authStore });
    expect(createAuthorizationGuardSpy).toHaveBeenCalledWith({ authStore });
  });
});
