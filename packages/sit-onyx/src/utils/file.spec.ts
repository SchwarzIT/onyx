import { describe, expect, it } from "vitest";
import type { FileType } from "../components/OnyxFileUpload/types.js";
import { validateFileType } from "./file.js";

const pngFile = { name: "example.jpg", type: "image/jpeg" };

describe("validateFileType", () => {
  describe("valid cases", () => {
    it.each([
      {
        title: "should be valid for no accept list",
        accept: undefined,
        file: pngFile,
      },
      {
        title: "should be valid for no empty accept list",
        accept: [],
        file: pngFile,
      },
      {
        title: "should be valid for wildcard accept",
        accept: ["*/*" as FileType],
        file: pngFile,
      },
      {
        title: "should be valid for single media type",
        accept: ["image/jpeg"],
        file: pngFile,
      },
      {
        title: "should be valid for media type range",
        accept: [".docx", "image/*"],
        file: pngFile,
      },
      {
        title: "should be valid for single file extension",
        accept: [".jpg"],
        file: pngFile,
      },
      {
        title: "should be valid for multiple file extension",
        accept: [".png", ".jpg", ".jpeg", "image/*"],
        file: pngFile,
      },
    ] satisfies {
      title: string;
      accept?: FileType[];
      file: Pick<File, "name" | "type">;
    }[])("$title", ({ accept, file }) => {
      expect(validateFileType(file as File, accept)).toBeTruthy();
    });
  });

  describe("invalid cases", () => {
    it.each([
      {
        title: "should be invalid for non-matching media type",
        accept: ["image/png"],
        file: pngFile,
      },
      {
        title: "should be invalid for non-matching media type range",
        accept: ["audio/*"],
        file: pngFile,
      },
      {
        title: "should be invalid for non-matching file extension",
        accept: [".png"],
        file: pngFile,
      },
    ] satisfies {
      title: string;
      accept?: FileType[];
      file: Pick<File, "name" | "type">;
    }[])("$title", ({ accept, file }) => {
      expect(validateFileType(file as File, accept)).toBeFalsy();
    });
  });
});
