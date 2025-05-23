<script lang="ts" setup>
import type { OnyxFileUploadSVGProps } from "./types";

const props = defineProps<OnyxFileUploadSVGProps>();
</script>

<template>
  <svg
    class="onyx-component onyx-file-upload-svg"
    :class="{
      'onyx-file-upload-svg--disabled': props.disabled,
      'onyx-file-upload-svg--active': props.active,
    }"
    width="50"
    height="64"
    viewBox="0 0 50 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8 0.5H34.793L43.5 9.20703V50C43.5 54.1421 40.1421 57.5 36 57.5H8C3.85786 57.5 0.5 54.1421 0.5 50V8C0.500001 3.85786 3.85787 0.5 8 0.5Z"
      fill="var(--onyx-file-upload-svg-background-color)"
      stroke="var(--onyx-file-upload-svg-border-color)"
    />
    <path
      d="M34 0L39 5L44 10H38C35.7909 10 34 8.20914 34 6V0Z"
      fill="var(--onyx-file-upload-svg-border-color)"
    />
    <path
      d="M18 48C18 39.1634 25.1634 32 34 32C42.8366 32 50 39.1634 50 48C50 56.8366 42.8366 64 34 64C25.1634 64 18 56.8366 18 48Z"
      fill="var(--onyx-file-upload-svg-background-color-bubble)"
    />
    <path
      d="M39.2005 42.2123H39.1668C38.5307 41.0817 37.5611 40.175 36.3905 39.616C35.2198 39.0571 33.9051 38.8731 32.626 39.0893C31.3469 39.3056 30.1657 39.9114 29.2438 40.824C28.3218 41.7367 27.7041 42.9117 27.475 44.1886C26.316 44.3486 25.2615 44.9441 24.5258 45.8538C23.7901 46.7636 23.4284 47.9194 23.5144 49.0862C23.6004 50.2531 24.1275 51.3434 24.9886 52.1355C25.8496 52.9276 26.9801 53.3621 28.15 53.3506H33.25V57.0001H34.75V53.3506H39.2005C40.6409 53.3123 42.0073 52.7047 43.0006 51.6609C43.9939 50.6172 44.5331 49.2223 44.5 47.7818C44.525 47.0663 44.4071 46.353 44.153 45.6837C43.8989 45.0143 43.5138 44.4024 43.0203 43.8838C42.5268 43.3651 41.9347 42.9501 41.2788 42.6631C40.6229 42.3761 39.9164 42.2229 39.2005 42.2123ZM39.2005 51.8506H34.75V47.4631L36.7405 49.3006L37.7583 48.1988L34 44.7293L30.241 48.1988L31.2588 49.3006L33.25 47.4631V51.8506H28.15C27.7382 51.857 27.3291 51.7814 26.9468 51.6282C26.5644 51.475 26.2163 51.2473 25.9228 50.9583C25.6293 50.6693 25.3962 50.3248 25.2371 49.9449C25.0779 49.5649 24.996 49.1571 24.996 48.7452C24.996 48.3333 25.0779 47.9255 25.2371 47.5455C25.3962 47.1656 25.6293 46.8211 25.9228 46.5321C26.2163 46.2431 26.5644 46.0154 26.9468 45.8622C27.3291 45.709 27.7382 45.6334 28.15 45.6398H28.8573L28.8985 44.9341C28.9785 43.8759 29.4074 42.8742 30.118 42.086C30.8286 41.2978 31.7807 40.7678 32.825 40.5791C33.8693 40.3903 34.9467 40.5535 35.8882 41.0431C36.8298 41.5326 37.5822 42.3208 38.0275 43.2841L38.2353 43.7386L38.7348 43.7221C38.7865 43.7221 39.1465 43.7138 39.1998 43.7138C39.7178 43.7266 40.2281 43.8425 40.7008 44.0547C41.1735 44.2669 41.5992 44.5712 41.953 44.9498C42.3068 45.3284 42.5817 45.7737 42.7614 46.2597C42.9412 46.7457 43.0223 47.2626 43 47.7803C43.0338 48.8234 42.653 49.8373 41.9409 50.6002C41.2288 51.363 40.2434 51.8126 39.2005 51.8506Z"
      fill="var(--onyx-file-upload-svg-color-bubble)"
    />
  </svg>
</template>

<style lang="scss">
@use "../../../styles/mixins/layers.scss";

.onyx-file-upload-svg {
  @include layers.component() {
    --onyx-file-upload-svg-background-color-bubble: var(--onyx-color-base-neutral-800);
    --onyx-file-upload-svg-color-bubble: var(--onyx-color-text-icons-neutral-inverted);
    --onyx-file-upload-svg-background-color: var(--onyx-color-base-neutral-200);
    --onyx-file-upload-svg-border-color: var(--onyx-color-base-neutral-500);

    &--active {
      --onyx-file-upload-svg-background-color: var(--onyx-color-base-primary-200);
      --onyx-file-upload-svg-border-color: var(--onyx-color-base-primary-600);
      --onyx-file-upload-svg-background-color-bubble: var(--onyx-color-base-primary-800);
    }

    &--disabled {
      --onyx-file-upload-svg-background-color-bubble: var(--onyx-color-base-neutral-300);
      --onyx-file-upload-svg-color-bubble: var(--onyx-color-text-icons-neutral-inverted);
      --onyx-file-upload-svg-background-color: var(--onyx-color-base-neutral-100);
      --onyx-file-upload-svg-border-color: var(--onyx-color-base-neutral-200);
    }
  }
}
</style>
