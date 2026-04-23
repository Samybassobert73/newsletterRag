import mongoose from "mongoose";
import { getEmbedding } from "./api/embeding";
import { getMongoURI } from "./config/api.config";
import { sementicSearch } from "./entities/news/service";

const main = async () => {
  const data = await getNewsUrlsData2();
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
