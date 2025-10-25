import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
    async ({ event, step }) => {
      // Fetching the video
        await step.sleep("fetching....", "5s");
        // Processing the video
        await step.sleep("processing....", "5s");
        // Sending to OpenAI
        await step.sleep("sending....", "5s");

        await step.run("create-workflow", () => {
            return prisma.workflow.create({
                data: {
                    name: 'workflow-from-inngest',
                },
            });
        })
  },
);