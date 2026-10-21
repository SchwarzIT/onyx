<script lang="ts" setup>
definePageMeta({ layout: false });

const { t, locale } = useI18n();
const headline = computed(() => t("components.all"));
useHead({ title: headline });

const { navigation } = await useSidebarNavigation({
  collection: computed(() => `components_${locale.value}` as const),
});
</script>

<template>
  <NuxtLayout name="components">
    <template #hero>
      <PageContentHero
        :headline
        description="Explore all available components to build accessible, consistent, and high-quality user
      interfaces."
      />
    </template>

    <div class="sections">
      <section v-for="category in navigation" :key="category.path" class="section">
        <OnyxHeadline is="h2" show-as="h1" :hash="category.title">
          {{ category.title }}
        </OnyxHeadline>

        <div class="onyx-grid">
          <ComponentOverviewCard
            v-for="component in category.children"
            :key="component.path"
            :path="component.path"
            :title="component.title"
            class="onyx-grid-span-4 onyx-grid-lg-span-3"
          />
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.sections {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-4xl);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-md);
}
</style>
