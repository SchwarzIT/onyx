<script lang="ts" setup>
import { useData } from "vitepress";
import ColorStrip from "./ColorStrip.vue";

const { isDark } = useData();

const primaryColors = Array.from({ length: 9 }, (_, index) => {
  return `var(--onyx-color-base-action-${(index + 1) * 100})`;
});

const secondaryColors = Array.from({ length: 9 }, (_, index) => {
  return `var(--onyx-color-base-brand-${(index + 1) * 100})`;
});

const neutralColors = Array.from({ length: 9 }, (_, index) => {
  return `var(--onyx-color-base-neutral-${(index + 1) * 100})`;
});

const warningColors = Array.from({ length: 9 }, (_, index) => {
  return `var(--onyx-color-base-warning-${(index + 1) * 100})`;
});

const dangerColors = Array.from({ length: 9 }, (_, index) => {
  return `var(--onyx-color-base-danger-${(index + 1) * 100})`;
});

const successColors = Array.from({ length: 9 }, (_, index) => {
  return `var(--onyx-color-base-success-${(index + 1) * 100})`;
});

const infoColors = Array.from({ length: 9 }, (_, index) => {
  return `var(--onyx-color-base-info-${(index + 1) * 100})`;
});
</script>

<template>
  <div class="theme">
    <div class="theme__header">
      <button
        class="theme__button"
        :class="{ 'theme__button--active': !isDark }"
        @click="isDark = false"
      >
        Light mode
      </button>
      <button
        class="theme__button"
        :class="{ 'theme__button--active': isDark }"
        @click="isDark = true"
      >
        Dark mode
      </button>
    </div>

    <div class="theme__content">
      <div class="theme__container">
        <h3 class="theme__headline">Themed color palette</h3>

        <div class="theme__colors theme__colors--themed">
          <ColorStrip name="primary" :colors="primaryColors" />
          <ColorStrip name="secondary" :colors="secondaryColors" />
          <ColorStrip name="neutral" :colors="neutralColors" />
        </div>
      </div>

      <div class="theme__container">
        <h3 class="theme__headline">Universal color palette</h3>

        <div class="theme__colors theme__colors--universal">
          <ColorStrip name="danger" :colors="dangerColors" />
          <ColorStrip name="warning" :colors="warningColors" />
          <ColorStrip name="success" :colors="successColors" />
          <ColorStrip name="info" :colors="infoColors" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.theme {
  &__header {
    display: flex;
    justify-content: flex-end;
    gap: var(--onyx-spacing-md);
    margin-bottom: var(--onyx-spacing-xs);
  }

  &__button {
    font-weight: 600;
    font-size: 1rem;

    &--active {
      color: var(--onyx-color-text-action-intense);
    }
  }

  &__content {
    border-radius: var(--onyx-radius-md);
    border: 1px solid var(--onyx-color-base-border-default);
    background: var(--onyx-color-base-background-blank);
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include mixins.breakpoint(max, s) {
      display: block;
    }
  }

  &__container {
    padding: var(--onyx-spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-sm);

    &:last-child {
      @include mixins.breakpoint(min, s, 1) {
        border-left: 1px solid var(--onyx-color-base-border-default);
      }
    }
  }

  &__headline {
    font-weight: 600;
    margin: 0;
  }

  &__colors {
    display: grid;
    gap: var(--onyx-spacing-sm);

    &--themed {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    &--universal {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
}
</style>
