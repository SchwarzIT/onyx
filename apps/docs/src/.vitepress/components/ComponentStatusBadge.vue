<script lang="ts" setup>
import { iconCircleArrowRight, iconCircleCheck, iconClock } from "@sit-onyx/icons";
import { OnyxIcon, type OnyxColor } from "sit-onyx";

export type ComponentStatus = "implemented" | "in-progress" | "planned";

const props = defineProps<{
  status: ComponentStatus;
  /** If true, a status label will be shown. */
  showLabel?: boolean;
}>();

const icons = {
  implemented: {
    icon: iconCircleCheck,
    label: "Implemented",
    color: "success",
  },
  "in-progress": {
    icon: iconCircleArrowRight,
    label: "In progress",
    color: "neutral",
  },
  planned: {
    icon: iconClock,
    label: "Planned",
    color: "warning",
  },
} satisfies Record<ComponentStatus, { icon: string; label: string; color: OnyxColor }>;
</script>

<template>
  <div class="status" :aria-label="props.showLabel ? undefined : icons[props.status].label">
    <OnyxIcon :icon="icons[props.status].icon" size="24px" :color="icons[props.status].color" />
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
}
</style>
