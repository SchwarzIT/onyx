<script lang="ts" setup>
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";
import { useGlobalFAB } from "../../OnyxGlobalFAB/useGlobalFAB.js";
import OnyxGlobalFAB from "../OnyxGlobalFAB.vue";

const globalFAB = useGlobalFAB();
let id = 0;

const addFAB = () => {
  globalFAB.add({
    id: id++,
    label: "New Item",
    icon: placeholder,
  });
};

const removeFAB = () => {
  const lastId = globalFAB.items.value.at(-1)?.value.id;
  if (lastId !== undefined) globalFAB.remove(lastId);
};
</script>

<template>
  <div>
    <div class="actions">
      <OnyxButton label="Add example FAB Option" @click="addFAB" />
      <OnyxButton label="Remove example FAB Option" @click="removeFAB" />
    </div>

    <OnyxGlobalFAB />
  </div>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  gap: var(--onyx-density-md);
  flex-wrap: wrap;
}
</style>
