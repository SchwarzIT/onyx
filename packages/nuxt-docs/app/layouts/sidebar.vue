<script lang="ts" setup>
import type { OnyxPageLayoutProps, OnyxSidebarProps } from "sit-onyx";
import type { SidebarNavigationItem } from "../composables/useSidebarNavigation.js";

const props = defineProps<
  OnyxPageLayoutProps & {
    sidebar?: OnyxSidebarProps;
  }
>();

const slots = defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
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
   */
  sidebarHeader?(): unknown;
  /**
   * Sidebar footer content.
   */
  sidebarFooter?(): unknown;
}>();

const { navigation } = await useSidebarNavigation();
</script>

<template>
  <OnyxPageLayout v-bind="props">
    <template #sidebar>
      <OnyxSidebar
        class="sidebar"
        v-bind="props.sidebar"
        :label="$t('onyx.navigation.navigationHeadline')"
      >
        <template v-if="slots.sidebarHeader" #header>
          <slot name="sidebarHeader"> </slot>
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

    <slot></slot>

    <template v-if="!!slots.footer" #footer>
      <slot name="footer"></slot>
    </template>

    <template v-if="!!slots.sidebarRight" #sidebarRight>
      <slot name="sidebarRight"></slot>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.content {
  white-space: pre-line;
}

.sidebar {
  &__empty {
    max-width: 100%;
  }
}
</style>
