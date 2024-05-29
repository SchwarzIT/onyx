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
* info: most borders are handled on cell level, not on the table itself
* (which would lead to unstable background appliance and other visual bugs)
*/
@mixin define-borders() {
  $border-radius: var(--onyx-radius-sm);
  $border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);

  border-spacing: 0;
  border-collapse: separate;
  border-radius: $border-radius;
  border-bottom: $border;

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

  // the border bottom needs to be handled by the table itself (for scroll reasons)
  tr:last-child td {
    border-bottom: unset;
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

    // size behaviors
    --onyx-table-max-height: unset;
    overflow: auto;
    display: block;
    max-height: var(--onyx-table-max-height);
    max-width: inherit;
    width: fit-content;

    // color / text appearance
    --onyx-table-column-hover: #26628d30;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    text-align: left;
    contain: paint;

    thead {
      position: sticky;
      top: 0;
      z-index: var(--onyx-z-index-sticky-content);
    }

    th,
    td {
      padding: var(--onyx-table-vertical-padding) var(--onyx-spacing-md);
      position: relative;
    }

    th {
      background-color: var(--onyx-color-base-neutral-200);
      color: var(--onyx-color-text-icons-neutral-medium);
      font-size: 0.8125rem;
      line-height: 1.25rem;
      font-weight: 600;

      &:hover {
        background: var(--onyx-color-base-neutral-300);
      }
    }

    // we need to use ::before to set the row/td background color
    // so the column hover effects works correctly with plain CSS
    td::before {
      content: "";
      background-color: var(--onyx-color-base-background-blank);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
    }

    &--striped {
      tbody {
        tr:nth-child(even) td::before {
          background-color: var(--onyx-color-base-background-tinted);
        }
      }
    }

    // row hover styles
    tbody tr:hover td::before {
      background-color: var(--onyx-color-base-neutral-200);
    }

    // column hover styles
    th:hover::before {
      // TODO: we need official color tokens for that.
      background-color: var(--onyx-table-column-hover);
      content: "";
      height: var(--onyx-table-max-height);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
    }
  }
}

.dark .onyx-table {
  @include layers.component() {
    th:hover::before {
      --onyx-table-column-hover: #2e425230;
    }
  }
}
</style>
