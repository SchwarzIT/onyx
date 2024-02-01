<script lang="ts" setup>
import { ICON_CATEGORIES } from "@sit-onyx/icons";
import OnyxIcon from "../../../../../packages/sit-onyx/src/components/OnyxIcon/OnyxIcon.vue";

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  as: "raw",
  eager: true,
});

const getIconContent = (iconName: string) => {
  return ALL_ICONS[`../../../node_modules/@sit-onyx/icons/src/assets/${iconName}.svg`];
};
</script>

<template>
  <div>
    <section v-for="(icons, category) in ICON_CATEGORIES" :key="category" class="category">
      <h4 class="category__headline">{{ category }}</h4>

      <div class="category__icons">
        <OnyxIcon
          v-for="icon in icons"
          :key="icon.iconName"
          :icon="getIconContent(icon.iconName)"
          size="md"
          :title="`${icon.iconName}.svg`"
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
