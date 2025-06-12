<script lang="ts" setup>
import { OnyxToast, useThemeTransition } from "sit-onyx";
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { computed } from "vue";

const { Layout } = DefaultTheme;
const { isDark } = useData();
useThemeTransition(computed(() => (isDark.value ? "dark" : "light")));
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <OnyxToast />

      <footer class="footer">
        <p class="footer__message">Released under the Apache-2.0 License.</p>
        <p class="footer__copyright">Copyright © 2023-present Schwarz IT KG</p>
        <a class="footer__imprint" href="https://it.schwarz/impressum" target="_blank"> Imprint </a>
      </footer>
    </template>
  </Layout>
</template>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px;

  &__message,
  &__copyright,
  &__imprint {
    line-height: var(--onyx-font-line-height-md);
    font-size: 14px;
    font-weight: var(--onyx-font-weight-medium);
    color: var(--vp-c-text-2);
  }

  &__imprint {
    text-decoration: underline;
  }

  &__imprint:hover {
    color: var(--vp-c-text-3);
  }
}
</style>
