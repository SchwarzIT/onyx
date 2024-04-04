import { computed, onMounted, ref, watch } from "vue";

/**
 * Applies the light/dark mode to the UI and syncs it with the localeStorage.
 */
export const useDark = () => {
  const THEME_STORAGE_KEY = "onyx-playground-prefer-dark" as const;

  const isDark = ref(false);
  const theme = computed(() => (isDark.value ? "dark" : "light"));

  /**
   * Sync dark mode with document classList and localStorage.
   */
  watch(isDark, (newDark) => {
    const classList = document.documentElement.classList;
    if (newDark) classList.add("dark");
    else classList.remove("dark");
    localStorage.setItem(THEME_STORAGE_KEY, String(newDark));
  });

  // load current theme in page load
  onMounted(() => {
    isDark.value =
      localStorage.getItem(THEME_STORAGE_KEY) === "true" ||
      document.documentElement.classList.contains("dark");
  });

  return { isDark, theme };
};
