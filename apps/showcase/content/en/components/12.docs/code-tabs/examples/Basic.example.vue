<script lang="ts" setup>
import { iconBrowserTerminal } from "@sit-onyx/icons";
import { OnyxCodeTab, OnyxCodeTabs } from "sit-onyx";
import { ref } from "vue";

const selectedTab = ref("tab-1");
</script>

<template>
  <OnyxCodeTabs v-model="selectedTab" label="Example code snippets">
    <OnyxCodeTab
      code="export function sayHello(message: string) {
  console.log(message);
}"
      label="index.ts"
      language="ts"
      value="tab-1"
    />

    <OnyxCodeTab
      code=".some-class {
  color: var(--onyx-color-text-icons-neutral-intense);
}"
      label="style.css"
      language="css"
      value="tab-2"
    />

    <OnyxCodeTab
      code='<script lang="ts" setup>
import { ref } from "vue";

const message = ref("Hello World");
</script>

<template> {{ message }} </template>'
      :icon="iconBrowserTerminal"
      label="Component.vue"
      language="vue"
      value="tab-3"
    />
  </OnyxCodeTabs>
</template>
