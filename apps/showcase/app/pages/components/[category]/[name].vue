<script lang="ts" setup>
import type { TocLink } from "@nuxtjs/mdc";
import { iconCircleAttention, iconTestTube } from "@sit-onyx/icons";

definePageMeta({ layout: "components" });

const { locale } = useI18n();

const { data, error } = await useCollection({
  collection: computed(() => `components_${locale.value}` as const),
});

useSeoMeta({
  title: () => data.value?.seo.title,
  description: () => data.value?.seo.description,
});

const activeTab = useRouteQuery("tab", "overview");

const supportComponents = computed(() => data.value?.supportComponents ?? []);

const supportComponentsTocItem: TocLink = {
  id: "support-components",
  text: "Support Components",
  depth: 2,
};

const toc = computed(() => {
  const items = data.value?.body.toc?.links.slice() ?? [];
  if (supportComponents.value.length) {
    items.push(supportComponentsTocItem);
  }
  return items;
});
</script>

<template>
  <OnyxError v-if="error" :error />

  <TableOfContentsLayout v-else-if="data" :toc :hidden="activeTab !== 'overview'">
    <div class="content">
      <div class="headline">
        <OnyxHeadline is="h1">{{ data.title }}</OnyxHeadline>
        <ComponentStatusTag v-if="data.status" :status="data.status" />
      </div>

      <OnyxInfoCard
        v-if="data.status === 'experimental'"
        :headline="$t('components.status.experimental.label')"
        :icon="iconTestTube"
      >
        <i18n-t keypath="components.status.experimental.description" scope="global">
          <template #changelog>
            <OnyxLink href="/docs/getting-started/changelog">
              {{ $t("components.status.experimental.changelog") }}
            </OnyxLink>
          </template>
        </i18n-t>
      </OnyxInfoCard>

      <OnyxInfoCard
        v-else-if="data.status === 'deprecated'"
        :headline="$t('components.status.deprecated.label')"
        :icon="iconCircleAttention"
        color="danger"
      >
        {{ $t("components.status.deprecated.description") }}
      </OnyxInfoCard>

      <OnyxTabs v-model="activeTab" :label="$t('components.details')">
        <OnyxTab :label="$t('components.overview')" value="overview">
          <ContentRenderer :value="data" />

          <template v-if="supportComponents.length">
            <ProseH2 :id="supportComponentsTocItem.id">{{ supportComponentsTocItem.text }}</ProseH2>

            <ProseP>
              Find a list of support components related to the "{{ data.title }}" component. They
              are designed to build up the parent component rather than be used standalone.
            </ProseP>

            <div class="onyx-grid">
              <ComponentOverviewCard
                v-for="supportComponent in supportComponents"
                :key="supportComponent.path"
                class="onyx-grid-span-4"
                v-bind="supportComponent"
              />
            </div>
          </template>
        </OnyxTab>

        <OnyxTab v-if="data.componentName" :label="$t('components.property', 2)" value="properties">
          <ComponentMeta :component="data.componentName" :package="data.package" />
        </OnyxTab>
      </OnyxTabs>
    </div>
  </TableOfContentsLayout>
</template>

<style lang="scss" scoped>
.headline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--onyx-density-md);
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-lg);
}
</style>
