import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openai = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});
const anthropic = createAnthropic({});
const deepseek = createDeepSeek({});

export const executeAi = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("Pretending to do work...", "5s");
    const { steps: geminiSteps } = await step.ai.wrap("gemini-generate-text",
      generateText,
        {
          system: "You are a helpful assistant.",
          model: google("gemini-2.5-flash"),
          prompt: "What is 2 + 2?",
        }
      );
    const { steps: openaiSteps } = await step.ai.wrap("openai-generate-text",
      generateText,
        {
          system: "You are a helpful assistant.",
          model: openai("openai/gpt-4o-mini"),
          prompt: "What is 2 + 2?",
        }
      );
    const { steps: anthropicSteps } = await step.ai.wrap("anthropic-generate-text",
      generateText,
        {
          system: "You are a helpful assistant.",
          model: anthropic("claude-3-5-haiku-20241022"),
          prompt: "What is 2 + 2?",
        }
      );
    const { steps: deepseekSteps } = await step.ai.wrap("deepseek-generate-text",
      generateText,
        {
          system: "You are a helpful assistant.",
          model: deepseek("deepseek-chat"),
          prompt: "What is 2 + 2?",
        }
      );
    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
      deepseekSteps,
    };
  },
);