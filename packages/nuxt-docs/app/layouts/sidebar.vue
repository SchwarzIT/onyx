<script lang="ts" setup>
import { iconArrowSmallLeft } from "@sit-onyx/icons";
import type { OnyxPageLayoutProps, OnyxSidebarProps } from "sit-onyx";
import type { SidebarNavigationItem } from "../composables/useSidebarNavigation.js";

const props = defineProps<
  Omit<OnyxPageLayoutProps, "noPadding"> & {
    sidebar?: OnyxSidebarProps;
  }
>();

const slots = defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
  /**
   * Optional hero content above the page content + table of contents.
   */
  hero?(): unknown;
  /**
   * Page footer content.
   */
  footer?(): unknown;
  /**
   * Optional right sidebar.
   */
  sidebarRight?(): unknown;
  /**
   * Optionally override the main sidebar body content.
   */
  sidebarBody?(props: { items: SidebarNavigationItem[] }): unknown;
  /**
   * Optionally override the sidebar header content.
   * By default, a back button will be shown if a nested sidebar root is opened.
   */
  sidebarHeader?(): unknown;
  /**
   * Sidebar footer content.
   */
  sidebarFooter?(): unknown;
}>();

const { navigation, previousRootItem } = await useSidebarNavigation();

const collection = await useCollection();
const toc = computed(() => collection.data.value?.body.toc?.links ?? []);
</script>

<template>
  <OnyxPageLayout v-bind="props" no-padding>
    <template #sidebar>
      <OnyxSidebar
        class="sidebar"
        v-bind="props.sidebar"
        :label="$t('onyx.navigation.navigationHeadline')"
      >
        <template v-if="slots.sidebarHeader || previousRootItem" #header>
          <slot name="sidebarHeader">
            <OnyxButton
              v-if="previousRootItem"
              class="sidebar__back"
              :label="$t('onyx.back')"
              color="neutral"
              mode="plain"
              :link="previousRootItem.path"
              :icon="iconArrowSmallLeft"
            />
          </slot>
        </template>

        <slot name="sidebarBody" :items="navigation">
          <NestableSidebarItem v-for="item in navigation" :key="item.path" :item="item" />

          <OnyxEmpty v-if="!navigation.length" class="sidebar__empty">
            {{ $t("onyx.select.empty") }}
          </OnyxEmpty>
        </slot>

        <template v-if="!!slots.sidebarFooter" #footer>
          <slot name="sidebarFooter"></slot>
        </template>
      </OnyxSidebar>
    </template>

    <slot name="hero"></slot>

    <div class="content onyx-grid-layout">
      <div>
        <slot></slot>
      </div>

      <TableOfContents v-if="toc.length" class="content__toc" :links="toc" />
    </div>

    <template v-if="!!slots.footer" #footer>
      <slot name="footer"></slot>
    </template>

    <template v-if="!!slots.sidebarRight" #sidebarRight>
      <slot name="sidebarRight"></slot>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.sidebar {
  &__empty {
    max-width: 100%;
  }

  &__back {
    width: 100%;
    justify-content: flex-start;
  }
}

.content {
  /** Gap between page content and TOC. Equivalent to one grid column + 2 * grid gutter/gap */
  --onyx-content-toc-gap: calc(2 * var(--onyx-grid-gutter) + (100 / var(--onyx-grid-columns)) * 1%);
  display: grid;
  gap: var(--onyx-content-toc-gap);

  // see: https://storybook.onyx.schwarz/?path=/docs/navigation-tableofcontents--docs
  grid-template-columns: 1fr minmax(8rem, 15rem);

  &__toc {
    position: sticky;
    top: var(--onyx-grid-margin-vertical);
    height: calc(100vh - var(--onyx-nav-bar-height) - 2 * var(--onyx-grid-margin-vertical));
  }

  // hide TOC on smaller screens
  @include breakpoints.container(max, md) {
    grid-template-columns: 1fr;

    .content__toc {
      display: none;
    }
  }
}
</style>
