<script lang="ts" setup>
import { computed, ref } from "vue";
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";
import { getEnrichedIconCategoryList } from "../utils-icons";
import Search from "./Search.vue";

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
        <div class="category__icon" v-for="icon in category.icons" :key="icon.iconName">
          <OnyxIcon
            :icon="icon.content"
            :title="icon.tooltipName"
            :color="icon.metadata.deprecated ? 'secondary' : 'currentColor'"
          />
        </div>
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
    grid-template-columns: repeat(auto-fit, 3.5rem);
    grid-template-rows: repeat(auto-fit, 3.5rem);
  }

  &__icon {
    padding: var(--onyx-spacing-md);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0.0625rem solid transparent;

    &:hover {
      border-radius: var(--onyx-radius-md);
      border: 0.0625rem solid var(--onyx-color-base-neutral-300);
      background: var(--onyx-color-base-background-blank);
    }
  }
}
</style>
