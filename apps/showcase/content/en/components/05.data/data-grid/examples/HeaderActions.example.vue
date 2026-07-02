<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  createFeature,
  HeaderAction,
  OnyxDataGrid,
  OnyxMenuItem,
  OnyxSystemButton,
  type ColumnConfig,
} from "sit-onyx";
import { computed, h } from "vue";

type Entry = {
  id: number;
  name: string;
  email: string;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Bob", email: "bob@example.com" },
    { id: 4, name: "Robin", email: "robin@example.com" },
    { id: 5, name: "John", email: "john@example.com" },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];
});

const withCustomHeaderActions = createFeature(() => ({
  name: Symbol("customHeaderActions"),
  header: {
    actions: (column) => {
      const headerActions: HeaderAction[] = [
        {
          iconComponent: {
            iconComponent: h(OnyxSystemButton, {
              label: "Example action",
              icon: iconPlaceholder,
              color: "medium",
            }),
            // optionally set "alwaysShowInHeader" if the iconComponent should always be shown directly inside the header
            // even if multiple actions exist, should we used rarely!
            // alwaysShowInHeader: true,
          },
          menuItems: [h(OnyxMenuItem, { label: "Action 1", icon: iconPlaceholder })],
          // optionally set "showFlyoutMenu" to always show the menuItems inside the flyout instead of the iconComponent
          // even if there is only a single action for the column
          // showFlyoutMenu: true,
        },
      ];

      // for this example, we add another header action only for the "email" column to demonstrate
      // how multiple actions are wrapped inside a flyout menu
      if (column.key === "email") {
        headerActions.push({
          iconComponent: h(OnyxSystemButton, {
            label: "Example action",
            icon: iconPlaceholder,
            color: "medium",
          }),
          menuItems: [h(OnyxMenuItem, { label: "Action 2", icon: iconPlaceholder })],
        });
      }

      return headerActions;
    },
  },
}));

const features = [withCustomHeaderActions];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
