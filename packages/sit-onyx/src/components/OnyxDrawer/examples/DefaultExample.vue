<script lang="ts" setup>
import { iconSettings } from "@sit-onyx/icons";
import { ref } from "vue";
import { OnyxBottomBar, OnyxButton, OnyxDrawer, OnyxIconButton } from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Open drawer" @click="isOpen = true" />

    <OnyxDrawer class="drawer" label="Example drawer" :open="isOpen" @close="isOpen = false">
      <template #description>
        Lorem ipsum dolor sit amet consectetur. Dui purus quisque est.
      </template>

      <div class="drawer__content">
        <span class="drawer__placeholder">
          Note: The drawer component is fully flexible. It can be adjusted with every content the
          project needs.
        </span>
      </div>

      <template #footer>
        <OnyxBottomBar density="compact">
          <OnyxIconButton label="Settings" :icon="iconSettings" color="neutral" />
          <OnyxButton label="Button" color="neutral" />
        </OnyxBottomBar>
      </template>
    </OnyxDrawer>
  </div>
</template>

<style lang="scss" scoped>
.drawer {
  width: 30rem;

  &__content {
    padding: var(--onyx-density-xl) var(--onyx-modal-dialog-padding-inline);
  }

  &__placeholder {
    color: var(--onyx-color-text-icons-info-intense);
    white-space: pre-line;
  }
}
</style>
