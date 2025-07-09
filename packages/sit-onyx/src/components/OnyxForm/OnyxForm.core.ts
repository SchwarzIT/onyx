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
   * Defaults to `false`.
   */
  disabled?: boolean;
  /**
   * Configures if and when errors are shown.
   * When `true`, errors will be shown initially.
   * When `false`, errors will never be shown. ⚠️ Only the displaying of the error is effected! An error can still block submission!
   *
   * The default is `"touched"`, which only shows an error *after* a user has significantly interacted with the input.
   * See [:user-invalid](https://drafts.csswg.org/selectors/#user-invalid-pseudo).
   */
  showError?: ShowErrorMode;
  /**
   * Required mode: `optional` will show an `(optional)` text after the label for optional form elements.
   * `required` will show an `*` indicator for required inputs after the label instead.
   * No marker will be visible if the label is hidden.
   * @default undefined By default the parents setting is used, if none is defined on any `required` is the default.
   */
  requiredMarker?: RequiredMarkerType;
};

/**
 * Props that may be used by the form child components.
 */
export type FormComputedProps = {
  [TKey in keyof FormProps]-?: FormProps[TKey];
};

/**
 * ❗️ DO NOT USE THIS TYPE ❗️
 *
 * Manual replication of the `keyof FormProps` type.
 * Unfortunately this is necessary because Vue can only support simple index types.
 *
 * See discussion in https://github.com/vuejs/core/issues/8286
 */
export type __DONT_USE_VUE_FIX_KeyOfFormProps = "disabled" | "showError" | "requiredMarker";

/**
 * Props that may be used by the form child components.
 */
export type FormInjectedProps = {
  [TKey in __DONT_USE_VUE_FIX_KeyOfFormProps]?: FormInjected<FormProps[TKey]>;
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
