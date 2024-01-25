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
  if (!activeTab.value || !props.tabs.find((tab) => tab.id === activeTab.value)) {
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

    <slot v-if="activeTab" :name="activeTab"></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.tabs {
  margin-bottom: 1rem;

  @include mixins.breakpoint(max, s) {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
