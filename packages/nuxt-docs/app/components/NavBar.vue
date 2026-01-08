<script setup lang="ts">
import type { OnyxNavBarProps, OnyxNavBarSlots } from "sit-onyx";
import ColorSchemeSwitch from "./ColorSchemeSwitch.vue";

const props = withDefaults(defineProps<OnyxNavBarProps>(), {
  appName: "Documentation",
  // Vue defaults booleans to false so this explicit "undefined" is needed to correctly set the default breakpoint
  mobile: undefined,
});

const slots = defineSlots<OnyxNavBarSlots>();

const router = useRouter();
const { locales } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <OnyxNavBar
    v-bind="props"
    :app-area="props.appArea ?? { link: localePath('/') }"
    @navigate-back="router.back"
  >
    <!-- eslint-disable vue/require-explicit-slots -- slots type is imported from onyx but eslint does not seem to be able to handle this -->
    <template v-if="slots.appArea" #appArea>
      <slot name="appArea"></slot>
    </template>

    <slot></slot>

    <template #globalContextArea>
      <slot name="globalContextArea">
        <GlobalSearch />
      </slot>
    </template>

    <template v-if="slots.mobileActivePage" #mobileActivePage>
      <slot name="mobileActivePage"></slot>
    </template>

    <template #contextArea>
      <slot name="contextArea">
        <!-- using lazy here so the locale switch code is not loaded when only one locale exists -->
        <LazyLocaleSwitch v-if="locales.length > 1" />
        <ColorSchemeSwitch />
      </slot>
    </template>
    <!-- eslint-enable vue/require-explicit-slots -->
  </OnyxNavBar>
</template>
