<script lang="ts" setup>
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";
import { useGlobalFAB } from "../../OnyxGlobalFAB/useGlobalFAB.js";
import OnyxGlobalFAB from "../OnyxGlobalFAB.vue";
const fabItems = useGlobalFAB();

let id = 1;
const addFAB = () => {
  fabItems.add({
    id: id++,
    label: "New Item " + id,
    icon: placeholder,
  });
};
const removeFAB = () => {
  if (fabItems.items.value.length) {
    const lastId = fabItems.items.value.at(-1)?.id;
    if (lastId !== undefined) fabItems.remove(lastId);
  }
};
</script>

<template>
  <div class="actions">
    <OnyxButton label="Add example FAB Option" @click="addFAB" />
    <OnyxButton label="Remove example FAB Option" @click="removeFAB" />
  </div>

  <OnyxGlobalFAB />
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  gap: var(--onyx-density-md);
  flex-wrap: wrap;
}
</style>
