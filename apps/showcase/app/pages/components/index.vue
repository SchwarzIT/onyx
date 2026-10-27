<script lang="ts" setup>
definePageMeta({ layout: false });

const { t } = useI18n();
const headline = computed(() => t("components.all"));
useHead({ title: headline });

const { navigation } = await useComponentsNavigation();

const title = computed(() => t("components.component", 2));
const description = computed(() => t("components.description"));

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>

<template>
  <NuxtLayout name="components">
    <template #hero>
      <PageContentHero :headline :description />
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
