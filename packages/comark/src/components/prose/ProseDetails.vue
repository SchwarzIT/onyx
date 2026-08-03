<script lang="ts" setup>
import { injectI18n, OnyxAccordion, OnyxAccordionItem } from "sit-onyx";
import { provide, useId, useTemplateRef } from "vue";
import { PROSE_DETAILS_INJECTION_KEY } from "./utils.js";

defineSlots<{
  default(): unknown;
}>();

const { t } = injectI18n();
const id = useId();

const headerRef = useTemplateRef("header");
provide(PROSE_DETAILS_INJECTION_KEY, { headerRef });
</script>

<template>
  <OnyxAccordion class="accordion" type="card">
    <OnyxAccordionItem :value="id">
      <template #header>
        <div class="header">
          <span class="header__placeholder"> {{ t("accordion.toggle") }} </span>
          <span ref="header" class="header__content"> </span>
        </div>
      </template>

      <slot></slot>
    </OnyxAccordionItem>
  </OnyxAccordion>
</template>

<style lang="scss" scoped>
.accordion {
  margin-block: var(--onyx-markdown-renderer-margin-block);
}

.header {
  // hide placeholder text if content exists / is teleported from ProseSummary.vue
  &:has(&__content:not(:empty)) {
    .header__placeholder {
      display: none;
    }
  }
}
</style>
