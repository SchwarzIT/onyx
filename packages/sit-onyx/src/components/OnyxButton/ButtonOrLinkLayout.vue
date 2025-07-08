<script lang="ts" setup>
import { computed } from "vue";
import { extractLinkProps } from "../../utils/router.js";
import { useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxButtonProps } from "./types.js";

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
  >
    <slot></slot>
  </button>
</template>
