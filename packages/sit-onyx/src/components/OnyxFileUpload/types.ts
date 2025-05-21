import type { DensityProp } from "../../composables/density";

export type OnyxFileUploadProps<TMultiple extends boolean> = DensityProp & {
  /**
   * Aria label of the upload, required for accessibility / screen readers.
   */
  label: string;
  /**
   * Currently selected file(s).
   * If `multiple` property is enabled, this value is an array, otherwise a single file.
   */
  modelValue?: TMultiple extends true ? File[] : File;
  /**
   * Whether multiple files can be selected.
   * If `true`, the `modelValue` property will be an array, otherwise a single value.
   */
  multiple?: TMultiple;
  /**
   * File types to accept/allow for the upload.
   * If undefined or an empty array, all types will be allowed.
   *
   * For a full list of media types, see the [official docs](https://www.iana.org/assignments/media-types/media-types.xhtml).
   *
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#unique_file_type_specifiers
   */
  accept?: FileType[];
  /**
   * Visual size of the upload area.
   */
  size?: UploadSize;
  /**
   * Max. allowed file size per file.
   * To limit the total size when `multiple` is enabled, you can use the `maxTotalSize` property.
   */
  maxSize?: number;
  /**
   * Max. allowed total file size for all files when `multiple` is enabled.
   * To limit the size per-file, you can use the `maxSize` property.
   */
  maxTotalSize?: TMultiple extends true ? number : never;
  /**
   * Max. file count that can be selected if `multiple` is enabled.
   */
  maxCount?: TMultiple extends true ? number : never;
  /**
   * Whether to replace all existing files when `multiple` is enabled.
   * By default, newly selected files will be added to the current selection.
   */
  replace?: boolean;
  /**
   * Whether the upload is disabled.
   */
  disabled?: boolean;
};

export const UPLOAD_SIZES = ["small", "medium", "large"] as const;
export type UploadSize = (typeof UPLOAD_SIZES)[number];

/**
 * Unique file type specifier.
 * For a full list of media types, see the [official docs](https://www.iana.org/assignments/media-types/media-types.xhtml).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#unique_file_type_specifiers
 */
export type FileType = `.${string}` | `${"audio" | "video" | "image"}/*` | MediaType;

export type MediaType =
  `${"application" | "audio" | "font" | "image" | "model" | "text" | "video"}/${string}`;
