<script lang="ts" setup>
const { theme } = useSchwarzTheme();
</script>

<template>
  <div>
    <OnyxHeadline is="h1">Hello World</OnyxHeadline>

    <p>Active theme: {{ theme }}</p>
  </div>
</template>
