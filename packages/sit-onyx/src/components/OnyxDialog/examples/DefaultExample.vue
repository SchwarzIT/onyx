<script lang="ts" setup>
import { ref } from "vue";
import { OnyxBottomBar, OnyxButton } from "../../../index.js";
import OnyxDialog from "../OnyxDialog.vue";

const isOpen = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show Dialog" @click="isOpen = true" />

    <OnyxDialog v-model:open="isOpen" label="Example dialog">
      <div class="main">
        <span class="main__description">
          Note: The Dialog component is fully flexible. It can be adjusted with every content the
          project needs.
        </span>
      </div>

      <template #footer>
        <OnyxBottomBar hide-border>
          <OnyxButton label="Close" color="neutral" mode="plain" @click="isOpen = false" />
          <OnyxButton label="Save" @click="isOpen = false" />
        </OnyxBottomBar>
      </template>
    </OnyxDialog>
  </div>
</template>

<style lang="scss" scope>
.main {
  padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);

  &__description {
    color: var(--onyx-color-text-icons-info-intense);
    white-space: pre-line;
  }
}
</style>
