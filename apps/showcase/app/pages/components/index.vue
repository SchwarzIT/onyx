<script lang="ts" setup>
definePageMeta({ layout: false });

const { t } = useI18n();
const headline = computed(() => t("components.all"));
useHead({ title: headline });

const { navigation } = await useComponentsNavigation();
const { getFilteredComponents } = useComponentSearch();
const filteredNavigation = computed(() => getFilteredComponents.value(navigation.value));

const title = computed(() => t("components.component", 2));
const description = computed(() => t("components.description"));

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

const isCategoryVisible = computed(() => {
  return (path: string) => filteredNavigation.value.some((i) => i.path === path);
});
const isComponentVisible = computed(() => {
  return (path: string) => {
    return filteredNavigation.value.some((i) => i.children?.some((c) => c.path === path));
  };
});
</script>

<template>
  <NuxtLayout name="components">
    <template #hero>
      <PageContentHero :headline :description />
    </template>

    <div class="sections">
      <!-- 
          We are using v-show here instead of v-if to improve rendering performance during search.
          It also fixes a bug that the sidebar search loses focus when dialog/modal components are re-rendered since the browsers
          performs autofocus inside them automatically
      -->
      <section
        v-for="category in navigation"
        v-show="isCategoryVisible(category.path)"
        :key="category.path"
        class="section"
      >
        <OnyxHeadline is="h2" show-as="h1" :hash="category.title">
          {{ category.title }}
        </OnyxHeadline>

        <div class="onyx-grid">
          <ComponentOverviewCard
            v-for="component in category.children"
            v-show="isComponentVisible(component.path)"
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
