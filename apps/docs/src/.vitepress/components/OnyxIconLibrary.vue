<script lang="ts" setup>
import { computed, ref } from "vue";
import { getEnrichedIconCategoryList } from "../utils-icons";
import Search from "./Search.vue";
import IconLibraryItem from "./IconLibraryItem.vue";

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const enrichedIconCategoryList = getEnrichedIconCategoryList(ALL_ICONS);

const search = ref("");

const filteredCategories = computed(() => {
  const lowerCaseSearch = search.value.toLowerCase();
  return enrichedIconCategoryList
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
        <IconLibraryItem v-for="icon in category.icons" :key="icon.iconName" :icon="icon" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.category {
  margin-bottom: var(--onyx-spacing-xl);

  &__headline {
    margin-bottom: var(--onyx-spacing-md);
  }

  &__icons {
    display: grid;
    grid-template-columns: repeat(auto-fit, 3.5rem);
    grid-template-rows: repeat(auto-fit, 3.5rem);
  }
}
</style>
