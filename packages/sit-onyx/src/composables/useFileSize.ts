import { computed } from "vue";
import { injectI18n } from "../i18n/index.js";
import {
  type BinaryPrefixedSize,
  convertBinaryPrefixToBytes,
  formatBytesToString,
} from "../utils/numbers.js";

/**
 * Small composable for formatting file sizes with i18n.
 */
export const useFileSize = () => {
  const { locale } = injectI18n();

  const formatFileSize = computed(() => {
    return (size: number | BinaryPrefixedSize) => {
      const bytes = typeof size === "number" ? size : convertBinaryPrefixToBytes(size);
      return formatBytesToString(locale.value, bytes);
    };
  });

  return {
    /**
     * Formats the given file size to a human readable string.
     */
    formatFileSize,
  };
};
