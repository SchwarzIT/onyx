<script lang="ts" setup>
import { iconPlaceholder, iconPlus, iconX } from "@sit-onyx/icons";
import { OnyxButton, useGlobalFAB } from "sit-onyx";

const globalFAB = useGlobalFAB();

const addFAB = () => {
  const newId = globalFAB.items.value.length + 1;

  globalFAB.add({
    id: newId,
    label: `Option ${newId}`,
    icon: iconPlaceholder,
  });
};

const removeFAB = () => {
  const lastId = globalFAB.items.value.at(-1)?.value.id;
  if (lastId !== undefined) globalFAB.remove(lastId);
};
</script>

<template>
  <OnyxButton label="Add FAB" :icon="iconPlus" @click="addFAB" />
  <OnyxButton label="Remove FAB" :icon="iconX" @click="removeFAB" />
</template>
