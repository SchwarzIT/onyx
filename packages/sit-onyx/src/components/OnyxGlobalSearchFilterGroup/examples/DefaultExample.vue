<script setup lang="ts">
import { OnyxUnstableGlobalSearchFilterGroup } from "../../../index.js";
import OnyxFilterBadge from "../../OnyxFilterBadge/OnyxFilterBadge.vue";
</script>

<template>
  <OnyxUnstableGlobalSearchFilterGroup label="Filters">
    <OnyxFilterBadge label="Filter 1" />
    <OnyxFilterBadge label="Filter 2" />
    <OnyxFilterBadge label="Filter 3" />
  </OnyxUnstableGlobalSearchFilterGroup>
</template>
