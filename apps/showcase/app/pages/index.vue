<script lang="ts" setup>
const { t } = useI18n();

useHead({
  title: computed(() => t("home")),
});
</script>

<template>
  <OnyxHeadline is="h1">{{ $t("home") }}</OnyxHeadline>
</template>
