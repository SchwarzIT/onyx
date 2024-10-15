<!-- Currently slot props are not supported by Playwright, so we need to provide a custom wrapper. See issue: https://github.com/microsoft/playwright/issues/18758 -->
<script lang="ts" setup>
import OnyxFormElement from "./OnyxFormElement.vue";
</script>
<template>
  <div>
    <OnyxFormElement label="Test">
      <template #default="{ id }">
        <input :id="id" />
      </template>
    </OnyxFormElement>
    <OnyxFormElement label="Test">
      <template #default="{ id }">
        <input :id="id" />
      </template>
    </OnyxFormElement>
  </div>
</template>
