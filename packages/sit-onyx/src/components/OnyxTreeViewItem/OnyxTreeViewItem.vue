<script lang="ts" setup>
import { createTreeViewItem } from "@sit-onyx/headless";
import { iconChevronRightSmall } from "@sit-onyx/icons";
import { computed, inject, provide, toRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useVModel } from "../../composables/useVModel.js";
import { mergeVueProps } from "../../utils/attrs.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import { TREE_VIEW_INJECTION_KEY } from "../OnyxTreeView/types.js";
import type { OnyxTreeViewItemProps } from "./types.js";

// we are binding the "$attrs" to a different element
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<OnyxTreeViewItemProps>(), {
  open: undefined,
  disabled: false,
  active: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the children of the item are toggled.
   */
  "update:open": [value: boolean];
  /**
   * Emitted when the item is selected.
   */
  itemSelect: [value: void];
}>();

const slots = defineSlots<{
  /**
   * Nested child items. Recommend to use `OnyxTreeViewItem` components here.
   */
  default(): unknown;
  /**
   * Optional slot to place custom content for the item. By default, the `label` and `icon` property will be shown.
   */
  item?(): unknown;
}>();

const isOpen = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const { densityClass } = useDensity(props);
const hasChildren = computed(() => !!slots.default);

const treeContext = inject(TREE_VIEW_INJECTION_KEY, () => ({ level: 0 }), true);
const level = treeContext.level + 1;
provide(TREE_VIEW_INJECTION_KEY, { level });

const {
  elements: { treeItem },
} = createTreeViewItem({
  disabled: toRef(props, "disabled"),
  level,
  isOpen,
  hasChildren,
  onSelect: () => emit("itemSelect"),
  onToggle: (open) => (isOpen.value = open),
});
</script>

<template>
  <li
    :class="['onyx-component', 'onyx-tree-view-item', densityClass]"
    role="none"
    :style="{ '--onyx-tree-view-level': level }"
  >
    <OnyxListItem
      is="div"
      :selected="props.active"
      :active="props.active"
      :disabled="props.disabled"
      class="onyx-tree-view-item__trigger onyx-truncation-ellipsis"
      v-bind="mergeVueProps(treeItem, $attrs)"
    >
      <div class="onyx-tree-view-item__icon">
        <OnyxIcon v-if="hasChildren" :icon="iconChevronRightSmall" size="16px" />
      </div>

      <div class="onyx-tree-view-item__content onyx-truncation-ellipsis">
        <slot name="item">
          <OnyxIcon v-if="props.icon" :icon="props.icon" />
          <span v-if="props.label" class="onyx-truncation-ellipsis"> {{ props.label }} </span>
        </slot>
      </div>
    </OnyxListItem>

    <ul v-if="hasChildren" v-show="isOpen" class="onyx-tree-view-item__children" role="group">
      <slot></slot>
    </ul>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-tree-view-item {
  @include layers.component() {
    --onyx-tree-view-item-icon-size: 1rem;
    display: block;
    width: 100%;

    &__trigger {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-radius: var(--onyx-radius-sm);
      padding-left: var(--onyx-density-xs);

      &:not(:hover, :focus),
      &[aria-disabled="true"] {
        background-color: transparent;
      }

      &[aria-expanded="true"] {
        .onyx-tree-view-item__icon {
          transform: rotate(90deg);
        }
      }
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--onyx-tree-view-item-icon-size);
      transition: transform var(--onyx-duration-sm) ease;
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &__content {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-sm);
      flex-grow: 1;
    }

    &__children {
      font-family: var(--onyx-font-family-paragraph);
      color: var(--onyx-color-text-icons-neutral-intense);
      padding: 0;
      display: flex;
      flex-direction: column;
    }

    .onyx-tree-view-item__trigger {
      padding-left: calc(
        (var(--onyx-tree-view-level) - 1) * var(--onyx-spacing-lg) + var(--onyx-density-xs)
      );
    }

    .onyx-sidebar-item {
      padding-left: calc(
        (var(--onyx-tree-view-level)) * var(--onyx-spacing-lg) + var(--onyx-density-xs) +
          var(--onyx-tree-view-item-icon-size) + var(--onyx-density-sm)
      );
    }
  }
}
</style>
