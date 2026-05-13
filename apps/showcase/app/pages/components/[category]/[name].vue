<script lang="ts" setup>
definePageMeta({ layout: "components" });

const { locale } = useI18n();

const { data } = await useCollection({
  collection: computed(() => `components_${locale.value}` as const),
});

const activeTab = useRouteQuery("tab", "overview");
</script>

<template>
  <ProseH1>{{ data.title }}</ProseH1>

  <OnyxTabs v-model="activeTab" :label="$t('components.details')">
    <OnyxTab :label="$t('components.overview')" value="overview">
      <TableOfContentsLayout :toc="data.body.toc?.links ?? []">
        <ContentRenderer :value="data" />
      </TableOfContentsLayout>
    </OnyxTab>

    <OnyxTab :label="$t('components.property', 2)" value="properties">
      <ComponentMeta :component="data.componentName" />
    </OnyxTab>
  </OnyxTabs>
</template>
