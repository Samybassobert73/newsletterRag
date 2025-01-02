import { PromptTemplate } from "@langchain/core/prompts";
import fs from "fs";
import path from "path";
import { parse } from "yaml";
export const getPromptText = (dir: string): string => {
  const promptsFilePath = path.resolve(
    __dirname,
    "..",
    "prompts",
    dir,
    `promptText.yaml`
  );
  const fileContent = fs.readFileSync(promptsFilePath, "utf8");
  const prompts = parse(fileContent);
  return prompts.promptText.trim();
};

export const getPrompt = (dir: string) => {
  const promptText = getPromptText(dir);
  return PromptTemplate.fromTemplate(promptText);
};
