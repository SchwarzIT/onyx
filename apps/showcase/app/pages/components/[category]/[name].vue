<script lang="ts" setup>
import { iconCircleAttention, iconTestTube } from "@sit-onyx/icons";

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
    <div class="content">
      <div class="headline">
        <OnyxHeadline is="h1">{{ data.title }}</OnyxHeadline>
        <ComponentStatusTag v-if="data.status" :status="data.status" />
      </div>

      <OnyxInfoCard
        v-if="data.status === 'beta'"
        :headline="$t('components.status.beta.label')"
        :icon="iconTestTube"
      >
        <i18n-t keypath="components.status.beta.description">
          <template #changelog>
            <OnyxLink href="/introduction/changelog">
              {{ $t("components.status.beta.changelog") }}
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
        </OnyxTab>

        <OnyxTab :label="$t('components.property', 2)" value="properties">
          <ComponentMeta :component="data.componentName" />
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
