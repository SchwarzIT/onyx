<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxInput, OnyxUnstableFormElementAction } from "sit-onyx";

const handleClick = () => {
  // implement your logic here...
};
</script>

<template>
  <OnyxInput label="Label" placeholder="Click or tab into this input">
    <template #trailingIcons>
      <OnyxUnstableFormElementAction
        label="Trigger custom action"
        :icon="iconPlaceholder"
        show-on-focus
        @click="handleClick"
      />
    </template>
  </OnyxInput>
</template>
