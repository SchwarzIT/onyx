import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { BinaryPrefixedSize } from "../../utils/numbers.js";
import type { OnyxFileCardProps } from "../OnyxFileCard/types.js";
import type { FormInjected } from "../OnyxForm/OnyxForm.core.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";

export type OnyxFileUploadProps<TMultiple extends boolean> = DensityProp &
  Pick<SharedFormElementProps, "name"> &
  OnyxFileArea & {
    /**
     * Currently selected file(s).
     * If `multiple` property is enabled, this value is an array, otherwise a single file.
     */
    modelValue?: TMultiple extends true ? File[] : File | null;
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
     * Max. allowed file size per file.
     * Can be a number in bytes (e.g. 1024 \* 1024 \* 42) or a [binary prefixed size](https://en.wikipedia.org/wiki/Binary_prefix) (e.g. 42MiB).
     * For the user, the size will be displayed in decimal instead of binary notation (e.g. 42MB instead of 42MiB) since users are mostly non-technical and such visualization is therefore simpler to understand.
     *
     * To limit the total size when `multiple` is enabled, you can use the `maxTotalSize` property.
     */
    maxSize?: number | BinaryPrefixedSize;
    /**
     * Max. allowed total file size for all files when `multiple` is enabled.
     * Can be a number in bytes (e.g. 1024 \* 1024 \* 42) or a [binary prefixed size](https://en.wikipedia.org/wiki/Binary_prefix) (e.g. 42MiB).
     * For the user, the size will be displayed in decimal instead of binary notation (e.g. 42MB instead of 42MiB) since users are mostly non-technical and such visualization is therefore simpler to understand.
     *
     * To limit the size per-file, you can use the `maxSize` property.
     */
    maxTotalSize?: TMultiple extends true ? number | BinaryPrefixedSize : never;
    /**
     * Max. file count that can be selected if `multiple` is enabled.
     */
    maxCount?: TMultiple extends true ? number : never;
    /**
     * Whether to replace all existing files when `multiple` is enabled.
     * By default, newly selected files will be added to the current selection.
     */
    replace?: TMultiple extends true ? boolean : never;
    /**
     * Whether the upload is disabled.
     */
    disabled?: FormInjected<boolean>;
    /**
     * The size of the upload container
     * @default large
     */
    size?: FileUploadSize;
    /**
     * Whether to show a skeleton fileUpload.
     */
    skeleton?: SkeletonInjected;
  };

type OnyxFileArea = Pick<OnyxFileCardProps, "icon"> & {
  /**
   * Max Height of the FileArea in rem
   */
  maxHeight?: number | string;
  /**
   * Wheter to display a hide/reveal Button for the file Area
   */
  hasHideButton?: boolean;
  /**
   * Custom Actions for for the fileCards.
   */
  fileCardActions?: { label: string; clickEvent(file: File): void }[];
};
/**
 * Unique file type specifier.
 * For a full list of media types, see the [official docs](https://www.iana.org/assignments/media-types/media-types.xhtml).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#unique_file_type_specifiers
 */
export type FileType = `.${string}` | `${"audio" | "video" | "image"}/*` | MediaType;

/**
 * For a full list of media types, see the [official docs](https://www.iana.org/assignments/media-types/media-types.xhtml).
 */
export type MediaType =
  `${"application" | "audio" | "font" | "image" | "model" | "text" | "video"}/${string}`;

export type FileUploadSize = "large" | "medium" | "small";
