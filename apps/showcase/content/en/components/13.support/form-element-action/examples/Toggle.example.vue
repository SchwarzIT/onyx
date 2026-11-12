<script lang="ts" setup>
import { iconCircleHelp } from "@sit-onyx/icons";
import { OnyxDialog, OnyxInput, OnyxUnstableFormElementAction } from "sit-onyx";
import { ref } from "vue";

const isHelpOpen = ref(false);
</script>

<template>
  <OnyxInput label="Label" placeholder="Placeholder" disable-slot-padding>
    <template #trailing>
      <OnyxDialog v-model:open="isHelpOpen" class="dialog" label="Help">
        <template #trigger="{ trigger }">
          <OnyxUnstableFormElementAction
            v-bind="trigger"
            v-model:pressed="isHelpOpen"
            label="Toggle help"
            :icon="iconCircleHelp"
            type="toggle"
            size="lg"
          />
        </template>

        <div class="dialog__content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur cumque
            enim deserunt officia nostrum nihil sit blanditiis quos. Ullam deleniti perferendis eum
            a! Mollitia veniam quae eaque facere voluptates.
          </p>
        </div>
      </OnyxDialog>
    </template>
  </OnyxInput>
</template>

<style lang="scss" scoped>
.dialog {
  &__content {
    padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
    width: 26rem;
  }
}
</style>
