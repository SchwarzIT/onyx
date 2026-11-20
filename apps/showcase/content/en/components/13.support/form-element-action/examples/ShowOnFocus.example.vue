<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxInput, OnyxFormElementAction } from "sit-onyx";

const handleClick = () => {
  // implement your logic here...
};
</script>

<template>
  <OnyxInput label="Label" placeholder="Click or tab into this input">
    <template #trailingIcons>
      <OnyxFormElementAction
        label="Trigger custom action"
        :icon="iconPlaceholder"
        show-on-focus
        @click="handleClick"
      />
    </template>
  </OnyxInput>
</template>
