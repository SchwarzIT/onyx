import { initializeI18n } from '@/i18n';
import { routes } from '@/router';
import ErrorView from '@/views/ErrorView.vue';
import type { Props } from '@sit/vue-core';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

describe('ErrorView', () => {
  let i18n: ReturnType<typeof initializeI18n>;
  let router: ReturnType<typeof createRouter>;

  beforeEach(() => {
    i18n = initializeI18n();
    router = createRouter({ history: createWebHistory(), routes });
  });

  it('renders', () => {
    const wrapper = createWrapper({});
    expect(wrapper.exists()).toBeTruthy();
  });

  const createWrapper = (props: Props<typeof ErrorView>) => {
    return mount(ErrorView, {
      props,
      global: {
        plugins: [i18n, router],
      },
    });
  };
});
