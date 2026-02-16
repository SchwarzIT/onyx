import * as ALL_ICONS from "@sit-onyx/icons";
import { getIconImportName } from "@sit-onyx/icons/utils";

/**
 * Composable for resolving the icon content based on the icon name.
 */
export const useIcon = (iconName: MaybeRef<string | undefined>) => {
  const icon = ref<string>();

  watch(
    toRef(iconName),
    (newIconName) => {
      icon.value = newIconName
        ? ALL_ICONS[getIconImportName(newIconName) as keyof typeof ALL_ICONS]
        : undefined;

      if (newIconName && import.meta.dev && !icon.value) {
        // eslint-disable-next-line no-console -- used only during development environment
        console.warn(`Dynamic icon with name "${iconName}" not found.`);
      }
    },
    { immediate: true },
  );

  return {
    /**
     * Resolved icon content.
     */
    icon,
  };
};
