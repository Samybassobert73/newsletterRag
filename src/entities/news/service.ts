import type { News } from "./model";
import { NewsModel } from "./model";
// Exemple d'utilisation
export const create = async (news: News) => {
  return await NewsModel.create(news);
};

export const sementicSearch = async (queryVector: number[]) => {
  const result = NewsModel.aggregate([
    {
      $vectorSearch: {
        queryVector,
        path: "title.vector",
        numCandidates: 100,
        limit: 1,
        index: "title_vector_index",

        filter: {
          $and: [{ date: { $gte: new Date("2024-12-16") } }],
        },
      },
    },
  ]);

  return result;
};
