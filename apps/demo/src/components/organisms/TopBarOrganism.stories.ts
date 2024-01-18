import config from '@/config';
import type { Props } from '@sit/vue-core';
import type { Meta, StoryObj } from '@storybook/vue3';
import Component from './TopBarOrganism.vue';

type Args = Props<typeof Component>;

export default {
  component: Component,
  argTypes: {
    onBackButtonClick: { action: 'backButtonClick' },
    onLogin: { action: 'login' },
    onLogout: { action: 'logout' },
    onNavigate: { action: 'navigate' },
    'onUpdate:locale': { action: 'update:locale' },
  },
} as Meta<Args>;

export const Primary = {
  args: {
    locale: Object.keys(config.i18n.locales)[0],
    username: 'John Doe',
    navItems: [
      { label: 'Home', href: '/home' },
      {
        label: 'Test',
        href: '/test',
        children: [
          { label: 'Nested 1', href: '/test/1', active: true },
          { label: 'Nested 2', href: '/test/2' },
        ],
      },
    ],
  },
} satisfies StoryObj<Args>;

export const WithoutUser = {
  args: {
    ...Primary.args,
    username: undefined,
  },
} satisfies StoryObj<Args>;
