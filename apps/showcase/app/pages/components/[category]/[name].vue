<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import SidebarLayout from "~/layouts/sidebar.vue";

definePageMeta({ layout: false });

const { locale } = useI18n();
const route = useRoute();

const slug = computed(() => `/components/${route.params.category}/${route.params.name}`);

const collection = await useAsyncData(
  () => `page-${slug.value}-${locale.value}`,
  async () => {
    const collection = `content_${locale.value}` as const;
    return queryCollection(collection).path(slug.value).first();
  },
);

watch(
  () => collection.data.value,
  (data) => {
    // if data is "null", the page content was not found. "undefined" means it is not loaded yet
    if (data) return;
    throw showError({
      message: "Page not found",
      statusCode: 404,
    });
  },
  { immediate: true },
);

const data = computed(() => collection.data.value);

useSeoMeta({
  title: computed(() => collection.data.value?.seo.title),
  description: computed(() => collection.data.value?.seo.description),
});

const activeTab = useRouteQuery("tab", "overview");
</script>

<template>
  <SidebarLayout hide-hero>
    <ProseH1>{{ data?.title }}</ProseH1>

    <OnyxTabs v-model="activeTab" :label="$t('components.details')">
      <OnyxTab :label="$t('components.overview')" value="overview">
        <!-- eslint-disable-next-line vue/no-root-v-if  -- the v-if here is theoretically not needed because we throw above it ifs undefined so the user will be redirected to the error page. However, there is still a console warning so we include the v-if here to prevent it. -->
        <ContentRenderer v-if="data" :value="data" />
      </OnyxTab>

      <OnyxTab v-if="data?.componentName" :label="$t('components.property', 2)" value="properties">
        <ComponentMeta :component="data.componentName" />
      </OnyxTab>
    </OnyxTabs>
  </SidebarLayout>
</template>
