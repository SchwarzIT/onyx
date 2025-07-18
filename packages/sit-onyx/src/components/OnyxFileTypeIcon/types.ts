import type { MediaType } from "../OnyxFileUpload/types.js";
import type { OnyxIconProps } from "../OnyxIcon/types.js";

export type OnyxFileTypeIconProps = Omit<OnyxIconProps, "icon"> & {
  /**
   * Media type of the file, e.g. "application/pdf".
   */
  type: MediaType;
};
