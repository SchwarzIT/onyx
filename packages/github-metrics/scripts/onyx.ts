import "dotenv/config";
import { createClient, getMeanStorySize } from "../src/index.js";

const client = createClient({
  organization: "SchwarzIT",
  projectId: 5,
  authToken: process.env.GITHUB_TOKEN ?? "",
  fieldNames: {
    effort: "Effort (d)",
    iteration: "Sprint",
  },
});

const data: Record<PropertyKey, unknown> = {};

// collect various GitHub metrics
await Promise.all([getMeanStorySize({ client }).then((size) => (data.meanStorySize = size))]);

console.log(JSON.stringify(data, null, 2));
