<script lang="ts" setup>
import { ref, watchEffect } from "vue";

export type Tab = {
  id: string;
  label: string;
};

const props = defineProps<{
  /** Tabs to show. Same as Vitepress code group but arbitrary tab content can be shown. */
  tabs: Tab[];
}>();

const activeTab = ref();

watchEffect(() => {
  if (!props.tabs.length) return;
  if (!props.tabs.find((tab) => tab.id === activeTab.value)) {
    activeTab.value = props.tabs[0].id;
  }
});
</script>

<template>
  <div class="vp-code-group">
    <!-- the styles for the tabs will come directly from VitePress -->
    <div class="tabs">
      <template v-for="tab in props.tabs" :key="tab.id">
        <input
          :id="tab.id"
          type="radio"
          :checked="activeTab === tab.id"
          @input="activeTab = tab.id"
        />
        <label :for="tab.id">{{ tab.label }}</label>
      </template>
    </div>

    <template v-for="tab in props.tabs" :key="tab.id">
      <slot v-if="tab.id === activeTab" :name="tab.id"></slot>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  margin-bottom: 1rem;
}
</style>
