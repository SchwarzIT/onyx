<script lang="ts" setup>
import { ref } from "vue";
import DesignToken from "./DesignToken.vue";
import DesignTokenCard from "./DesignTokenCard.vue";
import DesignTokenHeader from "./DesignTokenHeader.vue";

export type TypographyToken = {
  name: string;
  className: string;
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
const copiedClass = ref<string>();
const currentTab = ref<AvailableFontTab>(AVAILABLE_FONT_TABS[0]);

const handleCopy = async (className: string) => {
  await navigator.clipboard.writeText(`class="${className}"`);
  copiedClass.value = className;
  setTimeout(() => (copiedClass.value = undefined), 3000);
};
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
          <component :is="token.htmlTag" :class="token.className">{{ previewText }}</component>
        </template>

        <template #default="{ name }">
          <DesignToken
            :name="name"
            :is-copied="copiedClass === token.className"
            @copy="handleCopy(token.className)"
          />
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
    gap: var(--onyx-spacing-md);

    &--mono {
      font-family: var(--onyx-font-family-mono);
    }
  }
}
</style>
