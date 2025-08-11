<script setup lang="ts">
import type { NuxtError } from "#app";
import App from "./app.vue";

const props = defineProps<{
  error: NuxtError;
}>();

defineSlots<{
  /**
   * Slot to override the default "Back to home" action(s).
   *
   * @params clearError - Function to clear the error and redirect to the home page
   */
  actions?(props: { clearError: typeof _clearError }): unknown;
  /**
   * Slot to override the error details section.
   * By default, an accordion will be displayed that shows the technical error details.
   */
  details?(): unknown;
}>();

const localePath = useLocalePath();

const _clearError = () => clearError({ redirect: localePath("/") });
</script>

<template>
  <App>
    <div class="error">
      <OnyxErrorSVG class="error__image" />

      <div class="error__headline">
        <OnyxHeadline is="h1">{{ props.error.message }}</OnyxHeadline>

        <slot name="actions" :clear-error="_clearError">
          <OnyxButton label="Back to home" @click="_clearError" />
        </slot>
      </div>

      <slot name="details">
        <OnyxAccordion>
          <OnyxAccordionItem value="details">
            <template #header>Technical error details</template>
            <pre class="error__details">{{ JSON.stringify(props.error, null, 2) }}</pre>
          </OnyxAccordionItem>
        </OnyxAccordion>
      </slot>
    </div>
  </App>
</template>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--onyx-density-3xl);

  &__image {
    width: 32rem;
    display: block;
  }

  &__headline {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--onyx-density-md);
  }

  &__details {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-family: var(--onyx-font-family-mono);
  }
}
</style>
