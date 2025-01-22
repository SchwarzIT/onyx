import type { DensityProp } from "../../composables/density";
import type { AutofocusProp, BaseSelectOption, SelectOptionValue } from "../../types";
import type { FormInjected } from "../OnyxForm/OnyxForm.core";
import type { OnyxSelectInputProps } from "../OnyxSelectInput/types";
import type { OnyxSelectOptionProps } from "../OnyxSelectOption/types";

export type OnyxSelectProps<
  TMultiple extends boolean | undefined,
  TValue extends SelectOptionValue = SelectOptionValue,
> = DensityProp &
  Omit<OnyxSelectInputProps, "density" | "modelValue" | "showFocus" | "disabled"> &
  AutofocusProp &
  Pick<BaseSelectOption, "truncation"> & {
    /**
     * Disables the implicit options filtering when the user changes the search term.
     */
    noFilter?: boolean;
    /**
     * Allows the user to filter the list entries.
     * If enabled, you need to manually filter the options based on the current `searchTerm`.
     * You can use our `normalizedIncludes()` utility function for this.
     * No support for `lazyLoading` yet.
     */
    withSearch?: boolean;
    /**
     * Allows the selection of multiple options
     */
    multiple?: TMultiple;
    /**
     * If true, a checkbox will be displayed to check/uncheck all options.
     * Disabled and skeleton checkboxes will be excluded from the check/uncheck behavior.
     * Only available if "multiple" is true and no `searchTerm` is provided.
     */
    withCheckAll?: TMultiple extends true
      ?
          | boolean
          | {
              /**
               * Label for the `select all` checkbox.
               * If unset, a default label will be shown depending on the current locale/language.
               */
              label?: string;
            }
      : never;

    /**
     * Whether the select should be disabled.
     */
    disabled?: FormInjected<boolean>;
    /**
     * Label that will be shown in the input of OnyxSelect.
     * If unset, will be managed internally by comparing `modelValue` with `options`.
     * Recommended to be used if not all options can be provided at once
     * or a manual search is implemented.
     */
    valueLabel?: string | string[];
    /**
     * Alignment of the select flyout relative to the input.
     * If set to full, the width of the flyout will be aligned (100%) with the input of the select.
     * Otherwise the flyout width will fit the options content width and aligned left/right.
     */
    alignment?: SelectAlignment;
    /**
     * Label describing the list of options to support assistive technologies.
     * @example: { label: "Your Animal", listLabel: "List of animals" }
     */
    listLabel: string;
    /**
     * Text describing the list of options which will be displayed at the bottom of the flyout.
     */
    listDescription?: string;
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
  "value" | "label" | "truncation"
> &
  Pick<OnyxSelectOptionProps, "icon"> & {
    /**
     * Disables the option and prevents it from being selected.
     */
    disabled?: boolean;
    /**
     * Optional group name. If set, all options with the same group name will be grouped below that name.
     * If `group` is used for one option, it should be used for all other options as well.
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

export const SELECT_ALIGNMENTS = ["full", "left", "right"] as const;
export type SelectAlignment = (typeof SELECT_ALIGNMENTS)[number];
