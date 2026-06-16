<script setup lang="ts">
import { iconArrowSmallUpRight, iconFileCircleCheck } from "@sit-onyx/icons";
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import "@sit-onyx/tiptap/style.css";
import { createFeature, DataGridFeatures, type ColumnConfig } from "sit-onyx";

type FoodProduct = {
  id: number;
  name: string;
  quantity: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  price: number;
  allergens: string[];
};

const data = ref<FoodProduct[]>([
  {
    id: 1,
    name: "Classic Margherita Pizza",
    quantity: 25,
    validFrom: new Date("2024-01-01"),
    validUntil: new Date("2024-12-31"),
    isActive: true,
    price: 12.5,
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: 2,
    name: "Vegan Quinoa Bowl",
    quantity: 12,
    validFrom: new Date("2024-05-15"),
    validUntil: new Date("2025-05-15"),
    isActive: true,
    price: 14.9,
    allergens: ["Soy", "Sesame"],
  },
  {
    id: 3,
    name: "Peanut Butter Protein Bar",
    quantity: 150,
    validFrom: new Date("2024-02-01"),
    validUntil: new Date("2024-08-01"),
    isActive: false,
    price: 2.99,
    allergens: ["Peanuts", "Nuts", "Soy"],
  },
  {
    id: 4,
    name: "Fresh Garden Salad",
    quantity: 8,
    validFrom: new Date("2024-06-01"),
    validUntil: new Date("2024-06-07"),
    isActive: true,
    price: 9.0,
    allergens: [],
  },
]);

const { t } = useI18n();

const columns = computed<ColumnConfig<FoodProduct>[]>(() => [
  { key: "id", label: t("dataGrid.editableTable.product.fields.id"), width: "min-content" },
  { key: "name", label: t("dataGrid.editableTable.product.fields.name") },
  { key: "quantity", label: t("dataGrid.editableTable.product.fields.count"), type: "number" },
  { key: "validFrom", label: t("dataGrid.editableTable.product.fields.validFrom"), type: "date" },
  { key: "validUntil", label: t("dataGrid.editableTable.product.fields.validUntil"), type: "date" },
  {
    key: "isActive",
    label: t("dataGrid.editableTable.product.fields.active"),
    type: "boolean",
    width: "6rem",
  },
]);

const isEditable = ref(false);
const editState = ref<DataGridFeatures.EditState<FoodProduct>>({});
const currentCodeTab = ref("tab-1");
const isSidebarOpen = ref(false);
const currentProduct = ref<FoodProduct | null>(null);

const priceValue = ref(0);
watch(currentProduct, (newVal) => {
  if (newVal) priceValue.value = newVal.price;
});

const handleRowClick = (row: FoodProduct) => {
  if (isEditable.value) return;
  currentProduct.value = row;
  isSidebarOpen.value = true;
};

const withCustomActions = createFeature(() => ({
  name: Symbol("custom actions feature"),

  actions: () => {
    const gridActions: DataGridFeatures.DataGridAction[] = [];

    if (!isEditable.value) {
      gridActions.push(
        {
          label: t("dataGrid.editableTable.actions.check"),
          icon: iconFileCircleCheck,
          color: "neutral",
          onClick: () => {},
        },
        {
          label: t("dataGrid.editableTable.actions.send"),
          icon: iconArrowSmallUpRight,
          color: "neutral",
        },
      );
    } else {
      gridActions.push({
        label: t("dataGrid.editableTable.actions.reset"),
        color: "neutral",
        displayAs: "button",
        mode: "plain",
        group: "group-1",
        onClick: reset,
      });
    }

    gridActions.push({
      label: isEditable.value
        ? t("dataGrid.editableTable.actions.save")
        : t("dataGrid.editableTable.edit"),
      displayAs: "button",
      mode: "plain",
      group: "group-1",
      onClick: () => (isEditable.value = !isEditable.value),
    });

    return gridActions;
  },
}));

const withCustomSlots = createFeature(() => ({
  name: Symbol("custom slots feature"),
  slots: {
    bottomLeft: (slotContent) => [
      h("span", { class: "onyx-text--small" }, t("dataGrid.editableTable.info")),
      ...slotContent(),
    ],
  },
}));

const features = computed(() => [
  useRowClickFeature<FoodProduct>(handleRowClick),
  withCustomActions,
  withCustomSlots,
  DataGridFeatures.useEditing<FoodProduct>({
    enabled: isEditable,
    mode: "manual",
    editState,
    columns: {
      id: { enabled: false },
    },
  }),
]);

const reset = () => {
  editState.value = {};
  isEditable.value = false;
};
</script>

<template>
  <OnyxDataGrid :columns :data :features :headline="t('dataGrid.editableTable.product.headline')" />

  <OnyxSidebar
    class="notification-center"
    :label="t('dataGrid.editableTable.details')"
    alignment="right"
    :temporary="{ open: isSidebarOpen, floating: false }"
    @close="isSidebarOpen = false"
  >
    <template #headline="{ label }">
      <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>
    </template>

    <div v-if="currentProduct" class="sidebar-content">
      <div class="article-infos">
        <OnyxHeadline is="h3">{{ currentProduct.name }}</OnyxHeadline>
        <ul>
          <li>
            <span class="article-infos__label">
              {{ t("dataGrid.editableTable.product.fields.price") }}
            </span>
            {{ $n(priceValue, "currency") }}
          </li>
          <li>
            <span class="article-infos__label">
              {{ t("dataGrid.editableTable.product.fields.validFrom") }}
            </span>
            {{ $d(currentProduct.validFrom, "date") }}
          </li>
          <li>
            <span class="article-infos__label">
              {{ t("dataGrid.editableTable.product.fields.validUntil") }}
            </span>
            {{ $d(currentProduct.validUntil, "date") }}
          </li>
        </ul>
      </div>

      <OnyxSeparator />

      <div class="sidebar-content-inner">
        <OnyxHeadline is="h3">{{ t("dataGrid.editableTable.product.fields.price") }}</OnyxHeadline>
        <OnyxSlider
          v-model="priceValue"
          :max="50"
          :label="t('dataGrid.editableTable.product.fields.price')"
          :step="0.1"
          :tooltip="{ formatter: (value) => $n(value, 'currency') }"
          :marks="[
            { value: 0, label: $n(0, 'currency') },
            { value: 50, label: $n(50, 'currency') },
          ]"
        />
      </div>

      <div class="sidebar-content-inner">
        <OnyxHeadline is="h3">
          {{ t("dataGrid.editableTable.product.fields.allergens") }}
        </OnyxHeadline>
        <div class="allergens-wrapper">
          <OnyxBadge v-for="allergen in currentProduct.allergens" :key="allergen">
            {{ allergen }}
          </OnyxBadge>
          <span v-if="currentProduct.allergens.length === 0" class="empty-text">
            {{ t("dataGrid.editableTable.product.noAllergens") }}
          </span>
        </div>
      </div>

      <OnyxAccordion class="notification-center__accordions" type="nested-small">
        <OnyxAccordionItem value="description">
          <template #header> {{ t("dataGrid.editableTable.product.description") }} </template>
          <OnyxTextEditor
            :label="{ label: currentProduct.name, hidden: true }"
            :placeholder="t('dataGrid.editableTable.product.placeholder')"
          />
        </OnyxAccordionItem>

        <OnyxAccordionItem value="embed">
          <template #header> {{ t("dataGrid.editableTable.product.embed") }} </template>
          <OnyxCodeTabs v-model="currentCodeTab" label="Integration Snippets">
            <OnyxCodeTab
              :code="`<div id='food-widget-${currentProduct?.id}' data-price='${priceValue.toFixed(2)}'></div>`"
              label="HTML"
              language="html"
              value="tab-1"
            />
            <OnyxCodeTab
              :code="`const product = ${JSON.stringify({ ...currentProduct, price: priceValue }, null, 2)};`"
              label="JSON"
              language="javascript"
              value="tab-2"
            />
          </OnyxCodeTabs>
        </OnyxAccordionItem>
      </OnyxAccordion>
    </div>
  </OnyxSidebar>
</template>

<style scoped lang="scss">
.options {
  margin-bottom: var(--onyx-density-xs);
  display: flex;
  justify-content: flex-end;
}
.sidebar-content {
  display: flex;
  flex-direction: column;
}
.sidebar-content-inner {
  padding: var(--onyx-density-md);
}

.article-infos {
  padding: var(--onyx-density-md);
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: var(--onyx-density-2xs);
      display: flex;
      justify-content: space-between;
      .article-infos__label {
        color: var(--onyx-color-text-icons-neutral-medium);
      }
    }
  }
}

.allergens-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: var(--onyx-density-xs);
  margin-top: var(--onyx-density-xs);
}

.empty-text {
  font-style: italic;
  color: var(--onyx-color-text-icons-neutral-soft);
}
</style>
