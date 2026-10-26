/**
 * Composable for getting the navigation of all available Onyx components.
 */
export const useComponentsNavigation = () => {
  const { locale } = useI18n();

  return useSidebarNavigation({
    collection: computed(() => `components_${locale.value}` as const),
    fields: ["status", "componentName"],
  });
};
