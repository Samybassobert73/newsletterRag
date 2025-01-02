import axios from "axios";
import { getHuggingFaceToken } from "../config/api.config";

export const getEmbedding = async (text: string): Promise<number[]> => {
  const modelId: string = "sentence-transformers/all-MiniLM-L6-v2";
  const API_URL: string = `https://api-inference.huggingface.co/pipeline/feature-extraction/${modelId}`;
  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: text,
        options: { wait_for_model: true },
      },
      {
        headers: {
          Authorization: `Bearer ${getHuggingFaceToken()}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
