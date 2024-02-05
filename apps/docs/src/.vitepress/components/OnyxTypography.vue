<script lang="ts" setup>
import { ref } from "vue";
import OnyxHeadline from "../../../../../packages/sit-onyx/src/components/OnyxHeadline/OnyxHeadline.vue";
import type { HeadlineType } from "../../../../../packages/sit-onyx/src/components/OnyxHeadline/types";
import DesignToken from "./DesignToken.vue";
import DesignTokenCard from "./DesignTokenCard.vue";
import DesignTokenHeader from "./DesignTokenHeader.vue";

export type TypographyToken = {
  /**
   * Human readable token name
   * @example "h1"
   */
  name: string;
  /** HTML element to render. */
  htmlTag: HeadlineType | "p" | "a";
  /** Font size to use if `htmlTag` is <p> or <a> */
  fontSize?: "big" | "default" | "small";
};

const AVAILABLE_FONT_TABS = ["Source Sans 3", "Source Code Pro"] as const;
type AvailableFontTab = (typeof AVAILABLE_FONT_TABS)[number];

const props = defineProps<{
  tokens: TypographyToken[];
  /** If true, more width will be used for the token names. */
  wideName?: boolean;
}>();

const previewText = "onyx design system" as const;
const currentTab = ref<AvailableFontTab>(AVAILABLE_FONT_TABS[0]);
</script>

<template>
  <section class="typography">
    <DesignTokenHeader v-model="currentTab" :tabs="AVAILABLE_FONT_TABS" />

    <div
      class="typography__content"
      :class="{ 'typography__content--mono': currentTab === 'Source Code Pro' }"
    >
      <DesignTokenCard
        v-for="token in props.tokens"
        :key="token.name"
        :name="token.name"
        :wide-name="props.wideName"
      >
        <template #name>
          <p v-if="token.htmlTag === 'p'" :class="`font-size--${token.fontSize ?? 'default'}`">
            {{ previewText }}
          </p>
          <a
            v-else-if="token.htmlTag === 'a'"
            :class="`font-size--${token.fontSize ?? 'default'}`"
            href="#"
          >
            {{ previewText }}
          </a>

          <OnyxHeadline v-else :is="token.htmlTag" :monospace="currentTab === 'Source Code Pro'">
            {{ previewText }}
          </OnyxHeadline>
        </template>

        <template #default="{ name }">
          <DesignToken :name="name" />
        </template>
      </DesignTokenCard>
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
    border: none;
    padding: 0;
    letter-spacing: normal;
  }
}

.font-size {
  &--big {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 400;
  }

  &--default {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
  }

  &--small {
    font-size: 0.8125rem;
    line-height: 1.25rem;
    font-weight: 400;
  }
}

.typography {
  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-lg);

    &--mono {
      font-family: var(--onyx-font-family-mono);
    }
  }
}
</style>
