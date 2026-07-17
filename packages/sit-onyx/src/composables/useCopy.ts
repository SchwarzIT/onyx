import { ref, toValue, type MaybeRefOrGetter } from "vue";

export type UseCopyOptions = {
  /**
   * The string, ref, or getter function containing the text to copy.
   */
  source: MaybeRefOrGetter<string>;
  /**
   * The duration in milliseconds to keep the success/error status active.
   *
   * @default 3000
   */
  timeout?: MaybeRefOrGetter<number>;
};

export const useCopy = (options: UseCopyOptions) => {
  const copyStatus = ref<"success" | "error" | undefined>();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const copy = async () => {
    const text = toValue(options.source);
    if (!text) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    try {
      // eslint-disable-next-line compat/compat -- event handler is safe as it can only be triggered in the client
      await navigator.clipboard.writeText(text);
      copyStatus.value = "success";
    } catch {
      copyStatus.value = "error";
    } finally {
      const duration = toValue(options.timeout) ?? 3000;
      await new Promise((resolve) => (timeoutId = setTimeout(resolve, duration)));
      copyStatus.value = undefined;
      timeoutId = undefined;
    }
  };

  return {
    /**
     * Current copy status.
     */
    copyStatus,
    /**
     * Executes the copy operation using the provided source value.
     */
    copy,
  };
};
