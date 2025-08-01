<script lang="ts" setup>
import {
  OnyxHeadline,
  OnyxLink,
  type HeadlineType,
  type OnyxHeadlineProps,
  type TextSize,
} from "sit-onyx";
import { computed, ref } from "vue";
import DesignVariable from "./DesignVariable.vue";
import DesignVariableCard from "./DesignVariableCard.vue";
import DesignVariableHeader from "./DesignVariableHeader.vue";

export type TypographyVariable = {
  /**
   * Human readable variable name
   * @example "h1"
   */
  name: string;
  /** HTML element to render. */
  htmlTag: HeadlineType | "p" | "a";
  /** Text size to use if `htmlTag` is <p> or <a> */
  textSize?: TextSize;
};

const AVAILABLE_FONT_TABS = ["Source Sans 3", "Source Code Pro"] as const;
type AvailableFontTab = (typeof AVAILABLE_FONT_TABS)[number];

const props = defineProps<{
  variables: TypographyVariable[];
  /** If true, more width will be used for the variable names. */
  wideName?: boolean;
}>();

const previewText = "onyx design system" as const;
const currentTab = ref<AvailableFontTab>(AVAILABLE_FONT_TABS[0]);

const isMonospace = computed(() => currentTab.value === "Source Code Pro");

const getTextSizeClass = (fontSize?: TextSize) => {
  if (!fontSize || fontSize === "default") return "";
  return `onyx-text--${fontSize}`;
};
</script>

<template>
  <section class="typography vp-raw">
    <DesignVariableHeader v-model="currentTab" :tabs="AVAILABLE_FONT_TABS" />

    <div :class="['typography__content', { 'onyx-text--monospace': isMonospace }]">
      <DesignVariableCard
        v-for="variable in props.variables"
        :key="variable.name"
        :name="variable.name"
        :wide-name="props.wideName"
        hide-value
      >
        <template #name>
          <p
            v-if="variable.htmlTag === 'p'"
            class="onyx-text"
            :class="getTextSizeClass(variable.textSize)"
          >
            {{ previewText }}
          </p>

          <OnyxLink
            v-else-if="variable.htmlTag === 'a'"
            href="#"
            class="onyx-text"
            :class="getTextSizeClass(variable.textSize)"
          >
            {{ previewText }}
          </OnyxLink>

          <OnyxHeadline
            is="h3"
            v-else
            :show-as="variable.htmlTag as OnyxHeadlineProps['showAs']"
            :monospace="isMonospace"
          >
            {{ previewText }}
          </OnyxHeadline>
        </template>

        <template #default="{ name }">
          <DesignVariable :name="name" />
        </template>
      </DesignVariableCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.vp-doc {
  // reset VitePress styles
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a {
    margin: 0;
    padding: 0;
    border: none;
    letter-spacing: normal;
    font-size: revert-layer;
    line-height: revert-layer;
    font-weight: revert-layer;
  }
}

.typography {
  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-lg);

    .onyx-headline {
      font-family: inherit;
    }
  }
}
</style>
