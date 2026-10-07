<script setup lang="ts">
import { OnyxAppLayout, OnyxLink, OnyxPageLayout } from "sit-onyx";

const currentYear = new Date().getFullYear();
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout no-padding>
      <div class="onyx-grid-layout">
        <!-- using "onyx-grid-layout" because we add "no-padding" on the page layout so the footer can be full width -->
        Place your main page content here...
      </div>

      <footer class="footer">
        <!-- we are using the "onyx-grid-layout" class here to sync the footer with the global application max-width, alignment and horizontal padding -->
        <div class="footer__content onyx-grid-layout">
          <div class="footer__brand">© {{ currentYear }} Example Brand Name</div>

          <div class="footer__links">
            <OnyxLink href="#">Link</OnyxLink>
            <OnyxLink href="#">Link</OnyxLink>
          </div>
        </div>
      </footer>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.footer {
  border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);

  &__content {
    padding-block: var(--onyx-density-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--onyx-density-md);
    font-size: var(--onyx-font-size-sm);
    line-height: var(--onyx-font-line-height-sm);
  }

  &__links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--onyx-density-sm);
  }
}
</style>
