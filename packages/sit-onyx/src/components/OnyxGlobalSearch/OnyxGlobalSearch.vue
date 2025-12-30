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
import OnyxBasicDialog from "../OnyxBasicDialog/OnyxBasicDialog.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import { GLOBAL_SEARCH_INJECTION_KEY, type OnyxGlobalSearchProps } from "./types.js";

const props = defineProps<OnyxGlobalSearchProps>();

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
   * Slot to pass search results / groups. Only `OnyxGlobalSearchGroup` components should be used.
   */
  default?(): unknown;
  /**
   * Slot to pass content after search results.
   */
  endOfList?(): unknown;
}>();

const { t } = injectI18n();
const basicDialogProps = useForwardProps(props, OnyxBasicDialog);

const searchTerm = useVModel({
  props,
  emit,
  key: "modelValue",
  default: "",
});

const dialog = useTemplateRef("dialogRef");
const dialogElement = computed(() => dialog.value?.dialog);

/**
 * Value of the currently active/highlighted option.
 */
const activeValue = ref<string>();

const getAllOptions = () => {
  const options = Array.from(dialogElement.value?.querySelectorAll('[role="option"]') ?? []);
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
  const option = dialogElement.value?.querySelector(`#${id}`);
  if (!option) return;
  if ("click" in option && typeof option.click === "function") option.click();
};

const headless = createComboBox({
  autocomplete: "list",
  label: computed(() => t.value("globalSearch.input.label")),
  listLabel: computed(() => t.value("globalSearch.searchResults")),
  activeOption: activeValue,
  isExpanded: true,
  templateRef: dialogElement,
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
    ref="dialogRef"
    :label="t('globalSearch.label')"
    modal
    class="onyx-global-search"
    @update:open="emit('update:open', $event)"
  >
    <OnyxInput
      v-bind="headless.elements.input.value"
      v-model="searchTerm"
      :label="t('globalSearch.input.label')"
      :placeholder="t('globalSearch.input.placeholder')"
      type="search"
      hide-label
      autofocus
    >
      <template #leading>
        <OnyxLoadingIndicator v-if="props.loading" type="circle" />
        <OnyxIcon v-else :icon="iconSearch" />
      </template>
    </OnyxInput>

    <!-- using v-show instead of v-if because the input has a aria-controls attribute which needs to point to a existing listbox -->
    <div
      v-show="!!slots.default"
      class="onyx-global-search__body"
      v-bind="headless.elements.listbox.value"
    >
      <slot></slot>
      <div v-if="!!slots.endOfList" class="onyx-global-search__end-of-list">
        <slot name="endOfList"></slot>
      </div>
    </div>

    <!-- TODO: replace keyboard shortcuts with OnyxShortcut component once implemented -->
    <div v-show="!!slots.default" class="onyx-global-search__footer onyx-text--small">
      <span class="onyx-global-search__shortcut">
        <kbd>↑</kbd>
        <kbd>↓</kbd>
        <span class="onyx-global-search__shortcut-label">
          {{ t("globalSearch.shortcuts.move") }}
        </span>
      </span>

      <span class="onyx-global-search__shortcut">
        <kbd>↵</kbd>
        <span class="onyx-global-search__shortcut-label">
          {{ t("globalSearch.shortcuts.select") }}
        </span>
      </span>

      <span class="onyx-global-search__shortcut">
        <kbd>ESC</kbd>
        <span class="onyx-global-search__shortcut-label"> {{ t("cancel") }}</span>
      </span>
    </div>
  </OnyxBasicDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/breakpoints.scss";

.onyx-global-search {
  @include layers.component() {
    --onyx-global-search-padding: var(--onyx-density-md);
    --onyx-basic-dialog-padding: 0;
    display: flex;
    width: 48rem;
    container-type: inline-size;

    &__body {
      overflow: auto;
      flex-grow: 1;

      background-color: var(--onyx-color-base-background-blank);
      border-radius: var(--onyx-basic-dialog-border-radius) var(--onyx-basic-dialog-border-radius) 0
        0;
      margin-top: var(--onyx-density-xs);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }
    &__end-of-list {
      padding: 0 var(--onyx-density-md) var(--onyx-density-xs) var(--onyx-density-md);
    }

    &__footer {
      padding: var(--onyx-density-xs) var(--onyx-global-search-padding);
      background-color: var(--onyx-color-base-background-tinted);
      color: var(--onyx-color-text-icons-neutral-soft);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      border-top: none;
      border-radius: 0 0 var(--onyx-basic-dialog-border-radius)
        var(--onyx-basic-dialog-border-radius);

      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--onyx-density-sm) var(--onyx-density-xl);
    }

    &__shortcut {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);

      kbd {
        border-radius: var(--onyx-radius-sm);
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
        padding-inline: var(--onyx-density-2xs);
        min-width: 1.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }

    &__shortcut-label {
      @include breakpoints.container(max, xs) {
        display: none;
      }
    }
  }
}

.onyx-global-search {
  @include layers.override() {
    --onyx-global-search-top: calc(
      var(--onyx-nav-bar-height) + var(--onyx-grid-margin-vertical) + var(--onyx-density-md)
    );
    // reset OnyxBasicDialog styles
    background-color: transparent;
    outline: none;
    overflow: visible; // needed to show focus-visible outline on input

    margin-top: var(--onyx-global-search-top);
    max-height: calc(100% - var(--onyx-global-search-top) - var(--onyx-basic-dialog-screen-gap));

    .onyx-basic-dialog__content {
      display: flex;
      flex-direction: column;
      max-width: 100%;
    }

    .onyx-input {
      --onyx-input-padding-vertical: var(--onyx-global-search-padding);

      &__separator--leading {
        display: none;
      }

      &__wrapper {
        border-radius: var(--onyx-basic-dialog-border-radius);
      }

      &__native {
        border-radius: var(--onyx-radius-sm);
      }
    }
  }
}
</style>
