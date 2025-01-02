import { ChatOpenAI } from "@langchain/openai";

export const initializeLLM = (apiKey: string): ChatOpenAI => {
  return new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    apiKey,
  });
};
