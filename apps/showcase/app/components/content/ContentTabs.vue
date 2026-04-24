<script lang="ts" setup>
import { createTabs } from "@sit-onyx/headless";
import { iconCode, iconToolColorFill } from "@sit-onyx/icons";
import type { SelectOption } from "sit-onyx";
import nuxtIcon from "~/assets/images/nuxt.svg?raw";
import vueIcon from "~/assets/images/vue.svg?raw";

type ContentTabValue = "dev" | "ux" | "vue" | "nuxt";

const slots = defineSlots<{
  [T in ContentTabValue]?: () => unknown;
}>();

const { t } = useI18n();

const availableTabs = computed(() => Object.keys(slots) as ContentTabValue[]);
const selectedTab = ref<ContentTabValue>(availableTabs.value[0] ?? "dev");

const options = computed(() => {
  const tabs = [
    { label: t("roles.devContent"), value: "dev", icon: iconCode },
    { label: t("roles.uxContent"), value: "ux", icon: iconToolColorFill },
    { label: "Vue", value: "vue", icon: vueIcon },
    { label: "Nuxt", value: "nuxt", icon: nuxtIcon },
  ] satisfies SelectOption<ContentTabValue>[];

  return tabs
    .filter((option) => availableTabs.value.includes(option.value))
    .sort((a, b) => availableTabs.value.indexOf(a.value) - availableTabs.value.indexOf(b.value));
});

const { elements } = createTabs({
  label: computed(() => ""),
  selectedTab,
  onSelect: (newValue) => (selectedTab.value = newValue),
});
</script>

<template>
  <div>
    <div class="tablist" v-bind="elements.tablist.value">
      <OnyxCard
        v-for="option in options"
        :key="option.value"
        clickable
        class="tab"
        v-bind="elements.tab.value({ value: option.value })"
      >
        <OnyxIcon v-if="option.icon" :icon="option.icon" class="tab__icon" />
        {{ option.label }}
      </OnyxCard>
    </div>

    <template v-for="(slot, slotName) in slots" :key="slotName">
      <div v-show="selectedTab === slotName" v-bind="elements.tabpanel.value({ value: slotName })">
        <component :is="slot" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tablist {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-sm);
  flex-wrap: wrap;
  margin-block: var(--onyx-markdown-renderer-margin-block);
}

.tab {
  --tab-background: var(--onyx-color-base-background-blank);
  --tab-background-hover: var(--onyx-color-base-neutral-200);
  --tab-border-color: var(--onyx-color-component-border-neutral);
  --tab-color: var(--onyx-color-text-icons-neutral-intense);
  --tab-icon-color: var(--onyx-color-text-icons-primary-intense);

  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  background-color: var(--tab-background);
  border-color: var(--tab-border-color);
  color: var(--tab-color);

  &:hover {
    background-color: var(--tab-background-hover);
  }

  &:focus-visible {
    outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
  }

  &[aria-selected="true"] {
    --tab-background: var(--onyx-color-base-primary-100);
    --tab-background-hover: var(--onyx-color-base-primary-200);
    --tab-border-color: var(--onyx-color-component-border-primary);
    --tab-color: var(--onyx-color-text-icons-primary-bold);
    --tab-icon-color: var(--tab-color);
  }

  &__icon {
    color: var(--tab-icon-color);
  }
}
</style>
