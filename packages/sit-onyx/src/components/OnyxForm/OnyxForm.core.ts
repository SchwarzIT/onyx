import { computed, inject, provide, type InjectionKey, type Reactive, type Ref } from "vue";

const FORM_INJECTION_KEY = Symbol() as InjectionKey<ReturnType<typeof createFormInjectionContext>>;

/**
 * Props on the `OnyxForm` component.
 * These are injected, so that they can be used in the form child components.
 */
export type FormInjectedProps = {
  disabled: boolean;
};

/**
 * Props that may be used by the form child components.
 */
type LocalProps = {
  [TKey in keyof FormInjectedProps]?: FormInjected<FormInjectedProps[TKey]>;
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

const createCompute = <
  TKey extends keyof FormInjectedProps,
  TValue extends FormInjectedProps[keyof FormInjectedProps],
>(
  formProps: FormInjectedProps | undefined,
  props: LocalProps,
  key: TKey,
  defaultValue: TValue,
): Readonly<Ref<FormInjectedProps[TKey]>> =>
  computed(() => {
    const prop = props[key] as FormInjected<FormInjectedProps[TKey]> | undefined;
    if (prop != undefined && prop !== FORM_INJECTED_SYMBOL) {
      return prop;
    }
    return formProps?.[key] ?? defaultValue;
  });

const createFormInjectionContext =
  (formProps?: FormInjectedProps) =>
  (
    props: Reactive<LocalProps>,
  ): { [TKey in keyof FormInjectedProps]: Ref<FormInjectedProps[TKey]> } => ({
    get disabled() {
      return createCompute(formProps, props, "disabled", false);
    },
  });

export const provideFormContext = (formProps: Reactive<FormInjectedProps> | undefined) =>
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
export const useFormContext = (props: Reactive<LocalProps>) => {
  return inject(
    FORM_INJECTION_KEY,
    /** Default */
    DEFAULT_FORM_INJECTION_CONTEXT,
  )(props);
};
