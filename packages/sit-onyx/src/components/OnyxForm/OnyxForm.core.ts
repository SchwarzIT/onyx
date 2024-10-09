import { computed, inject, provide, type InjectionKey, type Ref } from "vue";
import type { ShowErrorModes } from "../../composables/useErrorClass";

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
  disabled: boolean;
  /**
   * Configures if and when errors are shown.
   * When `true`, errors will be shown initially.
   * When `false`, errors will never be shown. ⚠️ Only the displaying of the error is effected! An error can still block submission!
   *
   * The default is `"touched"`, which only shows an error *after* a user has significantly interacted with the input.
   * See [:user-invalid](https://drafts.csswg.org/selectors/#user-invalid-pseudo).
   */
  showError: ShowErrorModes;
};

/**
 * Props that may be used by the form child components.
 */
export type FormInjectedProps = {
  [TKey in keyof FormProps]?: FormInjected<FormProps[TKey]>;
};

/**
 * Symbol for the injected form injected properties.
 */
export const FORM_INJECTED_SYMBOL = Symbol("FORM_INJECTED_SYMBOL");
export type FORM_INJECTED = typeof FORM_INJECTED_SYMBOL;
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
  defaultValue: FormProps[TKey],
): Readonly<Ref<FormProps[TKey]>> =>
  computed(() => {
    const prop = props.value[key] as FormInjected<FormProps[TKey]> | undefined;
    if (prop != undefined && prop !== FORM_INJECTED_SYMBOL) {
      return prop;
    }
    return formProps?.value[key] ?? defaultValue;
  });

const createFormInjectionContext =
  (formProps?: Ref<FormProps>) =>
  (props: Ref<FormInjectedProps>): { [TKey in keyof FormProps]: Ref<FormProps[TKey]> } => ({
    disabled: createCompute(formProps, props, "disabled", false),
    showError: createCompute(formProps, props, "showError", "touched"),
  });

export const provideFormContext = (formProps: Ref<FormProps> | undefined) =>
  provide(FORM_INJECTION_KEY, createFormInjectionContext(formProps));

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
export const useFormContext = (props: Ref<FormInjectedProps>) => {
  return inject(
    FORM_INJECTION_KEY,
    /** Default */
    DEFAULT_FORM_INJECTION_CONTEXT,
  )(props);
};
