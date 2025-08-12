import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { Nullable } from "../../types/utils.js";
import type { BinaryPrefixedSize } from "../../utils/numbers.js";
import type { FormInjected } from "../OnyxForm/OnyxForm.core.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";

export type OnyxFileUploadProps<TMultiple extends boolean> = DensityProp &
  Pick<SharedFormElementProps, "name"> & {
    /**
     * Currently selected file(s).
     * If `multiple` property is enabled, this value is an array, otherwise a single file.
     */
    modelValue?: TMultiple extends true ? File[] : Nullable<File>;
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
     * Whether to show a skeleton upload.
     */
    skeleton?: SkeletonInjected;
    /**
     * How to display the selected files.
     * - list: Shows a list of all files (no height limit)
     * - maxHeight: Shows a list of files with a max height that when exceeding, the list becomes scrollable
     * By default the max height is set to 3 files but can be customized by setting the `--onyx-file-upload-max-files` CSS variable to
     * the desired number of visible items. Note: The list will always display half of the next invisible file to visually indicate
     * that there are more files available.
     * - button: Shows a show/hide all files button. By default all files are visible (same behavior as "list" type).
     * - hidden: Hides the list completely. Useful when implementing a custom solution.
     *
     * @default list
     */
    listType?: FileUploadListType;
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

export type FileUploadListType = "list" | "maxHeight" | "button" | "hidden";
