<script lang="ts" setup>
import { iconArrowSmallRight, iconPlaceholder } from "@sit-onyx/icons";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxFilterBadge from "../OnyxFilterBadge/OnyxFilterBadge.vue";
import OnyxGlobalSearchFilterGroup from "../OnyxGlobalSearchFilterGroup/OnyxGlobalSearchFilterGroup.vue";
import OnyxGlobalSearchGroup from "../OnyxGlobalSearchGroup/OnyxGlobalSearchGroup.vue";
import OnyxGlobalSearchOption from "../OnyxGlobalSearchOption/OnyxGlobalSearchOption.vue";
import OnyxGlobalSearch from "./OnyxGlobalSearch.vue";

const props = withDefaults(
  defineProps<{
    /**
     * Number of groups that should be displayed.
     */
    groupCount?: number;
    /**
     * Whether the search is loading.
     */
    loading?: boolean;
    /**
     * Whether to render long option content.
     */
    longContent?: boolean;
  }>(),
  {
    groupCount: 0,
  },
);
</script>

<template>
  <OnyxGlobalSearch open :loading>
    <template #filters>
      <OnyxGlobalSearchFilterGroup label="Filters">
        <OnyxFilterBadge label="Filter 1" />
        <OnyxFilterBadge label="Filter 2" />
        <OnyxFilterBadge label="Filter 3" />
      </OnyxGlobalSearchFilterGroup>
    </template>
    <template v-if="props.groupCount > 0" #default>
      <OnyxGlobalSearchGroup
        v-for="group in props.groupCount"
        :key="group"
        :label="`Group ${group}`"
      >
        <OnyxGlobalSearchOption
          :key="`${group}-1`"
          :label="`Result ${group}.1 `.repeat(props.longContent ? 8 : 1)"
          :value="`${group}-1`"
          :icon="iconPlaceholder"
          :link="`#${group}-1`"
        />
        <OnyxGlobalSearchOption
          :key="`${group}-2`"
          :label="`Result ${group}.2 `.repeat(props.longContent ? 8 : 1)"
          :value="`${group}-2`"
          :icon="iconPlaceholder"
          :link="{ href: 'https://onyx-global-search.example.com', target: '_blank' }"
        />
      </OnyxGlobalSearchGroup>
    </template>
    <template #endOfList="{ getOptionProps }">
      <OnyxButton
        v-bind="getOptionProps('show-all')"
        label="Show all results"
        mode="plain"
        class="show-all-button"
        :icon="iconArrowSmallRight"
        icon-position="right"
      />
    </template>
  </OnyxGlobalSearch>
</template>
