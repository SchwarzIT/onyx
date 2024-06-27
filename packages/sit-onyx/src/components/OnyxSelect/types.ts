import type { DensityProp } from "../../composables/density";
import type { AutofocusProp, BaseSelectOption, SelectOptionValue } from "../../types";
import type { OnyxSelectInputProps } from "../OnyxSelectInput/types";
import type { OnyxSelectOptionProps } from "../OnyxSelectOption/types";

export type SelectSearchProps =
  | {
      /**
       * Allows the user to filter the list entries.
       * If enabled, you need to manually filter the options based on the current `searchTerm`.
       * You can use our `normalizedIncludes()` utility function for this.
       * No support for `lazyLoading` yet.
       */
      withSearch: true;
      /**
       * Value of the search input.
       */
      searchTerm?: string;
    }
  | {
      withSearch?: false;
      searchTerm?: never;
    };

export type SelectModelValueProps<TValue extends SelectOptionValue> =
  | {
      /**
       * Allows the selection of multiple options
       */
      multiple?: false;
      /**
       * Current value.
       */
      modelValue?: SelectOption<TValue>;
      withCheckAll?: never;
    }
  | {
      /**
       * Allows the selection of multiple options
       */
      multiple: true;
      /**
       * Current value / selected option(s).
       */
      modelValue?: SelectOption<TValue>[];
      /**
       * If true, a checkbox will be displayed to check/uncheck all options.
       * Disabled and skeleton checkboxes will be excluded from the check/uncheck behavior.
       * Only available if "multiple" is true and no `searchTerm` is provided.
       */
      withCheckAll?:
        | boolean
        | {
            /**
             * Label for the `select all` checkbox.
             * If unset, a default label will be shown depending on the current locale/language.
             */
            label?: string;
          };
    };

export type OnyxSelectProps<TValue extends SelectOptionValue = SelectOptionValue> = DensityProp &
  SelectModelValueProps<TValue> &
  SelectSearchProps &
  Omit<OnyxSelectInputProps<TValue>, "density" | "modelValue"> &
  AutofocusProp & {
    /**
     * Aria label. Must be set for accessibility reasons.
     */
    label: string;
    /**
     * Label describing the selection list, must be set to support assistive technologies.
     */
    listLabel: string;
    /**
     * Available options to choose from.
     */
    options: SelectOption<TValue>[];
    /**
     * Lazy loading options. Can be used to load more options on scroll.
     * If you want to use a button instead, use the `optionsEnd` slot.
     */
    lazyLoading?: SelectLazyLoading;
  };

export type SelectOption<TValue extends SelectOptionValue = SelectOptionValue> = Pick<
  BaseSelectOption<TValue>,
  "value" | "label" | "disabled"
> &
  Pick<OnyxSelectOptionProps, "icon"> & {
    /**
     * Optional group name. If set, all options will be grouped under that group name.
     */
    group?: string;
  };

export type SelectLazyLoading = {
  /**
   * Whether lazy loading should be enabled.
   * Can be disabled e.g. if all options are loaded.
   */
  enabled?: boolean;
  /**
   * Whether the lazy loading is currently loading more options.
   */
  loading?: boolean;
  /**
   * Scroll offset (in pixel). Must be >= 0.
   * Can be used to trigger the `lazyLoad` event earlier (e.g. if scrolled to second last option).
   */
  scrollOffset?: number;
};
