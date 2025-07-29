import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OnyxColor } from "../../types/colors.js";
import type { BinaryPrefixedSize } from "../../utils/numbers.js";
import type { OnyxFileTypeIconProps } from "../OnyxFileTypeIcon/types.js";
import type { SharedLinkProps } from "../OnyxRouterLink/types.js";

export type OnyxFileCardProps = DensityProp &
  Pick<OnyxFileTypeIconProps, "type"> & {
    /**
     * Name of the file.
     */
    filename: string;
    /**
     * File size.
     * Can be a number in bytes (e.g. 1024 \* 1024 \* 42) or a [binary prefixed size](https://en.wikipedia.org/wiki/Binary_prefix) (e.g. 42MiB).
     * For the user, the size will be displayed in decimal instead of binary notation (e.g. 42MB instead of 42MiB) since users are mostly non-technical and such visualization is therefore simpler to understand.
     */
    size: number | BinaryPrefixedSize;
    /**
     * Link to the file. If set, the filename will be rendered as link.
     */
    link?: string | SharedLinkProps;
    /**
     * Optional status text to show.
     */
    status?: FileCardStatus;
    /**
     * Optional icon to show. If unset, a default icon will be shown depending on the file `type` property.
     */
    icon?: string;
    /**
     * Whether to show a skeleton card.
     */
    skeleton?: SkeletonInjected;
  };

export type FileCardStatus = {
  /**
   * Status text to show.
   */
  text: string;
  /**
   * Text color.
   * If set to "danger", an error icon will be displayed instead of the regular file icon.
   */
  color: OnyxColor;
};
