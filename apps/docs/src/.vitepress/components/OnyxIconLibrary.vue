<script lang="ts" setup>
import { ICON_CATEGORIES } from "@sit-onyx/icons";
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";
import Search from "./Search.vue";
import { capitalize, computed, ref } from "vue";

const search = ref("");

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  as: "raw",
  eager: true,
});

const getIconContent = (iconName: string) => {
  return ALL_ICONS[`../../../node_modules/@sit-onyx/icons/src/assets/${iconName}.svg`];
};

const getIconContextData = (iconName: string) => {
  const parts = iconName.split("-");
  // bell-disabled => Bell Disabled
  const tooltipName = parts.map((word) => capitalize(word)).join(" ");
  // bell-disabled => bellDisabled
  const importName = parts
    .map((word, index) => {
      if (index === 0) return word;
      return capitalize(word);
    })
    .join("");

  return { tooltipName, importName, content: getIconContent(iconName) };
};

// collects the icon contents once for all icons
const enrichedIconCategories = Object.entries(ICON_CATEGORIES).map(([category, icons]) => ({
  name: category,
  icons: icons.map((icon) => ({
    ...icon,
    ...getIconContextData(icon.iconName),
    metadata: {
      ...icon.metadata,
      // make the search more reliable
      aliases: icon.metadata.aliases?.map((alias) => alias.toLowerCase()),
    },
  })),
}));
const filteredCategories = computed(() => {
  const lowerCaseSearch = search.value.toLowerCase();
  return enrichedIconCategories
    .map((category) => {
      if (category.name.toLowerCase().includes(lowerCaseSearch)) return category;

      return {
        ...category,
        icons: category.icons.filter(
          (icon) =>
            icon.iconName.toLowerCase().includes(lowerCaseSearch) ||
            icon.metadata.aliases?.some((alias) => alias.includes(lowerCaseSearch)),
        ),
      };
    })
    .filter((category) => category.icons.length);
});
</script>

<template>
  <div>
    <Search v-model="search" />

    <section v-for="category in filteredCategories" :key="category.name" class="category">
      <h3 class="category__headline">{{ category.name }}</h3>

      <div class="category__icons">
        <OnyxIcon
          v-for="icon in category.icons"
          :key="icon.iconName"
          :icon="icon.content"
          size="md"
          :title="icon.tooltipName"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.category {
  margin-bottom: var(--onyx-spacing-2xl);

  &__headline {
    margin-bottom: var(--onyx-spacing-md);
  }

  &__icons {
    display: grid;
    grid-gap: var(--onyx-spacing-lg);
    grid-template-columns: repeat(auto-fit, 2rem);
  }
}
</style>
