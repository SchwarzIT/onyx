<script lang="ts" setup>
import { computed, ref } from "vue";
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";
import Search from "./Search.vue";
import { getEnrichedIconCategoryList } from "../utils-icons";

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  as: "raw",
  eager: true,
});
const ENRICHED_ICON_CATEGORY_LIST = getEnrichedIconCategoryList(ALL_ICONS);

const search = ref("");

const filteredCategories = computed(() => {
  const lowerCaseSearch = search.value.toLowerCase();
  return ENRICHED_ICON_CATEGORY_LIST.map((category) => {
    if (category.name.toLowerCase().includes(lowerCaseSearch)) return category;

    return {
      ...category,
      icons: category.icons.filter(
        (icon) =>
          icon.iconName.toLowerCase().includes(lowerCaseSearch) ||
          icon.metadata.aliases?.some((alias) => alias.includes(lowerCaseSearch)),
      ),
    };
  }).filter((category) => category.icons.length);
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
          :title="icon.tooltipName"
          :color="icon.metadata.deprecated ? 'secondary' : 'currentColor'"
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
