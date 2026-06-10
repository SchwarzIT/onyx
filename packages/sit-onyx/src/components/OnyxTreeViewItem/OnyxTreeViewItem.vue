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

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<OnyxTreeViewItemProps>(), {
  open: undefined,
  disabled: false,
  active: false,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  itemSelect: [value: void];
}>();

const slots = defineSlots<{
  /**
   * TreeViewItem content.
   */
  default(): unknown;
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
    class="onyx-component onyx-tree-view-item"
    :class="[densityClass]"
    role="none"
    :style="{ '--onyx-tree-view-level': level }"
  >
    <OnyxListItem
      is="div"
      :selected="props.active"
      :active="props.active"
      :disabled="props.disabled"
      class="onyx-tree-view-item__trigger"
      v-bind="mergeVueProps(treeItem, $attrs)"
    >
      <div
        v-if="hasChildren"
        class="onyx-tree-view-item__expander"
        :class="{ 'onyx-tree-view-item__expander--rotated': isOpen }"
      >
        <OnyxIcon :icon="iconChevronRightSmall" size="16px" />
      </div>
      <div v-else class="onyx-tree-view-item__expander-placeholder"></div>

      <OnyxIcon v-if="props.icon" :icon="props.icon" class="onyx-tree-view-item__icon" />

      <span class="onyx-truncation-ellipsis">
        {{ props.label }}
      </span>
    </OnyxListItem>

    <ul
      v-if="hasChildren"
      v-show="isOpen"
      class="onyx-tree-view-item__children"
      :class="`onyx-tree-view-item__children--level-${level}`"
      role="group"
    >
      <slot></slot>
    </ul>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-tree-view-item {
  .onyx-list-item:not(:hover, :focus),
  .onyx-list-item[aria-disabled="true"] {
    background-color: transparent;
  }

  @include layers.component() {
    display: block;
    width: 100%;
    --icon-size: 1rem;

    .onyx-tree-view-item__trigger {
      padding-left: calc(
        (var(--onyx-tree-view-level) - 1) * var(--onyx-spacing-lg) + var(--onyx-density-xs)
      );
    }
    .onyx-sidebar-item {
      padding-left: calc(
        (var(--onyx-tree-view-level)) * var(--onyx-spacing-lg) + var(--onyx-density-xs) +
          var(--icon-size) + var(--onyx-density-sm)
      );
    }

    &__trigger {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-radius: var(--onyx-radius-sm);
      padding-left: var(--onyx-density-xs);
    }

    &__expander {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-size);
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--onyx-color-text-icons-neutral-medium);

      &--rotated {
        transform: rotate(90deg);
      }
    }

    &__expander-placeholder {
      width: var(--icon-size);
    }

    &__children {
      padding: 0;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
