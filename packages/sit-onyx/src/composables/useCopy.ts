import { ref, toValue, type MaybeRefOrGetter } from "vue";

export type UseCopyOptions = {
  /**
   * The string or HTMLElement containing the text to copy. If the source is an HTMLELement, the
   * [`innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) property
   * is used as the text to be copied.
   */
  source: MaybeRefOrGetter<string | HTMLElement>;
  /**
   * The duration in milliseconds to keep the success/error status active.
   *
   * @default 3000
   */
  timeout?: MaybeRefOrGetter<number>;
};

export const useCopy = (options: UseCopyOptions) => {
  const copyStatus = ref<"success" | "error">();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const copy = async () => {
    const _source = toValue(options.source);
    if (!_source) return;

    const text = typeof _source === "string" ? _source : _source.innerText;

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
      timeoutId = setTimeout(() => {
        copyStatus.value = undefined;
        timeoutId = undefined;
      }, duration);
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
