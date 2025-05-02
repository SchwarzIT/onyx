<script lang="ts" setup>
import { OnyxHeadline, type SelectOption } from "sit-onyx";
import { computed } from "vue";
import MultiSettingsGroup from "./MultiSettingsGroup.vue";
import SingleSettingsGroup from "./SingleSettingsGroup.vue";

export type Settings = Partial<{
  none: boolean;
  showLongPageContent: boolean;
  showFlyout: boolean;
  forceTooltip: boolean;
  showStickyContent: boolean;
  showToast: boolean;
  showSidebar: boolean;
  showSidebarCollapse: boolean;
  showTempOverlayTransparent: boolean;
  showTempOverlay: boolean;
  showDetailFooter: boolean;
  showFullFooter: boolean;
  showModal: boolean;
  showPopover: boolean;
}>;

export type SettingsSection = "content" | "sidebar" | "footer" | "overlay";
export type SettingsSections = Record<SettingsSection, Settings>;

const props = withDefaults(
  defineProps<{
    modelValue: SettingsSections;
    horizontal?: boolean;
    show?: SettingsSection[];
  }>(),
  {
    show: () => ["content", "sidebar", "footer", "overlay"],
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: SettingsSections];
}>();

const noneOption: SelectOption = { value: "none", label: "None" };

const contentOptions: SelectOption[] = [
  { value: "showLongPageContent", label: "Scrollable Page Content" },
  { value: "showFlyout", label: "Flyout" },
  { value: "forceTooltip", label: "Tooltip" },
  { value: "showStickyContent", label: "Sticky Content" },
  { value: "showToast", label: "Toast" },
];

const overlayOptions: SelectOption[] = [
  noneOption,
  { value: "showModal", label: "Modal dialog" },
  { value: "showPopover", label: "Non-modal popup" },
];

const sidebarOptions: SelectOption[] = [
  noneOption,
  { value: "showSidebar", label: "Fixed Sidebar" },
  { value: "showSidebarCollapse", label: "Collapsible Sidebar" },
  { value: "showTempOverlay", label: "Overlay Sidebar with backdrop" },
  { value: "showTempOverlayTransparent", label: "Overlay Sidebar" },
];

const showDetailFooter: SelectOption = { value: "showDetailFooter", label: "Detail Footer" };
const showFullFooter: SelectOption = { value: "showFullFooter", label: "Full Footer" };

/** Adust footer configs depending on the availability of a sidebar */
const footerOptions = computed<SelectOption[]>(() => {
  const { showSidebar, showSidebarCollapse } = activeSidebarSetting.value;
  const isDetailFooterRelevant = showSidebar || showSidebarCollapse;
  if (isDetailFooterRelevant) {
    return [noneOption, showDetailFooter, showFullFooter];
  } else {
    return [noneOption, showFullFooter];
  }
});

const activeContentSetting = computed({
  get: () => props.modelValue.content || {},
  set: (value) => emit("update:modelValue", { ...props.modelValue, content: value }),
});
const activeSidebarSetting = computed({
  get: () => props.modelValue.sidebar || {},
  set: (value) => emit("update:modelValue", { ...props.modelValue, sidebar: value }),
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
      v-if="enabledSections.sidebar"
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
