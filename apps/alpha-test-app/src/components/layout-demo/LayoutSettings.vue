<script lang="ts" setup>
import { computed, ref } from "vue";
import SingleSettingsGroup from "./SingleSettingsGroup.vue";
import MultiSettingsGroup from "./MultiSettingsGroup.vue";
import { watch } from "vue";
import type { SelectionOption } from "sit-onyx";
import { OnyxHeadline } from "sit-onyx";

export type Settings = Partial<{
  showLongPageContent: boolean;
  showFlyout: boolean;
  forceTooltip: boolean;
  showStickyContent: boolean;
  showToast: boolean;
  showSideBar: boolean;
  showSideBarCollapse: boolean;
  showTempOverlayTransparent: boolean;
  showTempOverlay: boolean;
  showDetailFooter: boolean;
  showFullFooter: boolean;
  showPopover: boolean;
  showMobileFlyIn: boolean;
  showPageLoader: boolean;
  showTopBarFlyout: boolean;
}>;

export type SettingsSection = "content" | "sideBar" | "footer" | "overlay";
export type SettingsSections = Record<SettingsSection, Settings>;

const props = withDefaults(
  defineProps<{
    modelValue: SettingsSections;
    horizontal?: boolean;
    show?: SettingsSection[];
  }>(),
  {
    horizontal: false,
    show: () => ["content", "sideBar", "footer", "overlay"],
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: SettingsSections];
}>();

const noneOption = { id: "none", label: "None" };

const contentOptions: SelectionOption[] = [
  { id: "showLongPageContent", label: "Scrollable Page Content" },
  { id: "showFlyout", label: "Flyout" },
  { id: "forceTooltip", label: "Tooltip" },
  { id: "showStickyContent", label: "Sticky Content" },
  { id: "showToast", label: "Toast" },
];
const overlayOptions: SelectionOption[] = [
  noneOption,
  { id: "showPopover", label: "Popover/Modal" },
  { id: "showMobileFlyIn", label: "Mobile Fly-in" },
  { id: "showPageLoader", label: "Page loader" },
  { id: "showTopBarFlyout", label: "Top bar flyout" },
];
const sidebarOptions: SelectionOption[] = [
  noneOption,
  { id: "showSideBar", label: "Fixed Sidebar" },
  { id: "showSideBarCollapse", label: "Collapsible Sidebar" },
  { id: "showTempOverlay", label: "Overlay Sidebar with backdrop" },
  { id: "showTempOverlayTransparent", label: "Overlay Sidebar" },
];
const showDetailFooter = { id: "showDetailFooter", label: "Detail Footer" };
const showFullFooter = { id: "showFullFooter", label: "Full Footer" };
const baseFooterOptions = [noneOption, showFullFooter];
const sidebarFooterOptions = [noneOption, showDetailFooter, showFullFooter];
const footerOptions = ref<SelectionOption[]>(sidebarFooterOptions);

const activeContentSetting = computed({
  get: () => props.modelValue.content || {},
  set: (value) => emit("update:modelValue", { ...props.modelValue, content: value }),
});
const activeSidebarSetting = computed({
  get: () => props.modelValue.sideBar || {},
  set: (value) => emit("update:modelValue", { ...props.modelValue, sideBar: value }),
});
const activeFooterSetting = computed({
  get: () => props.modelValue.footer || {},
  set: (value) => emit("update:modelValue", { ...props.modelValue, footer: value }),
});
const activeOverlaySetting = computed({
  get: () => props.modelValue.overlay || {},
  set: (value) => emit("update:modelValue", { ...props.modelValue, overlay: value }),
});

const enabledSections = computed(() => {
  const sectionsToShow = props.show.reduce<Partial<Record<SettingsSection, boolean>>>(
    (visibleSections, section) => {
      visibleSections[section] = true;
      return visibleSections;
    },
    {},
  );
  if (
    activeSidebarSetting.value.showTempOverlay ||
    activeSidebarSetting.value.showTempOverlayTransparent
  ) {
    // block overlays when the temporary overlay is open
    sectionsToShow.overlay = false;
  }
  return sectionsToShow;
});

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
</script>

<template>
  <div class="settings">
    <OnyxHeadline is="h2">Demo Settings</OnyxHeadline>

    <MultiSettingsGroup
      v-if="enabledSections.content"
      v-model="activeContentSetting"
      headline="Content Options"
      :options="contentOptions"
      :horizontal="horizontal"
    />

    <SingleSettingsGroup
      v-if="enabledSections.sideBar"
      v-model="activeSidebarSetting"
      headline="Sidebar Options"
      :options="sidebarOptions"
      :horizontal="horizontal"
    />

    <SingleSettingsGroup
      v-if="enabledSections.footer"
      v-model="activeFooterSetting"
      headline="Footer Options"
      :options="footerOptions"
      :horizontal="horizontal"
    />

    <SingleSettingsGroup
      v-if="enabledSections.overlay"
      v-model="activeOverlaySetting"
      headline="Overlay Options"
      :options="overlayOptions"
      :horizontal="horizontal"
    />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
