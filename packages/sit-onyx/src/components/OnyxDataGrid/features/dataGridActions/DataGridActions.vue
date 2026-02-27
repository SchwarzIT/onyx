<script setup lang="ts">
import { iconMoreVertical } from "@sit-onyx/icons";
import { computed } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxIconButton from "../../../OnyxIconButton/OnyxIconButton.vue";
import OnyxMoreList from "../../../OnyxMoreList/OnyxMoreList.vue";
import OnyxFlyoutMenu from "../../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSeparator from "../../../OnyxSeparator/OnyxSeparator.vue";
import DataGridActionButton from "./DataGridActionButton.vue";
import {
  DATA_GRID_ACTIONS_INJECTION_KEY,
  type DataGridAction,
  type DataGridActionGroup,
} from "./types.js";

const props = defineProps<{
  /**
   * A list of actions to be displayed in the action slot.
   */
  actions: DataGridAction[];
}>();

const getGroupInfo = (g?: string | DataGridActionGroup) => {
  if (!g) return { name: "default", order: 0 };
  if (typeof g === "string") return { name: g, order: 0 };
  return { name: g.name, order: g.order };
};

const sortedActions = computed(() => {
  const groups: Record<string, { order: number; actions: DataGridAction[] }> = {};

  props.actions.forEach((action) => {
    const { name, order } = getGroupInfo(action.group);
    if (!groups[name]) {
      groups[name] = { order, actions: [] };
    } else if (order !== 0) {
      groups[name].order = order;
    }
    groups[name].actions.push(action);
  });

  return Object.values(groups)
    .sort((a, b) => a.order - b.order)
    .flatMap((group) => [...group.actions].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
});

const getGroupName = (g?: string | DataGridActionGroup) =>
  typeof g === "object" && g !== null ? g.name : (g ?? "default");

const shouldShowSeparator = (list: DataGridAction[], index: number): boolean => {
  if (index <= 0) return false;
  return getGroupName(list[index - 1]?.group) !== getGroupName(list[index]?.group);
};

const { t } = injectI18n();
</script>

<template>
  <OnyxMoreList
    class="onyx-data-grid-actions"
    direction="rtl"
    :injection-key="DATA_GRID_ACTIONS_INJECTION_KEY"
  >
    <template #default="{ attributes }">
      <div v-bind="attributes">
        <DataGridActionButton
          v-for="(action, index) in sortedActions"
          :key="index"
          v-bind="action"
          :show-separator="shouldShowSeparator(sortedActions, index)"
        />
      </div>
    </template>

    <template #more="{ attributes, hiddenElements }">
      <OnyxFlyoutMenu v-bind="attributes" :label="t('navigation.showMoreNavItemsLabel')">
        <template #button="{ trigger }">
          <OnyxIconButton
            v-bind="trigger"
            :icon="iconMoreVertical"
            :label="t('navigation.moreNavItems', { n: hiddenElements })"
            color="neutral"
          />
        </template>

        <template #options>
          <div class="onyx-flyout-menu-content">
            <template v-for="(action, index) in sortedActions.slice(-hiddenElements!)" :key="index">
              <OnyxSeparator
                v-if="shouldShowSeparator(sortedActions.slice(-hiddenElements!), index)"
                orientation="horizontal"
              />
              <OnyxMenuItem :icon="action.icon" :label="action.label" @click="action.onClick" />
            </template>
          </div>
        </template>
      </OnyxFlyoutMenu>
    </template>
  </OnyxMoreList>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-data-grid-actions {
  @include layers.component() {
    width: unset;
    flex-grow: 1;
    justify-content: flex-end;
  }
}
</style>
