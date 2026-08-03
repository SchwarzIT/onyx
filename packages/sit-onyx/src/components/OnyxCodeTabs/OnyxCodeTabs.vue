<script lang="ts" setup generic="TValue extends PropertyKey = PropertyKey">
import { iconFileCopy } from "@sit-onyx/icons";
import { computed, provide, ref } from "vue";
import { useCopy } from "../../composables/useCopy.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxTabs from "../OnyxTabs/OnyxTabs.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import { CODE_TABS_INJECTION_KEY, type OnyxCodeTabsProps } from "./types.js";

const props = defineProps<OnyxCodeTabsProps<TValue>>();

const emit = defineEmits<{
  /**
   * Emitted when the currently active tab changes.
   */
  "update:modelValue": [value: TValue];
}>();

defineSlots<{
  /**
   * Slots for tab components. Only `OnyxCodeTab` should be used here.
   */
  default(): unknown;
}>();

const { t } = injectI18n();

const tabsProps = useForwardProps(props, OnyxTabs);

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
});

const tabs = ref(new Map<PropertyKey, string | HTMLElement>());
provide(CODE_TABS_INJECTION_KEY, { tabs });

const activeTabCode = computed(() => tabs.value.get(modelValue.value));

const { copyStatus, copy: handleCopy } = useCopy({ source: () => activeTabCode.value || "" });
</script>

<template>
  <OnyxTabs
    v-bind="tabsProps"
    v-model="modelValue"
    class="onyx-code-tabs"
    :label="props.label ?? t('codeTabs.label')"
    size="h3"
    density="compact"
  >
    <slot></slot>

    <template #actions>
      <OnyxSystemButton
        v-if="!copyStatus && activeTabCode"
        :label="t('codeTabs.copySnippet')"
        :icon="iconFileCopy"
        @click="handleCopy"
      />
      <OnyxTag v-else-if="copyStatus === 'success'" :label="t('codeTabs.copied')" color="success" />
      <OnyxTag v-else-if="copyStatus === 'error'" :label="t('codeTabs.failed')" color="danger" />
    </template>
  </OnyxTabs>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-code-tabs {
  @include layers.component() {
    --onyx-code-group-border: var(--onyx-1px-in-rem) solid
      var(--onyx-color-component-border-neutral);
    --onyx-code-group-tablist-padding: var(--onyx-density-xs);
    --onyx-tabs-tablist-margin-bottom: 0;
    border-radius: var(--onyx-radius-md);

    .onyx-tabs {
      &__tablist {
        padding: 0;
      }

      &__header {
        background-color: var(--onyx-color-base-background-blank);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        border: var(--onyx-code-group-border);
        padding: var(--onyx-code-group-tablist-padding);
        padding-right: calc(var(--onyx-code-group-tablist-padding) + var(--onyx-density-xs));

        // fix layout shift when outline is shown since the OnyxTabs use a padding/margin workaround when the outline is shown due to the "overflow: hidden"
        &:has(.onyx-tab:focus-visible) {
          padding-top: 0;
          padding-left: 0;
          padding-bottom: 0;

          .onyx-tabs__tablist {
            margin: 0;
            padding: var(--onyx-code-group-tablist-padding);
          }
        }
      }
    }
  }
}
</style>
