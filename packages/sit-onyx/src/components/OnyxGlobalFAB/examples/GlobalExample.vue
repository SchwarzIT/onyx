<script lang="ts" setup>
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";
import { useGlobalFAB } from "../../OnyxGlobalFAB/useGlobalFAB.js";
import OnyxGlobalFAB from "../OnyxGlobalFAB.vue";
const fabItems = useGlobalFAB();

let id = 1;
const addFAB = () => {
  fabItems.add({
    id: id,
    label: "New Item " + id,
    icon: placeholder,
  });
  id++;
};
const removeFAB = () => {
  if (fabItems.items.value.length) {
    const id = fabItems.items.value[fabItems.items.value.length - 1].id;
    fabItems.remove(id);
  }
};
</script>

<template>
  <div class="global-fab">
    <OnyxButton label="Add example FAB Option" @click="addFAB" />
    <OnyxButton label="Remove example FAB Option" @click="removeFAB" />
  </div>

  <OnyxGlobalFAB />
</template>

<style lang="scss" scoped>
.global-fab {
  display: flex;
  gap: 1rem;
}
</style>
