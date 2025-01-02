import { getNewsUrlsData } from "./api/news";
import { getNewsLetterEmail, getOpenAiApiKey } from "./config/api.config";
import { initializeLLM } from "./config/llm.config";
import { getAdvertiser } from "./entities/advertiser";
import { getSubscriberInfos } from "./entities/subscriber";
import { createChain, scrapeUrl, textToDocument } from "./helper";
import { Article, generateEmail } from "./helper/generateEmail/generateEmail";
import { sendEmail } from "./helper/sendEmail/sendEmail";
import { PromptType } from "./types/prompt.types";
import { writeToFile } from "./utils/output.utils";
import { getPrompt } from "./utils/prompt.utils";
const main = async () => {
  // config OpenAI
  const apiKey = getOpenAiApiKey();
  const llm = initializeLLM(apiKey);

  // Récupérer les prompts
  const articlePrompt = getPrompt(PromptType.ARTICLE);
  const articleTitlePrompt = getPrompt(PromptType.ARTICLE_TITLE);
  const mainTitlePrompt = getPrompt(PromptType.MAIN_TITLE);

  // Créer les chaînes LangChain
  const articleChain = createChain({ llm, prompt: articlePrompt });
  const articleTitleChain = createChain({
    llm,
    prompt: articleTitlePrompt,
  });
  const mainTitleChain = createChain({ llm, prompt: mainTitlePrompt });

  // Récupérer les URLs des articles
  const { interest, country, email: subscriberEmail } = getSubscriberInfos();
  const urls = await getNewsUrlsData(interest, country);

  // Stocker les résumés d'article dans un tableau
  const articles: Article[] = [];

  for (const url of urls) {
    console.log(`Processing URL: ${url}`);
    //scrap url
    const docs = await scrapeUrl(url);

    //article summary
    const articleSummary = await articleChain.invoke({
      context: docs,
    });
    console.log(`Summary for ${url}:\n`, articleSummary);

    const summaryDoc = textToDocument(articleSummary);

    //article title
    const articleTitle = await articleTitleChain.invoke({
      context: summaryDoc,
    });

    const article: Article = {
      interest,
      country,
      title: articleTitle,
      content: articleSummary,
      sourceUrl: url,
    };

    articles.push(article);
  }

  // Créer le main title de la newsletter
  const articlesStrings = textToDocument(
    articles.map((a) => a.content).join("\n")
  );

  const mainTitle = await mainTitleChain.invoke({
    context: articlesStrings,
  });

  const advertiser = getAdvertiser();

  await writeToFile(JSON.stringify({ mainTitle, articles, advertiser }));

  sendEmail({
    from: getNewsLetterEmail(),
    to: subscriberEmail,
    subject: "finsquawk newsletter v0.0.0.0.0.1 🚀",
    react: generateEmail(mainTitle, articles, advertiser),
  });
};

main().catch((error) => {
  console.error("Error:", error);
});
