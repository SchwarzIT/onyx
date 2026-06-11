import type { MediaType } from "sit-onyx";

export type DownloadFileOptions = {
  /**
   * File content.
   */
  content: string;
  /**
   * File media type.
   */
  type: MediaType;
  /**
   * Filename.
   */
  filename: string;
};

/**
 * Downloads the given content as file.
 */
export function downloadFile(options: DownloadFileOptions) {
  const blob = new Blob([options.content], { type: options.type });
  const url = URL.createObjectURL(blob);

  // create a temporary hidden link
  const link = document.createElement("a");
  link.href = url;
  link.download = options.filename;
  link.style.display = "none";

  // add the link to the DOM and click it to trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // clean up to prevent memory leaks!
  URL.revokeObjectURL(url);
}
