<script lang="ts" setup>
import {
  CLOSING_KEYS,
  OPENING_KEYS,
  useOutsideClick,
  type VueTemplateRefElement,
} from "@sit-onyx/headless";
import { computed, ref, type AriaAttributes } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { mergeVueProps } from "../../utils/attrs.js";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";
import type { OnyxFormElementV2Props } from "./types.js";

const props = defineProps<OnyxFormElementV2Props>();

const emit = defineEmits<{
  /**
   * Emitted when the popover open state changes.
   */
  "update:open": [open: boolean];
}>();

const slots = defineSlots<{
  default(props: { trigger?: AriaAttributes; input?: object }): unknown;
  popover?(): unknown;
}>();

const open = useVModel({ props, emit, key: "open", default: false });

const label = computed(() => {
  return typeof props.label === "object" ? props.label.label : props.label;
});

const inside = ref<VueTemplateRefElement<Element>>(null);

useOutsideClick({
  inside,
  checkOnTab: true,
  disabled: computed(() => !slots.popover || !open.value),
  onOutsideClick: () => {
    open.value = false;
  },
});

/**
 * We prevent manual user input. The native input only represents
 * the label(s) of what is selected and shouldn't be overwritten manually.
 * We only allow all pressed keys that handle interaction with the form element.
 */
const blockTyping = (event: KeyboardEvent) => {
  event.preventDefault();
  if (OPENING_KEYS.includes(event.key) && !open.value) {
    open.value = true;
  }
  if (CLOSING_KEYS.includes(event.key) && open.value) {
    open.value = false;
  }
};
</script>

<template>
  <OnyxBasicPopover
    v-if="slots.popover"
    v-model:open="open"
    class="onyx-form-element-v2__popover"
    :label
    v-bind="props.popoverOptions"
  >
    <template #default="{ trigger }">
      <slot
        :trigger="
          mergeVueProps(trigger, {
            role: 'combobox',
            ref: (el) => (inside = el),
          })
        "
        :input="{ onKeydown: blockTyping }"
      ></slot>
    </template>

    <template #content>
      <slot name="popover"></slot>
    </template>
  </OnyxBasicPopover>

  <slot v-else></slot>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-element-v2 {
  @include layers.component() {
    &__popover {
      flex-grow: 1;
      border-radius: inherit;
      height: 100%;
    }

    &:has(&__popover) {
      .onyx-form-element-v2__input-container {
        .onyx-form-element-v2__input {
          caret-color: transparent;
        }

        &:has(.onyx-form-element-v2__input:enabled) {
          cursor: pointer;

          .onyx-form-element-v2__input {
            cursor: inherit;
          }
        }
      }
    }
  }
}
</style>
