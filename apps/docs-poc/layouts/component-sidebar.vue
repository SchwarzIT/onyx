<script lang="ts" setup>
import { OnyxButton } from "sit-onyx";

const { data } = await useFetch("/api/components");
prerenderRoutes("/api/components");

data.value?.components.forEach((component) => {
  prerenderRoutes(`/api/components/${component}`);
});
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

    <slot></slot>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--onyx-spacing-4xs);
}
</style>
