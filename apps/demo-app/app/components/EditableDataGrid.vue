<script setup lang="ts">
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import type { ColumnConfig } from "sit-onyx";
import {
  DataGridFeatures,
  OnyxAccordion,
  OnyxAccordionItem,
  OnyxBadge,
  OnyxDataGrid,
  OnyxHeadline,
  OnyxMenuItem,
  OnyxSeparator,
  OnyxSidebar,
  OnyxSlider,
  OnyxSplitButton,
} from "sit-onyx";
import type { EditState } from "sit-onyx/dist/components/OnyxDataGrid/features/all.js";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

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
const editState = ref<EditState<FoodProduct>>({});
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

const features = computed(() => [
  useRowClickFeature<FoodProduct>(handleRowClick),
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
  <div class="options">
    <OnyxSplitButton
      :label="
        isEditable ? t('dataGrid.editableTable.actions.save') : t('dataGrid.editableTable.edit')
      "
      @click="() => (isEditable = !isEditable)"
    >
      <template #options>
        <template v-if="!isEditable">
          <OnyxMenuItem :label="t('dataGrid.editableTable.actions.send')" />
          <OnyxMenuItem :label="t('dataGrid.editableTable.actions.check')" />
        </template>
        <OnyxMenuItem v-else :label="t('dataGrid.editableTable.actions.reset')" @click="reset" />
      </template>
    </OnyxSplitButton>
  </div>

  <OnyxDataGrid :columns :data :features />

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
            <span class="article-infos__label">{{
              t("dataGrid.editableTable.product.fields.price")
            }}</span>
            {{ priceValue.toFixed(2) }}€
          </li>
          <li>
            <span class="article-infos__label">{{
              t("dataGrid.editableTable.product.fields.validFrom")
            }}</span>
            {{ currentProduct.validFrom.toLocaleDateString() }}
          </li>
          <li>
            <span class="article-infos__label">{{
              t("dataGrid.editableTable.product.fields.validUntil")
            }}</span>
            {{ currentProduct.validUntil.toLocaleDateString() }}
          </li>
        </ul>
      </div>

      <OnyxSeparator />

      <div class="sidebar-content-inner">
        <OnyxHeadline is="h3">{{ t("dataGrid.editableTable.product.fields.price") }}</OnyxHeadline>
        <OnyxSlider
          v-model="priceValue"
          :max="50"
          label="slider"
          :step="0.1"
          :marks="[
            { value: 0, label: '0€' },
            { value: 50, label: '50€' },
          ]"
        />
      </div>

      <div class="sidebar-content-inner">
        <OnyxHeadline is="h3">{{
          t("dataGrid.editableTable.product.fields.allergens")
        }}</OnyxHeadline>
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
