<script lang="ts" setup>
import { iconArrowSmallRight, iconPlaceholder } from "@sit-onyx/icons";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
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
    <template v-if="props.groupCount > 0" #default>
      <OnyxGlobalSearchGroup
        v-for="group in props.groupCount"
        :key="group"
        :label="`Group ${group}`"
      >
        <OnyxGlobalSearchOption
          v-for="option in 2"
          :key="`${group}-${option}`"
          :label="`Result ${group}.${option} `.repeat(props.longContent ? 8 : 1)"
          :value="`${group}-${option}`"
          :icon="iconPlaceholder"
          :link="`#${group}-${option}`"
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
