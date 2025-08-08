<script setup lang="ts">
import type { OnyxNavBarProps, OnyxNavBarSlots } from "sit-onyx";
import ColorSchemeSwitch from "./ColorSchemeSwitch.vue";

const props = withDefaults(defineProps<OnyxNavBarProps>(), {
  appName: "Documentation",
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
        <!-- using lazy here so the locale switch code is not loaded when only one locale exists -->
        <LazyLocaleSwitch v-if="locales.length > 1" />
        <ColorSchemeSwitch />
      </slot>
    </template>
  </OnyxNavBar>
</template>
