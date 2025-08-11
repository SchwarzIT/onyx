<script lang="ts" setup>
import { ref } from "vue";
import OnyxAppLayout from "../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import type { OnyxNavItemProps } from "./modules/index.js";
import OnyxNavItem from "./modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxNavBar from "./OnyxNavBar.vue";

const items = ref<OnyxNavItemProps[]>([]);

function onChange() {
  items.value = [
    { label: "MenuItem Button" },
    { label: "MenuItem Link", link: "/link" },
    { label: "MenuItem Link", link: "/link" },
    { label: "MenuItem Link", link: "/link" },
    { label: "MenuItem Nested", link: "/link" },
  ];
}
</script>

<template>
  <OnyxAppLayout>
    <OnyxNavBar>
      <OnyxNavItem v-for="item in items" :key="item.label" v-bind="item" />
    </OnyxNavBar>

    <OnyxButton label="Load Async" @click="onChange()"> </OnyxButton>
  </OnyxAppLayout>
</template>
