<script lang="ts" setup>
import { computed, ref } from "vue";
import OnyxHeadline from "~components/OnyxHeadline/OnyxHeadline.vue";
import type { HeadlineType } from "~components/OnyxHeadline/types";
import OnyxLink from "~components/OnyxLink/OnyxLink.vue";
import type { TextSize } from "../../../../../packages/sit-onyx/src/types/fonts";
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
  fontSize?: TextSize;
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

const isMonospace = computed(() => currentTab.value === "Source Code Pro");
</script>

<template>
  <section class="typography">
    <DesignTokenHeader v-model="currentTab" :tabs="AVAILABLE_FONT_TABS" />

    <div class="typography__content">
      <DesignTokenCard
        v-for="token in props.tokens"
        :key="token.name"
        :name="token.name"
        :wide-name="props.wideName"
      >
        <template #name>
          <p
            v-if="token.htmlTag === 'p'"
            class="onyx-text"
            :class="[
              token.fontSize && token.fontSize !== 'default' ? `onyx-text--${token.fontSize}` : '',
              isMonospace ? 'onyx-text--monospace' : '',
            ]"
          >
            {{ previewText }}
          </p>

          <OnyxLink
            v-else-if="token.htmlTag === 'a'"
            href="#"
            :size="token.fontSize"
            :monospace="isMonospace"
          >
            {{ previewText }}
          </OnyxLink>

          <OnyxHeadline v-else :is="token.htmlTag" :monospace="isMonospace">
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

.typography {
  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-lg);
  }
}
</style>
