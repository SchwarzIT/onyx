import type { DensityProp } from "../../composables/density.js";
import type { BinaryPrefixedSize } from "../../utils/numbers.js";
import type { MediaType } from "../OnyxFileUpload/types.js";
import type { SharedLinkProps } from "../OnyxRouterLink/types.js";

export type OnyxFileCardProps = DensityProp & {
  /**
   * Name of the file.
   */
  filename: string;
  /**
   * Media type of the file, e.g. "application/pdf".
   */
  type: MediaType;
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
};
