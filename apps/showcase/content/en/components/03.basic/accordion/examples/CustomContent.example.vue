<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxAccordion, OnyxAccordionItem, OnyxIcon, OnyxTag } from "sit-onyx";
import { ref } from "vue";

const openAccordions = ref<string[]>([]);
</script>

<template>
  <OnyxAccordion v-model="openAccordions">
    <OnyxAccordionItem value="item-1">
      <template #header>
        <div class="header">
          <div class="header__content">
            <OnyxIcon :icon="iconPlaceholder" />
            Header 1
          </div>

          <div class="header__trailing">
            <OnyxIcon :icon="iconPlaceholder" />
            <OnyxTag label="Tag" />
          </div>
        </div>
      </template>

      Content of the first accordion...
    </OnyxAccordionItem>

    <OnyxAccordionItem value="item-2">
      <template #header>
        <div class="header">
          <div class="header__content">
            <OnyxIcon :icon="iconPlaceholder" />
            Header 2
          </div>

          <div class="header__trailing">
            <OnyxIcon :icon="iconPlaceholder" />
            <OnyxTag label="Tag" />
          </div>
        </div>
      </template>

      Content of the second accordion...
    </OnyxAccordionItem>

    <OnyxAccordionItem value="item-3">
      <template #header>
        <div class="header">
          <div class="header__content">
            <OnyxIcon :icon="iconPlaceholder" />
            Header 3
          </div>

          <div class="header__trailing">
            <OnyxIcon :icon="iconPlaceholder" />
            <OnyxTag label="Tag" />
          </div>
        </div>
      </template>

      Content of the third accordion...
    </OnyxAccordionItem>
  </OnyxAccordion>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--onyx-accordion-item-gap);
  flex-wrap: wrap;
  flex-grow: 1;

  &__content {
    display: flex;
    align-items: center;
    gap: var(--onyx-accordion-item-header-gap);
    flex-wrap: wrap;
  }

  &__trailing {
    display: flex;
    align-items: center;
    gap: var(--onyx-accordion-item-header-gap);
    flex-wrap: wrap;
  }
}
</style>
