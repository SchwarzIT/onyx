import { onMounted, ref, unref, watchEffect, type MaybeRef, type Ref, type ShallowRef } from "vue";

export type UseCssVariableValueOptions = {
  /**
   * Name of the CSS variable (without `var(--)`).
   */
  name: MaybeRef<string>;
  /**
   * Template ref to use as base for getting the variable value.
   *
   * @default document.documentElement
   */
  element?: Readonly<ShallowRef<HTMLDivElement | null>>;
  /**
   * If `true`, the value will not be calculated.
   */
  disabled?: Ref<boolean | undefined>;
};

/**
 * Composable for getting the value of a CSS variable. Safe to use in server side rendering.
 */
export const useCssVariableValue = (options: UseCssVariableValueOptions) => {
  const value = ref<string>();

  onMounted(() => {
    watchEffect(() => {
      if (unref(options.disabled)) {
        value.value = undefined;
        return;
      }

      const element = unref(options.element) ?? document.documentElement;
      const variableName = `--${unref(options.name)}`;
      value.value = getComputedStyle(element).getPropertyValue(variableName);
    });
  });

  return { value };
};
