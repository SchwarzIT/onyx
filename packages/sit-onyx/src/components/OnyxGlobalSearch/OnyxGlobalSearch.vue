<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup>
import { createComboBox } from "@sit-onyx/headless";
import { iconSearch } from "@sit-onyx/icons";
import { computed, provide, ref, useTemplateRef } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import { normalizedIncludes } from "../../utils/strings.js";
import OnyxBasicDialog from "../OnyxBasicDialog/OnyxBasicDialog.vue";
import OnyxGlobalSearchGroup from "../OnyxGlobalSearchGroup/OnyxGlobalSearchGroup.vue";
import OnyxGlobalSearchOption from "../OnyxGlobalSearchOption/OnyxGlobalSearchOption.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import { GLOBAL_SEARCH_INJECTION_KEY, type OnyxGlobalSearchProps } from "./types.js";

const props = withDefaults(defineProps<OnyxGlobalSearchProps>(), {
  groups: () => [],
});

const emit = defineEmits<{
  /**
   * Emitted when the search term changes.
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the modal dialog should be closed.
   * Opening is always controlled via the `open` prop.
   */
  "update:open": [open: boolean];
}>();

const slots = defineSlots<{
  /**
   * Optional slot to pass additional / custom groups.
   * Note that those custom groups will NOT be automatically filtered depending on the search term.
   */
  default?(): unknown;
}>();

const { t } = injectI18n();
const basicDialogProps = useForwardProps(props, OnyxBasicDialog);

const searchTerm = useVModel({
  props,
  emit,
  key: "modelValue",
  default: "",
});

const combobox = useTemplateRef("comboboxRef");

/**
 * Value of the currently active/highlighted option.
 */
const activeValue = ref<string>();

const filteredGroups = computed(() => {
  // if onyx does not manage the search or no searchTerm is given, we don't filter the options further
  if (props.noFilter || !searchTerm.value) return props.groups;

  return props.groups
    .map((group) => {
      return {
        ...group,
        options: group.options.filter((option) =>
          normalizedIncludes(option.label, searchTerm.value),
        ),
      };
    })
    .filter((group) => group.options.length > 0);
});

const getAllOptions = () => {
  // using querySelector here instead of searching in filteredGroups so also options are included that are passed via custom slots
  const options = Array.from(combobox.value?.querySelectorAll('[role="option"]') ?? []);
  const activeIndex = activeValue.value
    ? options.findIndex(
        (element) => element.id === headless.internals.getOptionId(activeValue.value!),
      )
    : -1;

  return { options, activeIndex };
};

const activateOption = (type: "first" | "last" | "previous" | "next") => {
  const { options, activeIndex } = getAllOptions();

  let index = 0;
  if (type === "last") index = options.length - 1;
  else if (type === "previous") index = activeIndex - 1;
  else if (type === "next") index = activeIndex + 1;

  const normalizedIndex = index < 0 ? -1 : index > options.length - 1 ? 0 : index;
  const id = options.at(normalizedIndex)?.id;
  activeValue.value = id ? headless.internals.getOptionValueById(id) : undefined;
};

const onAutocomplete = (input: string) => (searchTerm.value = input);

const onSelect = (value: string) => {
  const id = headless.internals.getOptionId(value);
  const option = combobox.value?.querySelector(`#${id}`);
  if (!option) return;
  if ("click" in option && typeof option.click === "function") option.click();
};

const headless = createComboBox({
  autocomplete: "list",
  label: "some label",
  listLabel: "List",
  activeOption: activeValue,
  isExpanded: true,
  templateRef: combobox,
  onAutocomplete,
  onActivateFirst: () => activateOption("first"),
  onActivateLast: () => activateOption("last"),
  onActivateNext: () => activateOption("next"),
  onActivatePrevious: () => activateOption("previous"),
  onSelect,
});

provide(GLOBAL_SEARCH_INJECTION_KEY, { headless, activeValue });
</script>

<template>
  <OnyxBasicDialog
    v-bind="basicDialogProps"
    :label="t('globalSearch.label')"
    modal
    class="onyx-global-search"
    @update:open="emit('update:open', $event)"
  >
    <div ref="comboboxRef" class="onyx-global-search__content">
      <OnyxInput
        v-bind="headless.elements.input.value"
        v-model="searchTerm"
        label="Label"
        placeholder="Search..."
        type="search"
        hide-label
        autofocus
      >
        <template #leading>
          <OnyxLoadingIndicator v-if="props.loading" type="circle" />
          <OnyxIcon v-else :icon="iconSearch" />
        </template>
      </OnyxInput>

      <div
        v-if="filteredGroups.length || !!slots.default"
        v-bind="headless.elements.listbox.value"
        class="onyx-global-search__body"
      >
        <OnyxGlobalSearchGroup
          v-for="group in filteredGroups"
          :key="group.label"
          :label="group.label"
        >
          <OnyxGlobalSearchOption
            v-for="option in group.options"
            :key="option.value"
            :label="option.label"
            :icon="option.icon"
            :link="option.link"
            :value="option.value"
          />
        </OnyxGlobalSearchGroup>

        <slot></slot>
      </div>
    </div>
  </OnyxBasicDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-global-search {
  @include layers.override() {
    // reset OnyxBasicDialog styles
    --onyx-basic-dialog-padding: var(--onyx-outline-width);
    background-color: transparent;
    outline: none;

    .onyx-input {
      --onyx-input-padding-vertical: var(--onyx-density-md);

      &__separator--leading {
        display: none;
      }

      &__wrapper {
        border-radius: var(--onyx-basic-dialog-border-radius);
      }
    }
  }

  @include layers.component() {
    --onyx-global-search-border: var(--onyx-1px-in-rem) solid
      var(--onyx-color-component-border-neutral);

    &__content {
      min-width: 420px;
      max-width: 1100px;
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-xs);
    }

    &__body {
      border-radius: var(--onyx-basic-dialog-border-radius);
      border: var(--onyx-global-search-border);
      background-color: var(--onyx-color-base-background-blank);
    }
  }
}
</style>
