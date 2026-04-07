import { type Writable, Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import { pipeline } from "node:stream/promises";
import type { ReadableStream } from "node:stream/web";
import { createGunzip } from "node:zlib";
import { getPackageManifest } from "query-registry";
import tarStream from "tar-stream";
import { REGISTRY_URL, SIT_ONYX_COMPONENT_META_FILE, USER_AGENT } from "../config.js";
import type { MetaSource } from "../types.js";

class SuccessfulAbort {
  constructor(public readonly data: Buffer) {}
}

// TODO: It's quite fast, but we should add caching nevertheless.
export async function retrieveComponentMetaJsonFile(version: string) {
  const { dist } = await getPackageManifest("sit-onyx", version, REGISTRY_URL);
  const { body } = await fetch(dist.tarball, { headers: { "User-Agent": USER_AGENT } });
  if (!body) {
    throw new Error(`No body in response for tarball request to "${dist.tarball}"!`);
  }

  /**
   * Allows us to stop the stream pipeline at any time.
   * We also use the abort reason to emit the result.
   */
  const abortController = new AbortController();

  const archiveDownload = Readable.fromWeb(body as ReadableStream<Uint8Array>); // Incorrect typing, see: https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/65542#discussioncomment-6071004
  const decompress = createGunzip();
  const fileSearcher = createTarFileSearcher(abortController);

  try {
    await pipeline(archiveDownload, decompress, fileSearcher, { signal: abortController.signal });
    throw new Error("No 'component-meta.json' found!");
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.name === "AbortError" &&
      error.cause instanceof SuccessfulAbort
    ) {
      // Return the found data as parsed JSON
      const { data } = error.cause;
      return JSON.parse(data.toString("utf-8")) as MetaSource[];
    }
    // Re-throw any other error
    throw error;
  }
}

/**
 * Returns a writable stream, which searches a file in a tar archive by filename/filepath.
 * If found, will call the AbortController with the file content as reason.
 */
function createTarFileSearcher(abortController: AbortController): Writable {
  const searchFile = tarStream.extract();

  searchFile.on("entry", async (headers, stream, next) => {
    if (headers.name === SIT_ONYX_COMPONENT_META_FILE) {
      const data = await buffer(stream);
      // found the relevant file, stop further processing
      abortController.abort(new SuccessfulAbort(data));
    } else {
      // continue searching
      stream.resume();
      next();
    }
  });

  return searchFile;
}
