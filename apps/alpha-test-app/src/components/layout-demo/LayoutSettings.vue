<script lang="ts" setup>
import { computed, ref } from "vue";
import SingleSettingsGroup from "./SingleSettingsGroup.vue";
import MultiSettingsGroup from "./MultiSettingsGroup.vue";
import { watch } from "vue";
import type { SelectionOption } from "sit-onyx";

export type Settings = {
  longPageContent?: true;
  showFlyout?: true;
  forceTooltip?: true;
  showStickyContent?: true;
  showToast?: true;

  showSideBar?: true;
  showSideBarCollapse?: true;
  showTempOverlay?: true;
  showTempOverlayTransparent?: true;
};

// const value = defineModel<unknown>();

// const props = defineProps<{
//   prop?: unknown;
// }>();

const emit = defineEmits<{
  settingsChange: [value: Settings];
}>();

const contentOptions: SelectionOption<undefined>[] = [
  { id: "longPageContent", label: "Scrollable Page Content" },
  { id: "showFlyout", label: "Flyout" },
  { id: "forceTooltip", label: "Tooltip" },
  { id: "showStickyContent", label: "Sticky Content" },
  { id: "showToast", label: "Toast" },
];
const activeContentSetting = ref<Settings>({ longPageContent: true });

const sidebarOptions: SelectionOption<undefined>[] = [
  { id: "none", label: "No Sidebar" },
  { id: "showSideBar", label: "Fixed Sidebar" },
  { id: "showSideBarCollapse", label: "Collapsible Sidebar" },
  { id: "showTempOverlay", label: "Overlay Sidebar" },
  { id: "showTempOverlayTransparent", label: "Overlay Sidebar transparent" },
];
const activeSidebarSetting = ref<Settings>({
  showSideBar: true,
});

const allSettings = computed<Settings>(() => ({
  ...activeSidebarSetting.value,
  ...activeContentSetting.value,
}));
watch(allSettings, (newSettings) => emit("settingsChange", newSettings), { immediate: true });
</script>

<template>
  <div>
    <MultiSettingsGroup
      v-model="activeContentSetting"
      headline="Content Options"
      :options="contentOptions"
    />

    <SingleSettingsGroup
      v-model="activeSidebarSetting"
      headline="Sidebar Options"
      :options="sidebarOptions"
    />

    {{ allSettings }}
  </div>
</template>

<style lang="scss" scoped></style>
