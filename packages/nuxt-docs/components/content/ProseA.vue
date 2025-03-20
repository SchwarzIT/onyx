<script lang="ts" setup>
import type { LinkTarget } from "sit-onyx";

const props = withDefaults(
  defineProps<{
    href?: string;
    target?: LinkTarget;
  }>(),
  {
    href: "",
  },
);

defineSlots<{
  default(): unknown;
}>();

// needed to show external link icon only on mounted to prevent hydration errors
const isMounted = ref(false);
onMounted(() => (isMounted.value = true));
</script>

<template>
  <OnyxLink v-bind="props" :with-external-icon="isMounted ? 'auto' : false">
    <slot></slot>
  </OnyxLink>
</template>
