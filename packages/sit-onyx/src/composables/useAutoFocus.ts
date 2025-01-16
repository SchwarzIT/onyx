import { onMounted, watch, type Ref } from "vue";

export const useAutofocus = (
  inputRef: Ref<HTMLElement | null>,
  props: { autofocus: boolean; loading?: boolean },
) => {
  if (!props.autofocus) {
    return;
  }

  onMounted(() => {
    if (!props.loading) {
      inputRef.value?.focus();
      return;
    }

    watch(
      () => !!props.loading,
      () => inputRef.value?.focus(),
      { once: true },
    );
  });
};
