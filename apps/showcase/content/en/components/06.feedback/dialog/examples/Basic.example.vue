<script lang="ts" setup>
import { OnyxBottomBar, OnyxButton, OnyxDialog } from "sit-onyx";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <OnyxDialog v-model:open="isOpen" class="dialog" label="Example dialog">
    <template #trigger="{ trigger }">
      <OnyxButton label="Show dialog" v-bind="trigger" />
    </template>

    <div class="dialog__content">
      Note: The dialog component is fully flexible. It can be adjusted with any content.
    </div>

    <template #footer>
      <OnyxBottomBar hide-border>
        <OnyxButton label="Close" color="neutral" mode="plain" @click="isOpen = false" />
        <OnyxButton label="Save" @click="isOpen = false" />
      </OnyxBottomBar>
    </template>
  </OnyxDialog>
</template>

<style lang="scss" scoped>
.dialog {
  &__content {
    padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
    color: var(--onyx-color-text-icons-info-intense);
  }
}
</style>
