import { onMounted, onUnmounted, type Ref } from "vue";

export const useClickOutside = (
  target: Ref<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  const listener = (event: MouseEvent | TouchEvent) => {
    if (!target.value || target.value.contains(event.target as Node)) {
      return;
    }
    handler(event);
  };

  onMounted(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", listener);
    document.removeEventListener("touchstart", listener);
  });
};
