<script lang="ts" setup>
import { provide } from "vue";
import OnyxAppLayout from "../OnyxAppLayout/OnyxAppLayout.vue";
import {
  createGlobalFABProvider,
  GLOBAL_FAB_PROVIDER_INJECTION_KEY,
} from "../OnyxGlobalFAB/useGlobalFAB.js";
import OnyxPageLayout from "../OnyxPageLayout/OnyxPageLayout.vue";
import OnyxSidebar from "./OnyxSidebar.vue";

const props = defineProps<{
  /**
   * If the left sidebar should be displayed
   */
  sidebarLeft?: boolean;
  /**
   * If the right sidebar should be displayed
   */
  sidebarRight?: boolean;
}>();

provide(GLOBAL_FAB_PROVIDER_INJECTION_KEY, createGlobalFABProvider());
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      Page content
      <template v-if="props.sidebarLeft" #sidebar>
        <OnyxSidebar label="Sidebar Left">
          <template #header> Header content </template>
          <div class="onyx-grid">Body content</div>
          <template #footer>
            <OnyxButton color="neutral" label="Button" />
            <OnyxButton label="Button" />
          </template>
        </OnyxSidebar>
      </template>
      <template v-if="props.sidebarRight" #sidebarRight>
        <OnyxSidebar label="Sidebar Right" alignment="right">
          <template #header> Header content </template>
          <div class="onyx-grid">Body content</div>
          <template #footer>
            <OnyxButton color="neutral" label="Button" />
            <OnyxButton label="Button" />
          </template>
        </OnyxSidebar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>
