<script lang="ts" setup>
import { CLOSING_KEYS, OPENING_KEYS, useOutsideClick } from "@sit-onyx/headless";
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
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
  default(props: { input?: object }): unknown;
  popover?(): unknown;
}>();

const open = useVModel({ props, emit, key: "open", default: false });

const label = computed(() => {
  return typeof props.label === "object" ? props.label.label : props.label;
});

const popover = useTemplateRef("popover");

useOutsideClick({
  inside: popover,
  checkOnTab: true,
  disabled: computed(() => !slots.popover || !open.value),
  onOutsideClick: async () => {
    // nextTick() is needed to prevent duplicate open toggles for e.g. the OnyxSelect
    // where the outside click might be handled externally (e.g. in headless composable)
    await nextTick();
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

/**
 * When using a popover, the native input is effectively readonly, so the :user-invalid CSS will never apply.
 * To workaround this, the track if the select has ever been closed and consider this as "touched" / interacted.
 */
const isTouched = ref(false);
const stopWatch = watch(open, (newOpen, oldOpen) => {
  if (oldOpen && !newOpen) {
    isTouched.value = true;
    stopWatch();
  }
});

const inputProps = computed(() => {
  return {
    role: "combobox",
    onKeydown: blockTyping,
    class: [{ "onyx-form-element-v2__input--touched": isTouched.value }],
  };
});
</script>

<template>
  <OnyxBasicPopover
    v-if="slots.popover"
    ref="popover"
    v-model:open="open"
    class="onyx-form-element-v2__popover"
    :label
    v-bind="props.popoverOptions"
  >
    <template #default="{ trigger }">
      <slot :input="mergeVueProps(trigger, inputProps)"></slot>
    </template>

    <template #content>
      <slot name="popover"></slot>

      <div
        v-if="props.popoverOptions?.description"
        class="onyx-form-element-v2__popover-description"
      >
        {{ props.popoverOptions.description }}
      </div>
    </template>
  </OnyxBasicPopover>

  <slot v-else></slot>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-element-v2 {
  @include layers.component() {
    &__popover {
      --onyx-basic-popover-max-width: 100%;
      flex-grow: 1;
      border-radius: inherit;
      height: 100%;

      > .onyx-form-element-v2__input {
        caret-color: transparent;

        &:read-write {
          cursor: pointer;
        }
      }
    }

    &__popover-description {
      display: flex;
      width: 100%;
      padding: var(--onyx-density-3xs) var(--onyx-density-sm);
      justify-content: flex-end;
      text-align: right;
      align-items: center;
      gap: var(--onyx-spacing-md);
      color: var(--onyx-color-text-icons-neutral-soft);
      font-size: var(--onyx-font-size-sm);
      line-height: var(--onyx-font-line-height-sm);
    }
  }
}
</style>
