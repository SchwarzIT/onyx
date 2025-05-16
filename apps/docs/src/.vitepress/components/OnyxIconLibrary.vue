<script lang="ts" setup>
import {
  capitalize,
  getIconImportName,
  groupIconsByCategory,
  ICON_METADATA,
} from "@sit-onyx/icons";
import { OnyxHeadline, OnyxInput } from "sit-onyx";
import { computed, ref } from "vue";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const categories = Object.entries(groupIconsByCategory(ICON_METADATA)).map(([category, icons]) => ({
  name: category,
  icons,
}));

const search = ref("");

const filteredCategories = computed(() => {
  const lowerCaseSearch = search.value.toLowerCase();
  return categories
    .map((category) => {
      if (category.name.toLowerCase().includes(lowerCaseSearch)) return category;

      return {
        ...category,
        icons: category.icons.filter(
          (icon) =>
            icon.iconName.toLowerCase().includes(lowerCaseSearch) ||
            icon.metadata.aliases?.some(
              (alias) =>
                alias.includes(lowerCaseSearch) ||
                alias.replace(/-/g, " ").includes(lowerCaseSearch),
            ),
        ),
      };
    })
    .filter((category) => category.icons.length);
});

const getSvgContent = (iconName: string) => {
  return ALL_ICONS[`../../../node_modules/@sit-onyx/icons/src/assets/${iconName}.svg`];
};

const getFormattedIconName = (iconName: string) => {
  return iconName
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
};
</script>

<template>
  <div>
    <OnyxInput
      v-model="search"
      label="Search icon or category name"
      placeholder="Icon or category name..."
      class="search"
      type="search"
      hide-label
    />

    <section v-for="category in filteredCategories" :key="category.name" class="category">
      <OnyxHeadline is="h3" class="category__headline" :hash="category.name">
        {{ category.name }}
      </OnyxHeadline>

      <div class="category__icons">
        <AssetLibraryItem
          v-for="icon in category.icons"
          :key="icon.iconName"
          :tooltip-text="getFormattedIconName(icon.iconName)"
          :content="getSvgContent(icon.iconName)"
          :clipboard-value="`import ${getIconImportName(icon.iconName)} from &quot;@sit-onyx/icons/${icon.iconName}.svg?raw&quot;`"
          :success-message="`Import for icon &quot;${getIconImportName(icon.iconName)}&quot; has been copied to your clipboard.`"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 18rem;
}

.category {
  margin-bottom: var(--onyx-spacing-xl);

  &__headline {
    margin-top: var(--onyx-spacing-xl);
    margin-bottom: var(--onyx-spacing-md);
  }

  &__icons {
    display: grid;
    grid-template-columns: repeat(auto-fit, 3.5rem);
    grid-template-rows: repeat(auto-fit, 3.5rem);
  }
}
</style>
