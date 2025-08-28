import type { FileType } from "../components/OnyxFileUpload/types.js";

/**
 * Validates the file type against the given accept list.
 * Only performs a basic check based on the file extensions or media type.
 *
 * @param file The file to validate.
 * @param accept The accepted file types as array.
 * @returns `true` if the file type is accepted, `false` otherwise.
 */
export const validateFileType = (
  { name: _name, type: _type }: File,
  accept?: FileType[],
): boolean => {
  // While "*/*" is not a valid value for the `accept` attribute, we still handle it here, just to be sure.
  if (!accept || accept.length === 0 || accept.some((a: string) => a.trim() === "*/*")) {
    return true;
  }
  const name = _name.trim().toLowerCase();
  const type = _type.trim().toLowerCase();

  return accept.some((_accept) => {
    const accept = _accept.trim().toLowerCase();

    // check match for extension, e.g. ".jpg"
    if (accept.startsWith(".")) {
      return name.endsWith(accept);
    }

    // check match for media type range, e.g. "image/*"
    const [acceptedType, acceptedSubType] = accept.split("/");
    if (acceptedSubType === "*") {
      return type.startsWith(`${acceptedType}/`);
    }

    // check match for exact media type, e.g. "image/jpeg"
    return accept === type;
  });
};
