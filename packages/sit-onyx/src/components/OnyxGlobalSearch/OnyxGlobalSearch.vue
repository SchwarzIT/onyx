<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup>
import { iconSearch } from "@sit-onyx/icons";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxBasicDialog from "../OnyxBasicDialog/OnyxBasicDialog.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxGlobalSearchProps } from "./types.js";

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

const { t } = injectI18n();

const basicDialogProps = useForwardProps(props, OnyxBasicDialog);

const searchTerm = useVModel({
  props,
  emit,
  key: "modelValue",
  default: "",
});
</script>

<template>
  <OnyxBasicDialog
    v-bind="basicDialogProps"
    :label="t('globalSearch.label')"
    modal
    class="onyx-global-search"
    @update:open="emit('update:open', $event)"
  >
    <div class="onyx-global-search__content">
      <OnyxInput
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

      <div v-if="props.groups.length" class="onyx-global-search__body">
        <section v-for="group in props.groups" :key="group.label" class="onyx-global-search__group">
          <OnyxHeadline is="h4" class="onyx-global-search__headline">
            {{ group.label }}
          </OnyxHeadline>
        </section>
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

    &__group {
      padding: var(--onyx-density-md);

      &:last-of-type {
        border-top: var(--onyx-global-search-border);
      }
    }

    &__headline {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
