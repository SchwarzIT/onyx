<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import type { OnyxTableProps } from "./types";

const props = withDefaults(defineProps<OnyxTableProps>(), {
  striped: false,
  grid: false,
});

defineSlots<{
  /**
   * Table content (columns + rows).
   */
  default(): unknown;
}>();

const { densityClass } = useDensity(props);
</script>

<template>
  <table
    class="onyx-table onyx-text"
    :class="[
      props.striped ? 'onyx-table--striped' : '',
      props.grid ? 'onyx-table--grid' : '',
      densityClass,
    ]"
  >
    <slot></slot>
  </table>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers";

/**
* Defines the border radius for the table.
*/
@mixin define-table-border-radius() {
  $border-radius: var(--onyx-radius-sm);
  border-radius: $border-radius;

  th:first-child {
    border-top-left-radius: $border-radius;
  }

  th:last-child {
    border-top-right-radius: $border-radius;
  }

  &:not(:has(thead)) {
    tbody tr:first-child {
      td:first-child {
        border-top-left-radius: $border-radius;
      }

      td:last-child {
        border-top-right-radius: $border-radius;
      }
    }
  }

  tbody {
    tr:last-child {
      td:first-child {
        border-bottom-left-radius: $border-radius;
      }

      td:last-child {
        border-bottom-right-radius: $border-radius;
      }
    }
  }
}

.onyx-table {
  @include density.compact {
    --onyx-table-vertical-padding: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-table-vertical-padding: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-table-vertical-padding: var(--onyx-spacing-sm);
  }

  @include layers.component() {
    $border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    border-spacing: 0;
    border: $border;
    @include define-table-border-radius;

    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    text-align: left;

    th,
    td {
      padding: var(--onyx-table-vertical-padding) var(--onyx-spacing-md);
    }

    tr {
      background: var(--onyx-color-base-background-blank);
    }

    th {
      background-color: var(--onyx-color-base-neutral-200);
      color: var(--onyx-color-text-icons-neutral-medium);
      font-size: 0.8125rem;
      line-height: 1.25rem;
      font-weight: 600;
    }

    td {
      border-top: $border;
    }

    &:not(:has(thead)) tr:first-child td {
      // prevent double border if no header exists
      border-top: none;
    }

    &--striped {
      tbody {
        tr:nth-child(even) {
          background-color: var(--onyx-color-base-background-tinted);
        }
      }
    }

    &--grid {
      td,
      th {
        &:not(:last-child) {
          border-right: $border;
        }
      }
    }
  }
}
</style>
