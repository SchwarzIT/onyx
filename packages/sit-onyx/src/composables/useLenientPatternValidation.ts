import { computed, toValue, type MaybeRefOrGetter } from "vue";
export type PatternChecker = RegExp | ((value: string) => boolean);
export type Pattern =
  | PatternChecker
  | {
      pattern: PatternChecker;
      description?: string;
      /**
       * Restricts the user from performing inputs that would result in an invalid input field.
       */
      strict?: boolean;
    };

export type PatternProps = {
  pattern?: Pattern;
};

const patternCheckerToRegEx = (pattern: PatternChecker) => {
  if (!pattern) {
    return;
  }
  // We want to use the native pattern attribute, which
  let base: RegExp;
  if (pattern instanceof RegExp) {
    base = new RegExp(pattern, "v");
  }
  try {
    base = new RegExp(`^(?:${pattern})$`, "v");
  } catch (e) {
    import.meta.env.DEV && console.error("pattern is not a valid RegEx and will be ignored:", e);
    return;
  }
};

const patternCheckerToValidation = (pattern?: PatternChecker) => {
  if (!pattern) {
    return;
  }
  if (pattern instanceof RegExp) {
    return (value: string) => new RegExp(pattern).test(value);
  }
  return pattern;
};

export const useLenientPatternValidation = (options: {
  modelValue?: MaybeRefOrGetter<string>;
  props: PatternProps;
}) => {
  const normalized = computed(() => {
    const pattern = options.props.pattern;

    if (pattern && typeof pattern === "object" && !(pattern instanceof RegExp)) {
      return {
        isValid: patternCheckerToValidation(pattern.pattern),
        strict: pattern.strict ?? false,
      };
    }
    return {
      isValid: patternCheckerToValidation(pattern),
      strict: false,
    };
  });

  return computed(() => {
    const { strict, isValid } = toValue(normalized);
    return {
      onInputCapture:
        strict && isValid
          ? (event: InputEvent) => {
              const target = event.target as HTMLInputElement | HTMLTextAreaElement;
              const value = target?.value ?? "";
              console.log("event1 :", event);
              if (value && !isValid(value)) {
                console.log("event2 :", event);
                event.preventDefault();
                event.stopPropagation();
                target.value = toValue(options.modelValue) ?? "";
              }
            }
          : undefined,
    };
  });
};
