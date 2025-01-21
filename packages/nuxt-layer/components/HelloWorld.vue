<script setup lang="ts">
const { onyxDocs } = useAppConfig();
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <pre>{{ onyxDocs }}</pre>
  </div>
</template>
