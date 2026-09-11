import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp";
import type { AnySchema, ZodRawShapeCompat } from "@modelcontextprotocol/sdk/server/zod-compat";
import * as z from "zod/mini"; // Using zod/mini for tree-shake support
import type { RegisterableResource, RegisterableTool } from "../types.js";

export const resourceToTool = <
  OutputArgs extends ZodRawShapeCompat | AnySchema,
  InputArgs extends undefined | ZodRawShapeCompat | AnySchema = undefined,
>(
  resource: RegisterableResource<boolean>,
): RegisterableTool<OutputArgs, InputArgs> => {
  const [name, template, { title, description }, cb] = resource;
  const hasInputSchema = typeof template === "object" && template.uriTemplate.variableNames.length;

  const inputSchema = hasInputSchema
    ? (Object.fromEntries(
        template.uriTemplate.variableNames.map((v) => [v, z.string()]),
      ) as unknown as InputArgs)
    : undefined;

  return [
    name,
    {
      title,
      description,
      inputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- The amount of parameters varies based on the `inputSchema`
    (async (...args: any[]) => {
      const [vars, extra] = hasInputSchema ? args : [{}, args.at(0)];
      const { contents } = await cb(
        new URL(hasInputSchema ? template.uriTemplate.expand(vars) : template),
        vars,
        extra,
      );
      return {
        content: contents.map((resource) => ({
          type: "resource",
          resource,
        })),
      };
    }) as ToolCallback<InputArgs>,
  ];
};
