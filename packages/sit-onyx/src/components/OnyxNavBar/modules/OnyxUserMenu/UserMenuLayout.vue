<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
// this layout component is only used internally for the user menu component
// to easily switch between mobile and desktop layout
import { injectI18n } from "../../../../i18n";
import type { SelectOptionValue } from "../../../../types";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";

const props = defineProps<{ isMobile: boolean }>();

const slots = defineSlots<{
  button?(): unknown;
  header?(): unknown;
  options?(): unknown;
  footer?(): unknown;
}>();

const { t } = injectI18n();
</script>

<template>
  <div>
    <template v-if="props.isMobile">
      <slot name="header"></slot>
      <slot name="options"></slot>
      <slot name="footer"></slot>
    </template>

    <template v-else>
      <OnyxFlyoutMenu :label="t('navigation.userMenuLabel')">
        <slot name="button"></slot>

        <template #header>
          <slot name="header"></slot>
        </template>

        <template #options>
          <slot name="options"></slot>
        </template>

        <template v-if="!!slots.footer" #footer>
          <slot name="footer"></slot>
        </template>
      </OnyxFlyoutMenu>
    </template>
  </div>
</template>
