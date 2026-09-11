<script lang="ts" setup>
import { normalizedIncludes } from "sit-onyx";

export type IconAssetGroup = {
  /**
   * Group / category name.
   */
  category: string;
  /**
   * List of all icons in the group.
   */
  icons: IconAsset[];
  /**
   * Whether the group is currently hidden due to search.
   */
  hidden?: boolean;
};

export type IconAsset = {
  /**
   * Asset name.
   */
  name: string;
  /**
   * Icon SVG content.
   */
  content: string;
  /**
   * Optional alias names to include in the search.
   */
  aliases?: string[];
  /**
   * Whether the asset is currently hidden due to search.
   */
  hidden?: boolean;
};

const props = defineProps<{
  /**
   * List of all available icon asset groups.
   */
  groups: IconAssetGroup[];
  /**
   * Function to get the JavaScript import string for the given icon.
   */
  getCodeImport: (iconName: string) => string;
}>();

defineSlots<{
  /**
   * Optional slot to override the icon name content.
   */
  default?(props: { icon: IconAsset }): unknown;
}>();

const search = ref("");

const filteredGroups = computed(() => {
  const searchTerm = search.value.trim();
  if (!searchTerm) return props.groups;

  // to optimize performance, we do not actually filter out icons that do not match the search
  // but instead just visually hide them in the HTML so we do not re-render hundredths of icons when changing the search
  return props.groups.map((group) => {
    const icons = group.icons.map((icon) => {
      return {
        ...icon,
        hidden:
          !normalizedIncludes(icon.name, searchTerm) &&
          !icon.aliases?.some((alias) => normalizedIncludes(alias, searchTerm)),
      };
    });

    return {
      ...group,
      hidden: icons.every((icon) => icon.hidden),
      icons,
    };
  });
});
</script>

<template>
  <div class="overview">
    <div class="onyx-grid">
      <OnyxUnstableSearch v-model="search" class="onyx-grid-span-8" with-shortcut />
    </div>

    <OnyxEmpty v-if="filteredGroups.every((group) => group.hidden)">
      {{ $t("icons.empty") }}
    </OnyxEmpty>

    <template v-for="group in filteredGroups" :key="group.category">
      <div v-show="!group.hidden" class="overview__group">
        <OnyxHeadline is="h3" class="headline">
          {{ group.category }}
          <span class="headline__count">
            ({{ group.icons.filter((icon) => !icon.hidden).length }})
          </span>
        </OnyxHeadline>

        <div class="onyx-grid">
          <template v-for="icon in group.icons" :key="icon.name">
            <IconPreviewCard
              v-show="!icon.hidden"
              class="onyx-grid-span-2"
              :icon="icon.content"
              :name="icon.name"
              :get-code-import="props.getCodeImport"
            >
              <slot :icon></slot>
            </IconPreviewCard>
          </template>
        </div>
      </div>
    </template>
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
