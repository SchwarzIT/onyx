<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { injectI18n } from "../../i18n";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
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
  default(): unknown[];
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
  bottomLeft?(): unknown;
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
      :class="[
        'onyx-table-wrapper__container',
        props.withPageScrolling ? 'onyx-table-wrapper__container--no-scroll' : '',
      ]"
      :tabindex="props.withPageScrolling ? undefined : 0"
      v-bind="scrollContainerAttrs"
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
                    <OnyxEmpty> {{ isEmptyMessage }} </OnyxEmpty>
                  </slot>
                </div>
              </td>
            </tr>
          </slot>
        </tbody>
      </table>
    </div>

    <div v-if="!!slots.bottomLeft || !!slots.pagination" class="onyx-table-wrapper__bottom">
      <div>
        <slot name="bottomLeft"></slot>
      </div>

      <div>
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

$border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

/**
* Defines all border styles for the table.
* info: most borders are handled on cell level, not on the table itself
* (which would lead to unstable background appliance and other visual bugs)
*/
@mixin define-borders() {
  border-spacing: 0;
  border-collapse: separate;

  // border styles
  th,
  td {
    border-bottom: $border;
  }

  td {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  tr:last-of-type td {
    border-bottom: none;
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

    &__container {
      border-radius: var(--onyx-radius-sm);
      overflow: auto;
      box-sizing: border-box;
      max-height: inherit;
      max-width: inherit;
      overscroll-behavior: none; // fix bouncy scroll behavior in safari
      border: $border;

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }

      &--no-scroll {
        overflow: initial;
      }
    }

    &__top,
    &__bottom {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-density-xs) var(--onyx-density-xl);
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
    container-type: size;
    width: 100%;

    @include define-borders();

    &__empty {
      &-content {
        display: flex;
        justify-content: center;
      }
    }

    &__header {
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
        height: 100cqh;
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
