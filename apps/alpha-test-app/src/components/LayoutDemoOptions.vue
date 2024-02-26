<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  OnyxCheckboxGroup,
  OnyxHeadline,
  OnyxRadioButtonGroup,
  type SelectionOption,
} from "sit-onyx";
import { watch } from "vue";

// const props = defineProps<{
//   modelValue: Options;
//   highlightLabel?: string;
// }>();
// const emit = defineEmits<{
//   "update:modelValue": [value: Options];
// }>();
// const options = computed({
//   get: () => props.modelValue,
//   set: (value) => emit("update:modelValue", value),
// });

const overlayOptions: SelectionOption<undefined>[] = [
  { id: "none", label: "None" },
  { id: "showPopover", label: "Popover/Modal" },
  { id: "showMobileFlyIn", label: "Mobile Fly-in" },
  { id: "showPageLoader", label: "Page loader" },
  { id: "topBarFlyout", label: "Top bar flyout" },
];
const selectedOverlay = ref(overlayOptions[0]);

const contentOptions: SelectionOption<undefined>[] = [
  { id: "longPageContent", label: "Scrollable Page Content" },
  { id: "showFlyout", label: "Flyout" },
  { id: "forceTooltip", label: "Tooltip" },
  { id: "showStickyContent", label: "Sticky Content" },
  { id: "showToast", label: "Toast" },
];
const selectedContent = ref([contentOptions[0].id]);

const sidebarOptions: SelectionOption<undefined>[] = [
  { id: "none", label: "No Sidebar" },
  { id: "showSideBar", label: "Fixed Sidebar" },
  { id: "showSideBarCollapse", label: "Collapsible Sidebar" },
  { id: "showTempOverlay", label: "Overlay Sidebar" },
  { id: "showTempOverlayTransparent", label: "Overlay Sidebar transparent" },
];
const selectedSidebar = ref(sidebarOptions[1]);

const detailFooter = { id: "detailFooter", label: "Detail Footer" };
const fullFooter = { id: "fullFooter", label: "Full Footer" };
const footerOptions = ref<SelectionOption<undefined>[]>([
  { id: "none", label: "No Footer" },
  detailFooter,
  fullFooter,
]);
const selectedFooter = ref(detailFooter);

const settings = computed(() => ({
  longPageContent: selectedContent.value.includes("longPageContent"),
  showStickyContent: selectedContent.value.includes("showStickyContent"),
  showToast: selectedContent.value.includes("showToast"),
  showFlyout: selectedContent.value.includes("showFlyout"),
  forceTooltip: selectedContent.value.includes("forceTooltip"),

  showPopover: selectedOverlay.value.id === "showPopover",
  showMobileFlyIn: selectedOverlay.value.id === "showMobileFlyIn",
  showPageLoader: selectedOverlay.value.id === "showPageLoader",
  topBarFlyout: selectedOverlay.value.id === "topBarFlyout",

  showSideBar: selectedSidebar.value.id === "showSideBar",
  showSideBarCollapse: selectedSidebar.value.id === "showSideBarCollapse",
  showTempOverlay: selectedSidebar.value.id === "showTempOverlay",
  showTempOverlayTransparent: selectedSidebar.value.id === "showTempOverlayTransparent",

  detailFooter: selectedFooter.value.id === "detailFooter",
  fullFooter: selectedFooter.value.id === "fullFooter",
}));

/** Adust footer configs depending on the availability of a sidebar */
watch(
  settings,
  (newSettings) => {
    if (!newSettings.showSideBar && !newSettings.showSideBarCollapse) {
      // if there is no sidebar, remove the option for detail footer
      if (newSettings.detailFooter) {
        selectedFooter.value = fullFooter;
      }
      footerOptions.value = [{ id: "none", label: "No Footer" }, fullFooter];
    } else {
      footerOptions.value = [{ id: "none", label: "No Footer" }, detailFooter, fullFooter];
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="options">
    <OnyxHeadline is="h2">Demo Settings</OnyxHeadline>

    <OnyxCheckboxGroup
      v-model="selectedContent"
      headline="Page Content"
      :options="contentOptions"
    />

    <OnyxRadioButtonGroup
      v-model="selectedSidebar"
      headline="Sidebar options"
      :options="sidebarOptions"
    />

    <OnyxRadioButtonGroup
      v-model="selectedFooter"
      headline="Footer options"
      :options="footerOptions"
    />

    <OnyxRadioButtonGroup
      v-model="selectedOverlay"
      headline="Overlay options"
      :options="overlayOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: column;
}

.label {
  color: rgb(96, 96, 96);
  &--checked {
    color: black;
  }
  &--highlighted {
    font-weight: bold;
    color: green;
  }
}

.title {
  margin-top: 8px;
}
</style>
