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
        <div class="icon" v-for="icon in category.icons" :key="icon.iconName" tabindex="0">
          <OnyxIcon
            :icon="icon.content"
            :color="icon.metadata.deprecated ? 'secondary' : 'currentColor'"
          />
          <div class="icon__tooltip">{{ icon.tooltipName }}</div>
        </div>
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

.icon {
  height: 3.5rem;
  width: 3.5rem;
  padding: var(--onyx-spacing-md);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0.0625rem solid transparent;
  position: relative;

  &__tooltip {
    position: absolute;
    top: 4rem;
    z-index: 1;
    visibility: hidden;

    padding: var(--onyx-spacing-4xs) var(--onyx-spacing-2xs);
    border-radius: var(--onyx-radius-xs);
    background: var(--onyx-color-base-neutral-900);
    color: var(--onyx-color-icon-neutral-inverted);
    font-size: 0.8125rem;
  }

  &:hover,
  &:focus-visible {
    border-radius: var(--onyx-radius-md);
    border: 0.0625rem solid var(--onyx-color-base-neutral-300);
    background: var(--onyx-color-base-background-blank);
    outline-style: unset;

    .icon__tooltip {
      visibility: inherit;
    }
  }
}
</style>
