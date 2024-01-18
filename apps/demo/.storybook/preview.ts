import { applyPolyfills, defineCustomElements } from '@scu/core-ui/dist/loader';
import { ScuSpace } from '@scu/vue';
import { setup, type Preview } from '@storybook/vue3';
import { initializeI18n } from '../src/i18n';

import '@scu/core-ui/dist/schwarz-core-ui/schwarz-core-ui.css';
import '@sit/vue-core/style.css';
import '../src/styles/index.scss';

(async () => {
  // Initializing CoreUI
  await applyPolyfills();
  await defineCustomElements();
})();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['atoms', 'molecules', 'organisms', 'layouts', 'templates', 'views'],
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f8f8' },
        { name: 'dark', value: '#464646' },
      ],
    },
  },
  decorators: [
    (story) => ({
      components: { story, ScuSpace },
      template: `
        <ScuSpace scu-theme="schwarz" style="min-width: min-content">
          <story />
        </ScuSpace>`,
    }),
  ],
};

export default preview;

setup((app) => {
  const i18n = initializeI18n();
  app.use(i18n);
});
