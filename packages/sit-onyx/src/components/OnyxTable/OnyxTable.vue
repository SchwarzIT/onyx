<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import type { OnyxTableProps } from "./types";

const props = withDefaults(defineProps<OnyxTableProps>(), {
  striped: false,
  grid: false,
});

defineSlots<{
  /**
   * Table content. Must only contain valid HTML `<table>` children like `<tr>`, `<th>`, `<td>`, `<thead>` and `<tbody>`.
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
* Defines all border styles for the table.
*/
@mixin define-borders() {
  $border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  $border-radius: var(--onyx-radius-sm);

  border-spacing: 0;
  border-collapse: separate;
  border-radius: $border-radius;

  // border styles
  th,
  td {
    border-bottom: $border;

    &:first-child {
      border-left: $border;
    }
    &:last-child {
      border-right: $border;
    }
  }

  th {
    border-top: $border;
  }

  // border radius
  tr:first-child th:first-child {
    border-top-left-radius: $border-radius;
  }

  tr:first-child th:last-child {
    border-top-right-radius: $border-radius;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: $border-radius;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: $border-radius;
  }

  // special styles if no header exists
  &:not(:has(thead)) {
    tr:first-child td {
      border-top: $border;
    }

    tr:first-child td:first-child {
      border-top-left-radius: $border-radius;
    }

    tr:first-child td:last-child {
      border-top-right-radius: $border-radius;
    }
  }

  // grid style borders
  &--grid {
    td,
    th {
      &:not(:last-child) {
        border-right: $border;
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
    @include define-borders();

    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    text-align: left;

    th,
    td {
      padding: var(--onyx-table-vertical-padding) var(--onyx-spacing-md);
    }

    th {
      background-color: var(--onyx-color-base-neutral-200);
      color: var(--onyx-color-text-icons-neutral-medium);
      font-size: 0.8125rem;
      line-height: 1.25rem;
      font-weight: 600;
    }

    tr {
      background-color: var(--onyx-color-base-background-blank);
    }

    &--striped {
      tbody {
        tr:nth-child(even) {
          background-color: var(--onyx-color-base-background-tinted);
        }
      }
    }
  }
}
</style>
