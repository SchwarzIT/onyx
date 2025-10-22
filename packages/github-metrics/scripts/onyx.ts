import "dotenv/config";
import { type BasicProjectsQueryOptions, getMeanStorySize } from "../src/index.js";

const data: Record<PropertyKey, unknown> = {};

const options: BasicProjectsQueryOptions = {
  organization: "SchwarzIT",
  projectId: 5,
};

// collect various GitHub metrics
await Promise.all([
  getMeanStorySize({ ...options, field: "Effort (d)" }).then((size) => (data.meanStorySize = size)),
]);

console.log(JSON.stringify(data, null, 2));
