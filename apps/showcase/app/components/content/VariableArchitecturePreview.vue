<script lang="ts" setup>
import { iconNavigationArrow } from "@sit-onyx/icons";

const descriptionId = useId();
</script>

<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div class="preview">
    <OnyxCard class="preview__card" :aria-describedby="descriptionId">
      <div class="variable">
        <OnyxHeadline is="h4">{{ $t("variables.global") }}</OnyxHeadline>

        <div class="variable__value">
          <span>onyx-color-system-purple-800</span>
          <div
            class="variable__color"
            :style="{ backgroundColor: 'var(--onyx-color-system-purple-800)' }"
          ></div>
        </div>

        <div class="variable__details">
          <OnyxIcon :icon="iconNavigationArrow" />

          <div class="variable__value">
            <span>#603E89</span>
            <div
              class="variable__color"
              :style="{ backgroundColor: 'var(--onyx-color-system-purple-800)' }"
            ></div>
          </div>
        </div>
      </div>

      <div class="variable">
        <OnyxHeadline is="h4">{{ $t("variables.semantic") }}</OnyxHeadline>

        <div class="variable__value">
          <span>onyx-color-text-icons-info-intense</span>
          <div
            class="variable__color"
            :style="{ backgroundColor: 'var(--onyx-color-text-icons-info-intense)' }"
          ></div>
        </div>

        <div class="variable__details" :style="{ colorScheme: 'light' }">
          <OnyxIcon :icon="iconNavigationArrow" />

          <div class="variable__value">
            <span>onyx-color-system-purple-800</span>
            <div
              class="variable__color"
              :style="{ backgroundColor: 'var(--onyx-color-text-icons-info-intense)' }"
            ></div>
          </div>
        </div>

        <div class="variable__details" :style="{ colorScheme: 'dark' }">
          <OnyxIcon :icon="iconNavigationArrow" />

          <div class="variable__value">
            <span>onyx-color-system-purple-500</span>
            <div
              class="variable__color"
              :style="{ backgroundColor: 'var(--onyx-color-text-icons-info-intense)' }"
            ></div>
          </div>
        </div>
      </div>
    </OnyxCard>

    <div :id="descriptionId" class="onyx-text--small preview__description">
      {{ $t("variables.visualizationDescription") }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-2xs);

  &__card {
    --onyx-card-gap: var(--onyx-density-2xl);
    flex-grow: 1;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}

.variable {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xs);

  &__value {
    display: flex;
    padding: var(--onyx-density-2xs) var(--onyx-density-xs);
    justify-content: space-between;
    gap: var(--onyx-density-md);
    align-items: center;
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    background-color: var(--onyx-color-base-background-tinted);

    color: var(--onyx-color-text-icons-neutral-medium);
    font-family: var(--onyx-font-family-mono);
  }

  &__details {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
    padding-left: var(--onyx-density-sm);

    > .onyx-icon {
      transform: scale(1, -1);
    }
  }

  &__color {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    border-radius: var(--onyx-radius-xs);
  }
}
</style>
