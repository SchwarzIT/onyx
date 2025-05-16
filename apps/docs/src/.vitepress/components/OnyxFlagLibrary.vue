<script lang="ts" setup>
import { FLAG_METADATA, groupFlagsByContinent } from "@sit-onyx/flags";
import { OnyxHeadline, OnyxInput } from "sit-onyx";
import { computed, ref } from "vue";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const ALL_FLAGS = import.meta.glob("../../../node_modules/@sit-onyx/flags/src/assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const continents = Object.entries(groupFlagsByContinent(FLAG_METADATA)).map(
  ([continent, flags]) => ({ name: continent, flags }),
);

const search = ref("");

const filteredContinents = computed(() => {
  const lowerCaseSearch = search.value.toLowerCase();
  return continents
    .map((continent) => {
      if (continent.name.toLowerCase().includes(lowerCaseSearch)) return continent;

      return {
        ...continent,
        flags: continent.flags.filter(
          (flag) =>
            flag.code.toLowerCase().includes(lowerCaseSearch) ||
            flag.metadata.internationalName.toLowerCase().includes(lowerCaseSearch),
        ),
      };
    })
    .filter((continent) => continent.flags.length);
});

const getSvgContent = (code: string) => {
  return ALL_FLAGS[`../../../node_modules/@sit-onyx/flags/src/assets/${code}.svg`];
};
</script>

<template>
  <div>
    <OnyxInput
      v-model="search"
      label="Search country code or name"
      placeholder="Country code or name..."
      class="search"
      type="search"
      hide-label
    />

    <section v-for="continent in filteredContinents" :key="continent.name" class="continent">
      <OnyxHeadline is="h3" class="continent__headline" :hash="continent.name">
        {{ continent.name }}
      </OnyxHeadline>

      <div class="continent__icons">
        <AssetLibraryItem
          v-for="flag in continent.flags"
          :key="flag.code"
          :tooltip-text="flag.metadata.internationalName"
          :content="getSvgContent(flag.code)"
          :clipboard-value="`import ${flag.code} from &quot;@sit-onyx/flags/${flag.code}.svg?raw&quot;`"
          :success-message="`Import for flag &quot;${flag.code}&quot; (${flag.metadata.internationalName}) has been copied to your clipboard.`"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 18rem;
}

.continent {
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
