<script lang="ts" setup>
import { normalizedIncludes, OnyxEmpty, OnyxHeadline, OnyxInput } from "sit-onyx";
import { computed, ref } from "vue";

export type AssetLibraryProps = {
  groups: AssetLibraryGroup[];
  searchPlaceholder: string;
};

export type AssetLibraryGroup = {
  name: string;
  assets: Asset[];
};

export type Asset = {
  /**
   * Unique ID of the asset.
   *
   * @example Icon name, country code
   */
  id: string;
  /**
   * Readable name of the asset.
   *
   * @example Icon name, country name
   */
  name: string;
  /**
   * Optional alias names of the asset what can be searched by to find the asset.
   */
  aliases?: string[];
};

const props = defineProps<AssetLibraryProps>();

defineSlots<{
  /**
   * Slot to render an individual asset item.
   */
  item(props: { asset: Asset }): unknown;
}>();

const search = ref("");

const filteredGroups = computed(() => {
  const lowerCaseSearch = search.value.toLowerCase();
  return props.groups
    .map((group) => {
      if (normalizedIncludes(group.name.toLowerCase(), lowerCaseSearch)) return group;

      return {
        ...group,
        assets: group.assets.filter(
          (asset) =>
            normalizedIncludes(asset.id.toLowerCase(), lowerCaseSearch) ||
            normalizedIncludes(asset.name.toLowerCase(), lowerCaseSearch) ||
            asset.aliases?.some(
              (alias) =>
                normalizedIncludes(alias, lowerCaseSearch) ||
                normalizedIncludes(alias.replace(/-/g, " "), lowerCaseSearch),
            ),
        ),
      };
    })
    .filter((group) => group.assets.length);
});
</script>

<template>
  <div>
    <OnyxInput
      v-model="search"
      label="Search assets"
      :placeholder="props.searchPlaceholder"
      class="search"
      type="search"
      hide-label
    />

    <OnyxEmpty v-if="!filteredGroups.length"> No results found for your search. </OnyxEmpty>

    <template v-else>
      <section v-for="group in filteredGroups" :key="group.name" class="group">
        <OnyxHeadline is="h3" class="group__headline" :hash="group.name">
          {{ group.name }}
        </OnyxHeadline>

        <div class="group__assets">
          <template v-for="asset in group.assets" :key="asset.id">
            <slot name="item" :asset></slot>
          </template>
        </div>
      </section>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 18rem;
}

.group {
  margin-bottom: var(--onyx-spacing-xl);

  &__headline {
    margin-top: var(--onyx-spacing-xl);
    margin-bottom: var(--onyx-spacing-md);
  }

  &__assets {
    display: grid;
    grid-template-columns: repeat(auto-fit, 3.5rem);
    grid-template-rows: repeat(auto-fit, 3.5rem);
  }
}
</style>
