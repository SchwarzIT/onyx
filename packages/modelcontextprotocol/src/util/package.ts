import { type Writable, Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import { pipeline } from "node:stream/promises";
import type { ReadableStream } from "node:stream/web";
import { createGunzip } from "node:zlib";
import { getPackageManifest } from "query-registry";
import tarStream, { type Headers } from "tar-stream";

class SuccessfulAbort {
  constructor() {}
}

type Matcher = (headers: Headers) => boolean;

type Result = { headers: Headers; data: Buffer };

type PackageIdentifier = {
  name: string;
  versionOrTag?: string;
  registry?: string;
};

// TODO: It's quite fast, but we should add caching nevertheless.
export async function getFilesFromPackage(
  packageIdent: PackageIdentifier,
  matchers: Matcher[],
  userAgent: string,
) {
  const { dist } = await getPackageManifest(
    packageIdent.name,
    packageIdent.versionOrTag,
    packageIdent.registry,
  );
  const { body } = await fetch(dist.tarball, { headers: { "User-Agent": userAgent } });
  if (!body) {
    throw new Error(`No body in response for tarball request to "${dist.tarball}"!`);
  }

  /**
   * Allows us to stop the stream pipeline at any time.
   * We also use the abort reason to emit the result.
   */
  const abortController = new AbortController();
  const results: Result[] = [];

  const archiveDownload = Readable.fromWeb(body as ReadableStream<Uint8Array>); // Incorrect typing, see: https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/65542#discussioncomment-6071004
  const decompress = createGunzip();
  const fileSearcher = createTarFileSearcher(matchers, results, abortController);

  try {
    await pipeline(archiveDownload, decompress, fileSearcher, { signal: abortController.signal });
    if (results.length) {
      return results;
    }
    throw new Error("No matching file found!");
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.name === "AbortError" &&
      error.cause instanceof SuccessfulAbort
    ) {
      return results;
    }
    // Re-throw any other error
    throw error;
  }
}

/**
 * Returns a writable stream, which searches a file in a tar archive.
 * If found, will call the AbortController with the file content as reason.
 */
function createTarFileSearcher(
  matchers: Matcher[],
  results: Result[],
  abortController: AbortController,
): Writable {
  const searchFile = tarStream.extract();

  searchFile.on("entry", async (headers, stream, next) => {
    if (matchers.some((m) => m(headers))) {
      const data = await buffer(stream);
      results.push({ headers, data });
    }
    if (results.length === matchers.length) {
      // found the relevant files, stop further processing
      abortController.abort(new SuccessfulAbort());
    } else {
      // continue searching
      stream.resume();
      next();
    }
  });

  return searchFile;
}
