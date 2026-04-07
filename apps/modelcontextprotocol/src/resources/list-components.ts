import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type Writable, Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import { pipeline } from "node:stream/promises";
import type { ReadableStream } from "node:stream/web";
import { createGunzip } from "node:zlib";
import { getAbbreviatedPackument, getPackageManifest } from "query-registry";
import tarStream from "tar-stream";
import { REGISTRY_URL, SIT_ONYX_COMPONENT_META_FILE, SIT_ONYX_MIN_VERSION } from "../config.js";
import type { MetaSource, RegisterableResource } from "../types.js";

class SuccessfulAbort {
  constructor(public readonly data: Buffer) {}
}

export const listComponents: RegisterableResource = [
  "list-components",
  new ResourceTemplate("components://sit-onyx/{version}", {
    list: async () => {
      const { versions } = await getAbbreviatedPackument("sit-onyx", REGISTRY_URL);
      const relevantVersions = Object.keys(versions).filter(
        (version) => version.split("-").at(0) ?? "" >= SIT_ONYX_MIN_VERSION,
      );
      const resources = relevantVersions.map((version) => ({
        uri: `components://sit-onyx/${version}`,
        name: version,
      }));
      return { resources };
    },
  }),
  {
    title: "Component Overview",
    description: "Lists all components for a specific version of onyx",
    mimeType: "text/markdown",
  },
  async (uri, { version: _version }) => {
    const version = Array.isArray(_version) ? _version[0] : _version;
    const componentMetaJson = await retrieveComponentMetaJsonFile(version);
    const componentsText = componentMetaJson
      .toSorted((a, b) => a.displayName.localeCompare(b.displayName))
      .map(({ displayName, description }) => `## ${displayName}\n\n${description ?? ""}\n`)
      .join("\n");
    const text = `# Components for \`sit-onyx@${version}\`\n\n${componentsText}`;

    return {
      contents: [
        {
          uri: uri.href,
          text,
          mimeType: "text/markdown",
        },
      ],
    };
  },
];

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

async function retrieveComponentMetaJsonFile(version: string) {
  const { dist } = await getPackageManifest("sit-onyx", version, REGISTRY_URL);
  const { body } = await fetch(dist.tarball);
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
