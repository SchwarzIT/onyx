<script lang="ts" setup>
import graphSearch from "@sit-onyx/icons/graph-search.svg?raw";
import { computed, type VNode } from "vue";
import { useDensity } from "../../composables/density";
import { injectI18n } from "../../i18n";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTableProps } from "./types";

const props = withDefaults(defineProps<OnyxTableProps>(), {
  striped: false,
  withVerticalBorders: false,
});

defineSlots<{
  /**
   * Table content. Must only contain valid HTML `<table>` children like `<tr>`, `<th>`, `<td>`, `<thead>` and `<tbody>`.
   */
  default(): VNode[];
  /**
   * Optional slot to customize the empty state when no body content exist.
   * It is recommended to use the `<OnyxEmpty>` component here.
   *
   * If unset, a default translated message will be displayed for the current locale.
   */
  empty?(props: { defaultMessage: string }): unknown;
}>();

const { t } = injectI18n();

const { densityClass } = useDensity(props);

const isEmptyMessage = computed(() => t.value("table.empty"));
</script>

<template>
  <div class="onyx-table-wrapper">
    <div class="onyx-table-wrapper__scroll-container" tabindex="0">
      <table
        class="onyx-table onyx-text"
        :class="[
          props.striped ? 'onyx-table--striped' : '',
          props.withVerticalBorders ? 'onyx-table--vertical-borders' : '',
          densityClass,
        ]"
      >
        <slot></slot>

        <!-- info: we can't use tbody here because we determine via CSS
         whether to show "empty" when no tbody is present -->
        <div class="onyx-table__empty">
          <tr>
            <td colspan="100%">
              <div class="onyx-table__empty-content">
                <slot name="empty" :default-message="isEmptyMessage">
                  <OnyxEmpty>
                    <template #icon>
                      <OnyxIcon :icon="graphSearch" size="48px" />
                    </template>
                    {{ isEmptyMessage }}
                  </OnyxEmpty>
                </slot>
              </div>
            </td>
          </tr>
        </div>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers";

$border-radius: var(--onyx-radius-sm);
$border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);

/**
* Defines all border styles for the table.
* info: most borders are handled on cell level, not on the table itself
* (which would lead to unstable background appliance and other visual bugs)
*/
@mixin define-borders() {
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

  &--vertical-borders {
    td,
    th {
      &:not(:last-child) {
        border-right: $border;
      }
    }
  }
}

.onyx-table-wrapper {
  @include layers.component() {
    position: relative;

    &__scroll-container {
      border-radius: $border-radius;
      overflow: auto;
      box-sizing: border-box;
      max-height: inherit;
      max-width: inherit;

      &:focus-visible {
        outline: var(--onyx-1px-in-rem) solid var(--onyx-color-base-primary-500);
      }
    }
    // we place a frame on top so the table has visible boundaries
    // when it is overflowing in the scroll container
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: $border;
      border-radius: $border-radius;
      pointer-events: none;
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
    contain: paint;
    width: 100%;

    &__empty {
      display: none;

      &-content {
        display: flex;
        justify-content: center;
      }
      .onyx-icon {
        color: var(--onyx-color-text-icons-neutral-medium);
      }
    }
    &:not(:has(tbody tr)) {
      .onyx-table__empty {
        // this display option behaves like tbody
        display: table-row-group;
      }
    }

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
    // hovering is disabled when the table is empty.
    tbody:not(.onyx-table__empty) tr:hover td::before {
      background-color: var(--onyx-color-base-neutral-200);
    }

    // column hover styles
    th:hover::before {
      background-color: color-mix(in srgb, var(--onyx-color-base-neutral-500), transparent 85%);
      content: "";
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
      // needed in order for other components like buttons etc. to be clickable and to prevent showing the column hover effect when hovering down over a row
      pointer-events: none;
    }
    // hovering is disabled when the table is empty.
    &:has(&__empty) th {
      pointer-events: none;
    }
  }
}
</style>
