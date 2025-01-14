import { onMounted, type Ref } from "vue";

export const useAutofocus = (
  inputRef: Ref<HTMLElement | null>,
  props: { autofocus: boolean; loading?: boolean },
) => {
  onMounted(() => {
    if (props.autofocus && !(props.loading ?? false) && document.activeElement !== inputRef.value) {
      inputRef.value?.focus();
    }
  });
};
