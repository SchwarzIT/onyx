import { describe, expect, it } from "vitest";
import type { FileType } from "../components/OnyxFileUpload/types.js";
import { validateFileType } from "./file.js";

const jpegFile = { name: "example.jpg", type: "image/jpeg" };

describe("validateFileType", () => {
  describe("valid cases", () => {
    it.each([
      {
        title: "should be valid for no accept list",
        accept: undefined,
        file: jpegFile,
      },
      {
        title: "should be valid for no empty accept list",
        accept: [],
        file: jpegFile,
      },
      {
        title: "should be valid for wildcard accept",
        accept: ["*/*" as FileType],
        file: jpegFile,
      },
      {
        title: "should be valid for single media type",
        accept: ["image/jpeg"],
        file: jpegFile,
      },
      {
        title: "should be valid for media type range",
        accept: [".docx", "image/*"],
        file: jpegFile,
      },
      {
        title: "should be valid for single file extension",
        accept: [".jpg"],
        file: jpegFile,
      },
      {
        title: "should be valid for multiple file extension",
        accept: [".png", ".jpg", ".jpeg", "image/*"],
        file: jpegFile,
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
        file: jpegFile,
      },
      {
        title: "should be invalid for non-matching media type range",
        accept: ["audio/*"],
        file: jpegFile,
      },
      {
        title: "should be invalid for non-matching file extension",
        accept: [".png"],
        file: jpegFile,
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
