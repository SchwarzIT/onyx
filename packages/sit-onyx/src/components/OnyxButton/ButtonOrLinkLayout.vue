<script lang="ts" setup>
import { computed } from "vue";
import { extractLinkProps } from "../../utils/router";
import { useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxButtonProps } from "./types";

const props = withDefaults(
  defineProps<Pick<OnyxButtonProps, "disabled" | "link" | "loading" | "type" | "autofocus">>(),
  { type: "button" },
);

defineSlots<{
  /**
   * Button content.
   */
  default(): unknown;
}>();

const { disabled } = useFormContext(props);

const linkProps = computed(() =>
  props.link != undefined ? extractLinkProps(props.link) : undefined,
);
</script>

<template>
  <OnyxRouterLink v-if="linkProps" v-bind="linkProps">
    <slot></slot>
  </OnyxRouterLink>

  <button
    v-else
    :disabled="disabled || props.loading"
    :type="props.type"
    :autofocus="props.autofocus"
    tabindex="0"
  >
    <slot></slot>
  </button>
</template>
