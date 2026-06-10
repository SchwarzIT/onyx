<script lang="ts" setup>
import { normalizedIncludes } from "sit-onyx";

export type IconAssetGroup = {
  category: string;
  icons: IconAsset[];
};

export type IconAsset = {
  name: string;
  content: string;
  aliases?: string[];
};

const props = defineProps<{
  groups: IconAssetGroup[];
  codeImport: (icon: IconAsset) => string;
}>();

defineSlots<{
  default?(props: { icon: IconAsset }): unknown;
}>();

const search = ref("");

const filteredGroups = computed(() => {
  const searchTerm = search.value.trim();
  if (!searchTerm) return props.groups;

  return props.groups
    .map((group) => {
      return {
        ...group,
        icons: group.icons.filter((icon) => {
          return (
            normalizedIncludes(icon.name, searchTerm) ||
            icon.aliases?.some((alias) => normalizedIncludes(alias, searchTerm))
          );
        }),
      };
    })
    .filter((group) => group.icons.length > 0);
});
</script>

<template>
  <div class="overview">
    <div class="onyx-grid">
      <OnyxUnstableSearch v-model="search" class="onyx-grid-span-8" with-shortcut />
    </div>

    <OnyxEmpty v-if="!filteredGroups.length">
      {{ $t("icons.empty") }}
    </OnyxEmpty>

    <div v-for="group in filteredGroups" :key="group.category" class="overview__group">
      <OnyxHeadline is="h3" class="headline">
        {{ group.category }}
        <span class="headline__count">({{ group.icons.length }})</span>
      </OnyxHeadline>

      <div class="onyx-grid">
        <IconPreviewCard
          v-for="icon in group.icons"
          :key="icon.name"
          class="onyx-grid-span-2"
          :icon="icon.content"
          :name="icon.name"
          :code-import="props.codeImport(icon)"
        >
          <slot :icon></slot>
        </IconPreviewCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overview {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);
  margin-top: var(--onyx-density-xl);

  &__group {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-xs);
  }
}

.headline {
  &__count {
    color: var(--onyx-color-text-icons-neutral-soft);
  }
}
</style>
