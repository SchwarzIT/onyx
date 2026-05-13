<script lang="ts" setup>
definePageMeta({ layout: "components" });

const { locale } = useI18n();

const { data } = await useCollection({
  collection: computed(() => `components_${locale.value}` as const),
});

const activeTab = useRouteQuery("tab", "overview");
</script>

<!-- eslint-disable-next-line vue/no-root-v-if  -- The "useCollection" will already redirect to the error page when the data is undefined but the data might still be undefined while e.g. switching to another page -->
<template>
  <TableOfContentsLayout
    v-if="data"
    :toc="data.body.toc?.links ?? []"
    :hidden="activeTab !== 'overview'"
  >
    <ProseH1>{{ data.title }}</ProseH1>

    <OnyxTabs v-model="activeTab" :label="$t('components.details')">
      <OnyxTab :label="$t('components.overview')" value="overview">
        <ContentRenderer :value="data" />
      </OnyxTab>

      <OnyxTab :label="$t('components.property', 2)" value="properties">
        <ComponentMeta :component="data.componentName" />
      </OnyxTab>
    </OnyxTabs>
  </TableOfContentsLayout>
</template>
