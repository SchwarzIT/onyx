<script lang="ts" setup>
import { computed } from "vue";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { injectI18n } from "../../i18n";
import { normalizeUrlHash } from "../../utils/strings";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxHeadlineProps } from "./types";

const props = withDefaults(defineProps<OnyxHeadlineProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  /**
   * Headline content.
   */
  default(): unknown;
}>();

const { t } = injectI18n();
const skeleton = useSkeletonContext(props);

const normalizedHash = computed(() => (props.hash ? normalizeUrlHash(props.hash) : undefined));
const showAs = computed(() => props.showAs ?? props.is);

const copyLink = async (hash: string) => {
  const { origin, pathname, search } = window.location;
  const fullUrl = `${origin}${pathname}${search}#${hash}`;
  await navigator.clipboard.writeText(fullUrl);
};
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="['onyx-headline-skeleton', `onyx-headline-skeleton--${showAs}`]"
  />

  <component
    :is="props.is"
    v-else
    :id="normalizedHash"
    :class="['onyx-component', 'onyx-headline', `onyx-headline--${showAs}`]"
  >
    <a
      v-if="normalizedHash"
      :href="`#${normalizedHash}`"
      target="_self"
      class="onyx-headline__hash"
      :title="t('headline.copyLink')"
      @click="copyLink(normalizedHash)"
    >
      <OnyxVisuallyHidden>{{ t("headline.copyLinkTo") }}</OnyxVisuallyHidden>
      <slot />
    </a>

    <slot v-else />
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/sizes";

.onyx-headline,
.onyx-headline-skeleton {
  @include layers.component() {
    @include sizes.define-headline-sizes();
  }
}

.onyx-headline {
  @include layers.component() {
    --onyx-headline-scroll-margin: var(--onyx-spacing-xl);
    --border-radius: var(--onyx-radius-sm);

    font-weight: 600;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    position: relative;
    border-radius: var(--border-radius);
    scroll-margin-top: var(--onyx-headline-scroll-margin);

    &__hash {
      color: inherit;
      text-decoration: none;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      outline: none;
      display: inline-block;

      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-base-neutral-200);
        padding-right: var(--onyx-density-xs);

        &::before {
          $width: 1.5rem;
          position: absolute;
          width: $width;
          left: -$width;
          text-align: center;
          color: var(--onyx-color-text-icons-primary-intense);
          cursor: pointer;
          background-color: inherit;
          line-height: inherit;
          border-radius: var(--border-radius) 0 0 var(--border-radius);

          // the / "" is used to ignore the content for screen readers, see:
          // https://developer.mozilla.org/en-US/docs/Web/CSS/content#alternative_text_string_counter
          // we still set 'content: "#"' in case the browser does not support the alternative syntax
          content: "#";
          content: "#" / "";
        }
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
        outline-offset: 0;

        &::before {
          // we apply the visual outline as box-shadow here instead of native outline because we need to cut off the right side
          box-shadow: 0 0 0 var(--onyx-outline-width) var(--onyx-color-component-focus-primary);

          // remove right box shadow since its applied by the parent outline
          $offset: calc(-1 * var(--onyx-outline-width));
          clip-path: inset($offset 0 $offset $offset);
        }
      }
    }
  }

  &-skeleton {
    height: 1lh;
    width: 10rem;
    max-width: 100%;
  }
}
</style>
