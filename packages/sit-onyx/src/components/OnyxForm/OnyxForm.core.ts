import { computed, inject, provide, toRef, type InjectionKey, type Reactive, type Ref } from "vue";
import type { RequiredMarkerType } from "../../composables/required.js";
import type { ShowErrorMode } from "../../composables/useErrorClass.js";
import { userConsole } from "../../utils/console.js";

const FORM_INJECTION_KEY = Symbol() as InjectionKey<ReturnType<typeof createFormInjectionContext>>;

/**
 * Props on the `OnyxForm` component.
 * These are injected, so that they can be used in the form child components.
 */
export type FormProps = {
  /**
   * Whether the input should be disabled and prevent the user from interacting with it.
   * Disabled makes the element not mutable, focusable, or even submitted with the form.
   * It will also not be validated.
   *
   * @default `false`
   */
  disabled?: boolean;
  /**
   * Configures if and when errors are shown.
   * - `true`: errors will be shown initially.
   * - `false`: errors will never be shown. ⚠️ Only the displaying of the error is effected! An error can still block submission!
   * - "touched": only shows an error *after* a user has significantly interacted with the input, see [:user-invalid](https://drafts.csswg.org/selectors/#user-invalid-pseudo)
   *
   * @default "touched"
   */
  showError?: ShowErrorMode;
  /**
   * How to display the required / optional marker.
   * - optional: will show an `(optional)` text after the label for optional form elements.
   * - required: will show an `*` indicator for required inputs after the label instead.
   *
   * No marker will be visible if the label is hidden.
   *
   * @default undefined By default the parents setting is used, if none is defined on any `required` is the default.
   */
  requiredMarker?: RequiredMarkerType;
  /**
   * Always reserves the space required to show `error` or other messages.
   * Subsequently this will increase the height of the form element permanently.
   * We recommend to enable this to avoid layout shifts.
   *
   * @default `false`
   */
  reserveMessageSpace?: boolean;
};

/**
 * Props that may be used by the form child components.
 */
export type FormComputedProps = {
  [TKey in keyof FormProps]-?: FormProps[TKey];
};

/**
 * Props that may be used by the form child components.
 */
export type FormInjectedProps = {
  /**
   * Whether the input should be disabled and prevent the user from interacting with it.
   * Disabled makes the element not mutable, focusable, or even submitted with the form.
   * It will also not be validated.
   *
   * @default Inherits value from closest `<OnyxForm>` component, defaults to `false` otherwise
   */
  disabled?: FormInjected<boolean>;
  /**
   * Configures if and when errors are shown.
   * - `true`: errors will be shown initially.
   * - `false`: errors will never be shown. ⚠️ Only the displaying of the error is effected! An error can still block submission!
   * - "touched": only shows an error *after* a user has significantly interacted with the input, see [:user-invalid](https://drafts.csswg.org/selectors/#user-invalid-pseudo)
   *
   * @default Inherits value from closest `<OnyxForm>` component or `touched` if none exists
   */
  showError?: FormInjected<ShowErrorMode>;
  /**
   * How to display the required / optional marker.
   * - optional: will show an `(optional)` text after the label for optional form elements.
   * - required: will show an `*` indicator for required inputs after the label instead.
   *
   * No marker will be visible if the label is hidden.
   *
   * @default Inherits value from closest `<OnyxForm>` component or `required` if none exists
   */
  requiredMarker?: FormInjected<RequiredMarkerType>;
  /**
   * Always reserves the space required to show `error` or other messages.
   * Subsequently this will increase the height of the form element permanently.
   * We recommend to enable this to avoid layout shifts.
   *
   * @default Inherits value from closest `<OnyxForm>` component, defaults to `false` otherwise
   */
  reserveMessageSpace?: FormInjected<boolean>;
};

/**
 * Symbol for the injected form injected properties.
 */
export const FORM_INJECTED_SYMBOL = Symbol("FORM_INJECTED_SYMBOL");
export type FORM_INJECTED = symbol; // we can't use `typeof FORM_INJECTED_SYMBOL` as vue is unable to infer its type: https://github.com/SchwarzIT/onyx/issues/1980
/**
 * Prop type used by form child elements, which indicates that the prop value is taken from the parent form by default.
 * The props **MUST** use `FORM_INJECTED_SYMBOL` as default value.
 * `useFormContext` is used to access the injected form properties.
 *
 * @example
 * ```ts
 * const props = withDefaults(defineProps<OnyxComponentProps>(), {
 *   readonly: FORM_INJECTED_SYMBOL,
 *   disabled: FORM_INJECTED_SYMBOL,
 * });
 *
 * const { disabled, readonly } = useFormContext(props);
 * ```
 */
export type FormInjected<T> = T | FORM_INJECTED;

const createCompute = <TKey extends keyof FormProps>(
  formProps: Ref<FormProps> | undefined,
  props: Ref<FormInjectedProps>,
  key: TKey,
  defaultValue: FormComputedProps[TKey],
) =>
  computed(() => {
    const prop = props.value[key] as FormInjected<FormComputedProps[TKey]> | undefined;
    if (prop != undefined && typeof prop !== "symbol") {
      return prop;
    }
    if (prop === FORM_INJECTED_SYMBOL) {
      return formProps?.value[key] ?? defaultValue;
    }
    if (prop != undefined) {
      userConsole?.error(
        `The %s prop is an unrecognized symbol: %o which is not identical to the expected symbol %o.`,
        key,
        prop,
        FORM_INJECTED_SYMBOL,
      );
    }
    return defaultValue;
  });

const createFormInjectionContext =
  (formProps?: Ref<FormProps>) =>
  (
    props: Ref<FormInjectedProps>,
  ): {
    [TKey in keyof FormComputedProps]: NonNullable<Readonly<Ref<FormComputedProps[TKey]>>>;
  } => ({
    disabled: createCompute(formProps, props, "disabled", false),
    showError: createCompute(formProps, props, "showError", "touched"),
    requiredMarker: createCompute(formProps, props, "requiredMarker", "required"),
    reserveMessageSpace: createCompute(formProps, props, "reserveMessageSpace", false),
  });

export const provideFormContext = (formProps: Reactive<FormProps> | undefined) =>
  provide(FORM_INJECTION_KEY, createFormInjectionContext(formProps && toRef(formProps)));

const DEFAULT_FORM_INJECTION_CONTEXT = createFormInjectionContext();
/**
 * Provides the injected form properties (if available).
 * Otherwise a defined default is used.
 * A prop defined on the child component will always take precedence over the injected form properties.
 *
 * The props **MUST** use `FORM_INJECTED_SYMBOL` as default value.
 * The type `FormInjected<T>` can be used as PropType wrapper.
 *
 * @example
 * ```ts
 * const props = withDefaults(defineProps<OnyxComponentProps>(), {
 *   readonly: FORM_INJECTED_SYMBOL, // By default, the forms injected value is used
 *   disabled: FORM_INJECTED_SYMBOL, // By default, the forms injected value is used
 * });
 *
 * const { disabled, readonly } = useFormContext(props);
 * ```
 */
export const useFormContext = (props: Reactive<FormInjectedProps>) => {
  return inject(
    FORM_INJECTION_KEY,
    /** Default */
    DEFAULT_FORM_INJECTION_CONTEXT,
  )(toRef(props));
};
