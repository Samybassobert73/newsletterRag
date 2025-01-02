import mongoose from "mongoose";
import { getEmbedding } from "./api/embeding";
import { getMongoURI } from "./config/api.config";
import { newsData } from "./dataset/news";
import { create } from "./entities/news/service";

const main = async () => {
  try {
    await mongoose.connect(getMongoURI());
    console.log("Connected to MongoDB!");

    const promises = newsData.map(async (newsItem) => {
      try {
        const content_embedding = await getEmbedding(newsItem.content);

        const content = {
          text: newsItem.content,
          vector: content_embedding,
        };

        const title_embedding = await getEmbedding(newsItem.title);

        const title = {
          text: newsItem.title,
          vector: title_embedding,
        };

        const news = await create({
          title,
          url: newsItem.url,
          content,
          date: new Date(newsItem.date),
        });

        const result = await create(news);
        console.log(`Created news item with ID: ${result._id}`);
        return result;
      } catch (error) {
        console.error(`Error processing news item:`, error);
        return null;
      }
    });

    // 3. Attendre que toutes les opérations soient terminées
    const results = await Promise.all(promises);
    const successCount = results.filter((result) => result !== null).length;
    console.log(
      `Successfully processed ${successCount} out of ${newsData.length} items`
    );
  } catch (error) {
    console.error("Failed to execute the script:", error);
    throw error;
  } finally {
    // 4. Fermer la connexion MongoDB
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

main().catch((error) => {
  console.error("Error:", error);
});
