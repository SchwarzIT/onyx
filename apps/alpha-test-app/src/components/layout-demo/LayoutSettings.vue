<script lang="ts" setup>
import { computed, ref } from "vue";
import SingleSettingsGroup from "./SingleSettingsGroup.vue";
import MultiSettingsGroup from "./MultiSettingsGroup.vue";
import { watch } from "vue";
import type { SelectionOption } from "sit-onyx";
import { OnyxHeadline } from "sit-onyx";

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

  detailFooter?: true;
  fullFooter?: true;
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

const detailFooter = { id: "detailFooter", label: "Detail Footer" };
const fullFooter = { id: "fullFooter", label: "Full Footer" };
const baseFooterOptions = [{ id: "none", label: "No Footer" }, fullFooter];
const sidebarFooterOptions = [{ id: "none", label: "No Footer" }, detailFooter, fullFooter];
const footerOptions = ref<SelectionOption<undefined>[]>(sidebarFooterOptions);
const activeFooterSetting = ref<Settings>({ detailFooter: true });

/** Adust footer configs depending on the availability of a sidebar */
watch(
  activeSidebarSetting,
  (sidebarSetting) => {
    if (!sidebarSetting.showSideBar && !sidebarSetting.showSideBarCollapse) {
      footerOptions.value = baseFooterOptions;
    } else {
      footerOptions.value = sidebarFooterOptions;
    }
  },
  { immediate: true },
);

/** expose all the settings */
const allSettings = computed<Settings>(() => ({
  ...activeSidebarSetting.value,
  ...activeContentSetting.value,
}));
watch(allSettings, (newSettings) => emit("settingsChange", newSettings), { immediate: true });
</script>

<template>
  <div>
    <OnyxHeadline is="h2">Demo Settings</OnyxHeadline>

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

    <SingleSettingsGroup
      v-model="activeFooterSetting"
      headline="Footer Options"
      :options="footerOptions"
    />

    {{ allSettings }}
  </div>
</template>

<style lang="scss" scoped></style>
