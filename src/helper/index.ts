import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ParamsFromFString, PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { Document } from "langchain/document";

export const createChain = ({
  llm,
  prompt,
}: {
  llm: ChatOpenAI;
  prompt: PromptTemplate<ParamsFromFString<string>, any>;
}) => {
  return RunnableSequence.from([prompt, llm, new StringOutputParser()]);
};

export const scrapeUrl = async (url: string): Promise<Document[]> => {
  const selector = "p";
  const cheerioLoader = new CheerioWebBaseLoader(url, {
    selector: "article, h1, h2, h3, h4, h5, h6, p",
  });
  return cheerioLoader.load();
};

export const invokeChain = async (
  chain: any,
  docs: Document[]
): Promise<string> => {
  const summary = await chain.invoke({ context: docs });
  return summary;
};

export const textToDocument = (summary: string): Document => {
  return new Document({ pageContent: summary });
};
