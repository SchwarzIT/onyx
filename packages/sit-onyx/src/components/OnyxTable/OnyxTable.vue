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
  withPageScrolling: false,
});

const slots = defineSlots<{
  /**
   * Table content. Must only contain valid HTML `<tbody>` children like `<tr>` and `<td>`.
   */
  default(): VNode[];
  /**
   * Table header. Must only contain valid HTML `<thead>` children like `<tr>` and `<th>`.
   */
  head?(): unknown;
  /**
   * Optional slot to customize the empty state when no body content exist.
   * It is recommended to use the `<OnyxEmpty>` component here.
   *
   * If unset, a default translated message will be displayed for the current locale.
   */
  empty?(props: { defaultMessage: string }): unknown;
  /**
   * Optional slot for showing a headline above the table (top left). See OnyxHeadline component.
   */
  headline?(): unknown;
  /**
   * Optional slot for showing table actions above the table (top right). See OnyxIconButton and OnyxButton component.
   */
  actions?(): unknown;
  /**
   * Optional slot for displaying a pagination below the table (bottom right). See OnyxPagination component.
   */
  pagination?(): unknown;
  /**
   * Optional slot for displaying additional information below the table (bottom left).
   * Useful for showing a legend, page size selection etc.
   */
  bottomRight?(): unknown;
}>();

const { t } = injectI18n();

const { densityClass } = useDensity(props);

const isEmptyMessage = computed(() => t.value("table.empty"));
</script>

<template>
  <div class="onyx-table-wrapper onyx-component">
    <div v-if="!!slots.headline || !!slots.actions" class="onyx-table-wrapper__top">
      <div>
        <slot name="headline"></slot>
      </div>

      <div class="onyx-table-wrapper__actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <div
      :class="{ 'onyx-table-wrapper__scroll-container': !props.withPageScrolling }"
      :tabindex="props.withPageScrolling ? undefined : 0"
    >
      <table
        class="onyx-table onyx-text"
        :class="[
          props.striped ? 'onyx-table--striped' : '',
          props.withVerticalBorders ? 'onyx-table--vertical-borders' : '',
          densityClass,
        ]"
      >
        <colgroup
          v-for="group of props.columnGroups"
          :key="group.key"
          :span="group.span"
        ></colgroup>

        <thead v-if="slots.head" class="onyx-table__header">
          <tr v-if="props.columnGroups?.length">
            <th
              v-for="group of props.columnGroups"
              :key="group.key"
              :colspan="group.span"
              scope="colgroup"
              class="onyx-table__colgroup"
            >
              {{ group.header }}
            </th>
          </tr>

          <slot name="head"></slot>
        </thead>

        <tbody>
          <slot>
            <!-- fallback content showing an "empty" state
              that will be displayed if no body content is provided -->
            <tr class="onyx-table__empty">
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
          </slot>
        </tbody>
      </table>
    </div>

    <div v-if="!!slots.bottomRight || !!slots.pagination" class="onyx-table-wrapper__bottom">
      <div>
        <slot name="bottomRight"></slot>
      </div>

      <div>
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

$border-radius: var(--onyx-radius-sm);
$border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

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

  tr:first-of-type th {
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
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-xs);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);

    &__scroll-container {
      border-radius: $border-radius;
      overflow: auto;
      box-sizing: border-box;
      max-height: inherit;
      max-width: inherit;
      overscroll-behavior: none; // fix bouncy scroll behavior in safari
      position: relative;

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
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

    &__top,
    &__bottom {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-density-xl);
    }

    &__actions {
      gap: var(--onyx-density-xs);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
}

.onyx-table {
  @include layers.component() {
    text-align: left;
    contain: paint;
    width: 100%;

    @include define-borders();

    &__empty {
      &-content {
        display: flex;
        justify-content: center;
      }
    }

    &__header,
    &__header th {
      position: sticky;
      top: 0;
      z-index: var(--onyx-z-index-sticky-content);
    }

    th,
    td {
      position: relative;
      padding: var(--onyx-density-xs) var(--onyx-density-md);

      &.onyx-table__colgroup {
        padding-top: var(--onyx-density-3xs);
        padding-bottom: var(--onyx-density-3xs);
      }
    }

    th {
      font-size: 0.8125rem;
      line-height: 1.25rem;
      font-weight: 600;

      &:not(.onyx-table__colgroup) {
        background-color: var(--onyx-color-base-neutral-200);
        color: var(--onyx-color-text-icons-neutral-medium);

        &:hover {
          background: var(--onyx-color-base-neutral-300);
        }
      }
    }

    // we need to use ::before to set the row/td background color
    // so the column hover effects works correctly with plain CSS
    td::before {
      content: "";
      background-color: var(
        --onyx-table-row-background-color,
        var(--onyx-color-base-background-blank)
      );
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
          background-color: var(
            --onyx-table-row-background-color,
            var(--onyx-color-base-background-tinted)
          );
        }
      }
    }

    // row hover styles
    // hover styles are disabled when the table is empty.
    tr:hover:not(.onyx-table__empty) td::before {
      background-color: var(--onyx-color-base-neutral-200);
    }

    // column hover styles
    th:not(&__colgroup):hover::before {
      .onyx-table:not(:has(.onyx-table__empty)) & {
        background-color: color-mix(in srgb, var(--onyx-color-base-neutral-500), transparent 85%);
        content: "";
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        bottom: 0;
        z-index: -1;
        // needed in order for other components like buttons etc. to be clickable and to prevent showing the column hover effect when hovering down over a row
        pointer-events: none;
      }
    }

    &__colgroup {
      background-color: var(--onyx-color-base-primary-100);
      color: var(--onyx-color-text-icons-primary-intense);
    }
  }
}
</style>
