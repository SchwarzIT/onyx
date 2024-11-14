<script lang="ts" setup>
import check from "@sit-onyx/icons/check.svg?raw";
import history from "@sit-onyx/icons/history.svg?raw";
import loadingDots from "@sit-onyx/icons/loading-dots.svg?raw";
import { OnyxIcon } from "sit-onyx";

export type ComponentStatus = "implemented" | "in-progress" | "planned";

const props = defineProps<{
  status: ComponentStatus;
  /** If true, a status label will be shown. */
  showLabel?: boolean;
}>();

const icons = {
  implemented: {
    icon: check,
    label: "Implemented",
  },
  "in-progress": {
    icon: loadingDots,
    label: "In progress",
  },
  planned: {
    icon: history,
    label: "Planned",
  },
} satisfies Record<ComponentStatus, { icon: string; label: string }>;
</script>

<template>
  <div class="status" :aria-label="props.showLabel ? undefined : icons[props.status].label">
    <div class="status__icon" :class="[`status__icon--${props.status}`]">
      <OnyxIcon :icon="icons[props.status].icon" size="16px" />
    </div>

    <span v-if="props.showLabel">{{ icons[props.status].label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--onyx-spacing-2xs);
  line-height: normal;

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--onyx-radius-full);
    color: var(--onyx-color-text-icons-neutral-intense);
    background-color: var(--onyx-color-base-neutral-200);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    &--implemented {
      color: var(--onyx-color-text-icons-success-intense);
      background-color: var(--onyx-color-base-success-200);
    }

    &--in-progress {
      color: var(--onyx-color-text-icons-warning-intense);
      background-color: var(--onyx-color-base-warning-200);
    }
  }
}
</style>
