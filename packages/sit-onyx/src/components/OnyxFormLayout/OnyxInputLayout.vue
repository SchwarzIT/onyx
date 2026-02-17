<script lang="ts" setup>
import { useForwardProps } from "../../utils/props.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import type { OnyxInputLayoutProps } from "./types.js";

const props = defineProps<OnyxInputLayoutProps>();

const slots = defineSlots<{
  default(props: { id: string }): unknown;
  leading?(): unknown;
  trailing?(): unknown;
  leadingIcons?(): unknown;
  trailingIcons?(): unknown;
}>();

const formElementProps = useForwardProps(props, OnyxFormElement);
</script>

<template>
  <OnyxFormElement class="onyx-input-layout" v-bind="formElementProps" :label="props.label">
    <template #default="{ id: inputId }">
      <div class="onyx-input-layout__wrapper">
        <div v-if="slots.leading" class="onyx-input-layout__leading">
          <slot name="leading"></slot>
        </div>

        <div v-if="slots.leadingIcons" class="onyx-input-layout__icon-left">
          <slot name="leadingIcons"></slot>
        </div>

        <slot :id="inputId"></slot>

        <div v-if="slots.trailingIcons" class="onyx-input-layout__icon-right">
          <slot name="trailingIcons"></slot>
        </div>

        <div v-if="slots.trailing" class="onyx-input-layout__trailing">
          <slot name="trailing"></slot>
        </div>
      </div>
    </template>
  </OnyxFormElement>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-input-layout,
.onyx-input-layout-skeleton {
  @include layers.component() {
    --onyx-input-layout-padding-block: var(--onyx-density-xs);
    --onyx-input-layout-padding-inline: var(--onyx-density-xs);
  }
}

.onyx-input-layout {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-input-layout",
      $vertical-padding: var(--onyx-input-layout-padding-block)
    );

    &__wrapper {
      padding: 0;
      gap: 0;
    }

    &__native {
      padding: var(--onyx-input-layout-padding-block) var(--onyx-input-layout-padding-inline);
    }

    &__icon-left,
    &__icon-right {
      padding-block: var(--onyx-input-layout-padding-block);
      display: flex;
      gap: var(--onyx-density-xs);
    }

    &__icon-left {
      padding-left: var(--onyx-input-layout-padding-inline);
    }

    &__icon-right {
      padding-right: var(--onyx-input-layout-padding-inline);
    }

    &__leading,
    &__trailing {
      height: 100%;
      display: flex;
      align-items: center;

      .onyx-select-input__wrapper {
        border: none;
        background-color: transparent;
        padding-block: var(--onyx-input-layout-padding-block);
        padding-inline: var(--onyx-input-layout-padding-inline);
      }
    }

    &__leading {
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }

    &__trailing {
      border-left: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }
  }
}
</style>
