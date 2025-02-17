export type OnyxImageProps = {
  /**
   * Image URL to show.
   * You can pass different images for light and dark mode.
   */
  src: string | { light: string; dark: string };
  /**
   * (Descriptive) Text that can replace the image, e.g. if it can not be loaded.
   * Can be set to an empty string if the image is only used for decoration and NOT a key part of the content.
   */
  alt: string;
  /**
   * Width of the image in pixels.
   * Will be used by the browser to reserve space while the image is loading and is recommended to prevent a layout shift.
   */
  width: number;
  /**
   * Height of the image in pixels.
   * Will be used by the browser to reserve space while the image is loading and is recommended to prevent a layout shift.
   */
  height: number;
  /**
   * Defines how the image should be loaded.
   * - lazy: Defers loading until the image reaches a browser-defined distance from the viewport
   * - eager: Immediately loads the image, regardless of whether its currently in the visible viewport
   */
  loading?: ImageLoading;
  /**
   * Image border shape. If unset, the original image shape will be used.
   */
  shape?: ImageShape;
};

export type ImageLoading = "eager" | "lazy";

export const IMAGE_SHAPES = ["rounded", "circle", "clip", "clip-inverted"] as const;
export type ImageShape = (typeof IMAGE_SHAPES)[number];
