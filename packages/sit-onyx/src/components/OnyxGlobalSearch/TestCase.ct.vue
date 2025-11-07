<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import OnyxGlobalSearchGroup from "../OnyxGlobalSearchGroup/OnyxGlobalSearchGroup.vue";
import OnyxGlobalSearchOption from "../OnyxGlobalSearchOption/OnyxGlobalSearchOption.vue";
import OnyxGlobalSearch from "./OnyxGlobalSearch.vue";

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    groupCount?: number;
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
          :label="`Result ${group}.${option}`"
          :value="`${group}-${option}`"
          :icon="iconPlaceholder"
          :link="`#${group}-${option}`"
        />
      </OnyxGlobalSearchGroup>
    </template>
  </OnyxGlobalSearch>
</template>
