import mongoose from "mongoose";
import { getEmbedding } from "../api/embeding";
import { getNewsUrlsData2 } from "../api/news";
import { getMongoURI } from "../config/api.config";
import { sementicSearch } from "../entities/news/service";
import { getSubscriberInfos } from "../entities/subscriber";

const main = async () => {
  const { interest, country } = getSubscriberInfos();
  const news = await getNewsUrlsData2(interest, country);
  for (const n of news) {
    console.log(`Processing URL: ${n.url}`);
    const docs = await scrapeUrl(n.url);
  }
  try {
    await mongoose.connect(getMongoURI());

    const query = "microsoft nvidia";
    const queryVector = await getEmbedding(query);

    const result = await sementicSearch(queryVector);
    for await (const doc of result) {
      console.log(doc.title.text);
    }
  } catch (error) {
    console.error("Failed to execute the script:", error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

main().catch((error) => {
  console.error("Error:", error);
});
