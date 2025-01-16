import type { ManagedProp } from "../../composables/useManagedState";
import type { BaseSelectOption, SelectOptionValue } from "../../types";
import type { FormInjected } from "../OnyxForm/OnyxForm.core";
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
       * Property is managed internally, when undefined. That means:
       * As default, onyx will handle filtering the options by comparing
       * the option labels with the `searchTerm`.
       *
       * When `searchTerm` is handled by you (not undefined), this behavior is disabled.
       * Then, you can handle the filtering yourself by reducing the `options` as desired.
       * Hint: Cover `valueLabel` to prevent the disappearance of the current selections label
       */
      searchTerm?: ManagedProp<string>;
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
       * Value of the currently selected option.
       */
      modelValue?: TValue;
      withCheckAll?: never;
    }
  | {
      /**
       * Allows the selection of multiple options
       */
      multiple: true;
      /**
       * Values of the currently selected options.
       */
      modelValue?: TValue[];
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

export type OnyxSelectProps<TValue extends SelectOptionValue = SelectOptionValue> =
  SelectModelValueProps<TValue> &
    SelectSearchProps &
    Omit<OnyxSelectInputProps, "density" | "modelValue" | "showFocus" | "disabled"> &
    Pick<BaseSelectOption, "truncation"> & {
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
       * If true, the select popover is expanded and visible.
       * Property is managed internally, when undefined.
       */
      open?: ManagedProp<boolean>;
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
  "value" | "label" | "disabled" | "truncation"
> &
  Pick<OnyxSelectOptionProps, "icon"> & {
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
