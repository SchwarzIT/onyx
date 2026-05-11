<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import SidebarLayout from "~/layouts/sidebar.vue";

definePageMeta({ layout: false });

const route = useRoute();
const slug = computed(() => `/components/${route.params.category}/${route.params.name}`);

const collectionOptions: UseCollectionOptions = { slug };
const { data } = await useCollection(collectionOptions);

const activeTab = useRouteQuery("tab", "overview");
</script>

<template>
  <SidebarLayout hide-hero :collection-options>
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
