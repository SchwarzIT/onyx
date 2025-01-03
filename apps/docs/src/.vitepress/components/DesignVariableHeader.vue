<script lang="ts" setup>
import { OnyxButton, OnyxHeadline, createHeadlineHash } from "sit-onyx";

const props = defineProps<{
  /** Headline to show on the left side of the header. */
  headline?: string;
  /** Available tab buttons. Active tab can be set with the `modelValue` property. */
  tabs?: readonly string[];
  /** Currently active tab. */
  modelValue?: string;
}>();

const emit = defineEmits<{
  /** emitted when the user selects a tab. */
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div class="header vp-raw">
    <OnyxHeadline
      is="h3"
      v-if="props.headline"
      class="header__headline"
      :hash="createHeadlineHash(props.headline)"
    >
      {{ props.headline }}
    </OnyxHeadline>

    <div>
      <OnyxButton
        v-for="tab in props.tabs"
        :key="tab"
        :label="tab"
        mode="plain"
        :color="props.modelValue === tab ? 'primary' : 'neutral'"
        density="compact"
        @click="emit('update:modelValue', tab)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: var(--onyx-spacing-2xs);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__headline {
    margin: 0;
  }

  &:has(&__headline) {
    justify-content: space-between;
  }
}
</style>
