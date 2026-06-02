<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import EditableDataGrid from "../components/EditableDataGrid.vue";
import SystemDataGrid from "../components/SystemDataGrid.vue";
import UserDataGrid from "../components/UserDataGrid.vue";

const modelValue = ref("user-tab");
const { t } = useI18n();
</script>

<template>
  <div class="page">
    <OnyxHeadline is="h1"> {{ t("dataGrid.pageName") }}</OnyxHeadline>
    <OnyxTabs v-model="modelValue" :label="t('dataGrid.tabs')">
      <OnyxTab :label="t('dataGrid.userTab')" value="user-tab">
        <UserDataGrid />
      </OnyxTab>
      <OnyxTab :label="t('dataGrid.systemTab')" value="system-data">
        <SystemDataGrid />
      </OnyxTab>
      <OnyxTab :label="t('dataGrid.editableTab')" value="editable-data">
        <EditableDataGrid />
      </OnyxTab>
    </OnyxTabs>
  </div>
</template>
