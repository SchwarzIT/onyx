<script lang="ts" setup>
import { iconCheese, iconChocolate, iconCookie, iconLoafBread } from "@sit-onyx/icons";
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>();

const options = [
  { label: "Bread", value: "bread", icon: iconLoafBread, group: "Breakfast" },
  { label: "Cheese", value: "cheese", icon: iconCheese, group: "Breakfast" },
  { label: "Chocolate", value: "chocolate", icon: iconChocolate, group: "Snacks" },
  { label: "Cookie", value: "cookie", icon: iconCookie, group: "Snacks" },
] satisfies SelectOption[];
</script>

<template>
  <OnyxSelect v-model="value" label="Example label" list-label="Available options" :options />
</template>
