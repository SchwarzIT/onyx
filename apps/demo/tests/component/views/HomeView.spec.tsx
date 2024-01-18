import HomeView from '@/views/HomeView.vue';
import { expect, test } from '@playwright/experimental-ct-vue';

test.describe('HomeView', () => {
  test('should contain hello world', async ({ mount }) => {
    const component = await mount(<HomeView />);
    await expect(component).toContainText('Hello World');
  });
});
