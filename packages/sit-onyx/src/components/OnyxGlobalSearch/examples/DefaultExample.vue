<script lang="ts" setup>
import { iconSearch } from "@sit-onyx/icons";
import { ref } from "vue";
import {
  OnyxAppLayout,
  OnyxIconButton,
  OnyxNavBar,
  OnyxPageLayout,
  OnyxUnstableGlobalSearch,
} from "../../../index.js";

// TODO: for testing, revert back to false afterwards
const isSearchOpen = ref(true);
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="Global search example">
        <!-- using the "globalContextArea" instead of the regular "contextArea" here so the search is also always visible on mobile screens -->
        <template #globalContextArea>
          <OnyxIconButton
            label="Open global search"
            :icon="iconSearch"
            color="neutral"
            @click="isSearchOpen = true"
          />
        </template>
      </OnyxNavBar>
    </template>

    <OnyxPageLayout> Your page content would go here... </OnyxPageLayout>

    <!-- TODO: remove nonDismissible -->
    <OnyxUnstableGlobalSearch v-model:open="isSearchOpen" non-dismissible />
  </OnyxAppLayout>
</template>
