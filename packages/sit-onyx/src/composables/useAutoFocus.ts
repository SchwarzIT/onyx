import { onMounted, watch, type Ref } from "vue";

export const useAutofocus = (
  ref: Ref<HTMLElement | HTMLElement[] | null>,
  props: { autofocus: boolean; loading?: boolean },
) => {
  if (!props.autofocus) {
    return;
  }

  const performAutoFocus = () => {
    const input = Array.isArray(ref) ? ref[0] : ref;
    input.value?.focus();
  };

  onMounted(() => {
    if (!props.loading) {
      performAutoFocus();
      return;
    }

    watch(
      () => !!props.loading,
      () => performAutoFocus(),
      { once: true },
    );
  });
};
