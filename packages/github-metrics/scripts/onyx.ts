import "dotenv/config";
import { createClient, getBugFixingRatio, getMeanStorySize, getThroughput } from "../src/index.js";

const client = createClient({
  organization: "SchwarzIT",
  projectId: 5,
  authToken: process.env.GITHUB_TOKEN ?? "",
  fields: {
    effort: "Effort (d)",
    iteration: "Sprint",
    status: {
      fieldName: "Status",
      options: {
        finished: "Done",
      },
    },
  },
});

const data: Record<PropertyKey, unknown> = {};

// collect various GitHub metrics
await Promise.all([
  getMeanStorySize({ client }).then((value) => (data.meanStorySize = value)),
  getBugFixingRatio({ client }).then((value) => (data.bugFixingRatio = value)),
  getThroughput({ client }).then((value) => (data.throughput = value)),
]);

console.log(JSON.stringify(data, null, 2));
