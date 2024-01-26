<script lang="ts" setup>
import { ref } from "vue";
import DesignToken from "./DesignToken.vue";
import DesignTokenCard from "./DesignTokenCard.vue";
import DesignTokenHeader from "./DesignTokenHeader.vue";

export type TypographyToken = {
  /**
   * Human readable token name
   * @example "h1"
   */
  name: string;
  /**
   * Class to apply for the text preview. Available classes:
   * - onyx-h1 to onyx-h6
   * - onyx-paragraph-big, onyx-paragraph-default, onyx-paragraph-small
   * - onyx-link-big, onyx-link-default, onyx-link-small
   */
  className: string;
  /** HTML element to render. */
  htmlTag: string;
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
          <component
            :is="token.htmlTag"
            :class="token.className"
            :href="token.htmlTag === 'a' ? '#' : undefined"
          >
            {{ previewText }}
          </component>
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

.onyx {
  &-h1 {
    font-size: 1.75rem;
    line-height: 2.5rem;
    font-weight: 600;
  }

  &-h2 {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
  }

  &-h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
  }

  &-h4 {
    font-size: 0.8125rem;
    line-height: 1.25rem;
    font-weight: 600;
  }

  &-h5,
  &-h6 {
    @extend .onyx-h4;
  }

  &-paragraph {
    &-big {
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 400;
    }

    &-default {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 400;
    }

    &-small {
      font-size: 0.8125rem;
      line-height: 1.25rem;
      font-weight: 400;
    }
  }

  &-link {
    &-big {
      @extend .onyx-paragraph-big;
      text-decoration: underline;
    }

    &-default {
      @extend .onyx-paragraph-default;
      text-decoration: underline;
    }

    &-small {
      @extend .onyx-paragraph-small;
      text-decoration: underline;
    }
  }
}

.typography {
  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-md);

    &--mono {
      font-family: var(--onyx-font-family-mono);
    }
  }
}
</style>
