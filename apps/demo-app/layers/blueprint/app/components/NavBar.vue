<script lang="ts" setup>
import type { OnyxNavBarProps, OnyxNavBarSlots } from "sit-onyx";

const props = withDefaults(defineProps<OnyxNavBarProps>(), {
  logoUrl: "/favicon.svg",
  withBackButton: true,
  // Vue defaults booleans to false so this explicit "undefined" is needed to correctly set the default breakpoint
  mobile: undefined,
});

const slots = defineSlots<OnyxNavBarSlots>();

const localePath = useLocalePath();
</script>

<template>
  <OnyxNavBar
    v-bind="props"
    :app-area="props.appArea ?? { link: localePath('/') }"
    @navigate-back="$router.back"
  >
    <!-- eslint-disable vue/require-explicit-slots -- slots type is imported from onyx but eslint does not seem to be able to handle this -->
    <template v-if="slots.appArea" #appArea>
      <slot name="appArea"></slot>
    </template>

    <slot></slot>

    <template v-if="slots.globalContextArea" #globalContextArea>
      <slot name="globalContextArea"></slot>
    </template>

    <template v-if="slots.mobileActivePage" #mobileActivePage>
      <slot name="mobileActivePage"></slot>
    </template>

    <template #contextArea>
      <slot name="contextArea">
        <ColorSchemeSwitch />
        <LocaleSwitch />
      </slot>
    </template>
    <!-- eslint-enable vue/require-explicit-slots -->
  </OnyxNavBar>
</template>
