import type { MediaType } from "../OnyxFileUpload/types.js";
import type { OnyxIconProps } from "../OnyxIcon/types.js";

export type OnyxFileTypeIconProps = Omit<OnyxIconProps, "icon"> & {
  /**
   * Media type of the file, e.g. "application/pdf".
   */
  type: MediaType;
};

/**
 * A list of media files that have a dedicated icon for the OnyxFileTypeIcon component.
 */
export const SUPPORTED_FILE_TYPE_ICON_MEDIA_TYPES = [
  "application/octet-stream",
  "application/pdf",
  "text/csv",
  "audio/mp3",
  "video/mp4",
  "image/png",
  "application/rtf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/html",
  "application/zip",
  "application/vnd.rar",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/gzip",
  "application/x-bzip2",
] satisfies MediaType[];
