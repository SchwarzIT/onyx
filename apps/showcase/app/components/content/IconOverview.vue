<script lang="ts" setup>
import * as ALL_ICONS from "@sit-onyx/icons";
import { getIconImportName, groupIconsByCategory, ICON_METADATA } from "@sit-onyx/icons/utils";
import { normalizedIncludes } from "sit-onyx";

const groups = Object.entries(groupIconsByCategory(ICON_METADATA)).map(([category, icons]) => {
  return {
    category,
    icons: icons.map((icon) => {
      return {
        ...icon,
        content: ALL_ICONS[getIconImportName(icon.iconName) as keyof typeof ALL_ICONS],
      };
    }),
  };
});

const search = ref("");

const filteredGroups = computed(() => {
  const searchTerm = search.value.trim();
  if (!searchTerm) return groups;

  return groups
    .map((group) => {
      return {
        ...group,
        icons: group.icons.filter((icon) => {
          return (
            normalizedIncludes(icon.iconName, searchTerm) ||
            icon.metadata.aliases?.some((alias) => normalizedIncludes(alias, searchTerm))
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
          :key="icon.iconName"
          class="onyx-grid-span-2"
          :icon="icon.content"
          :name="icon.iconName"
          :code-import="`import ${getIconImportName(icon.iconName)} from &quot;@sit-onyx/icons&quot;;`"
        />
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
