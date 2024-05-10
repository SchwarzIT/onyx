<script lang="ts" setup>
import { OnyxButton } from "sit-onyx";

definePageMeta({
  layout: false,
});

const { data } = await useFetch("/api/components");
</script>

<template>
  <NuxtLayout name="default">
    <template #sidebar>
      <div class="sidebar">
        <OnyxButton
          v-for="component in data?.components"
          :key="component"
          :label="component"
          :variation="$route.params.name === component ? 'primary' : 'secondary'"
          mode="plain"
          density="compact"
          @click="$router.push(`/components/${component}`)"
        />
      </div>
    </template>

    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: var(--onyx-spacing-md);
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  height: 100%;
  max-width: 24rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--onyx-spacing-4xs);
}
</style>
