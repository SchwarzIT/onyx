<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxInput, OnyxUnstableFormElementAction } from "sit-onyx";

const handleClick = () => {
  // implement your logic here...
};
</script>

<template>
  <OnyxInput label="Label" placeholder="Placeholder" disable-slot-padding>
    <template #trailing>
      <OnyxUnstableFormElementAction
        label="Trigger custom action"
        :icon="iconPlaceholder"
        size="lg"
        @click="handleClick"
      />
    </template>
  </OnyxInput>
</template>
