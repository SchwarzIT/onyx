<script setup lang="ts">
import { useLocalePath } from "#i18n";
import { clearError } from "#imports";

type ErrorLike = Pick<Error, "message">;

const props = defineProps<{
  error: ErrorLike;
}>();

const localePath = useLocalePath();
const handleBackHome = () => clearError({ redirect: localePath("/") });
</script>

<template>
  <div class="onyx-error onyx-component">
    <OnyxErrorSVG class="onyx-error__image" />

    <div class="onyx-error__headline">
      <OnyxHeadline is="h1">{{ props.error.message }}</OnyxHeadline>
      <OnyxButton :label="$t('onyx.errors.backToHome')" @click="handleBackHome" />
    </div>

    <OnyxAccordion>
      <OnyxAccordionItem value="details">
        <template #header>{{ $t("onyx.errors.technicalDetails") }}</template>
        <pre class="onyx-error__details">{{ JSON.stringify(props.error, null, 2) }}</pre>
      </OnyxAccordionItem>
    </OnyxAccordion>
  </div>
</template>

<style lang="scss" scoped>
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-error {
  @include layers.component() {
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
}
</style>
