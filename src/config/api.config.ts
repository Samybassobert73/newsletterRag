import dotenv from "dotenv";

dotenv.config();

export const getOpenAiApiKey = (): string => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY n'est pas définie dans le fichier .env");
  }
  return apiKey;
};

export const getSerpApiApiKey = (): string => {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    throw new Error("SERPAPI_API_KEY n'est pas définie dans le fichier .env");
  }
  return apiKey;
};

export const getResendApiKey = (): string => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY n'est pas définie dans le fichier .env");
  }
  return apiKey;
};

export const getNewsLetterEmail = (): string => {
  const email = process.env.NEWSLETTER_EMAIL || "finsquawk@nwsl8r.com";
  if (!email) {
    throw new Error("NEWSLETTER_EMAIL n'est pas définie dans le fichier .env");
  }
  return email;
};

export const getHuggingFaceToken = (): string => {
  const apiKey = process.env.HF_TOKEN;
  if (!apiKey) {
    throw new Error("HF_TOKEN n'est pas définie dans le fichier .env");
  }
  return apiKey;
};

export const getMongoURI = (): string => {
  const URI = process.env.MONGO_URI;
  if (!URI) {
    throw new Error("MONGO_URI n'est pas définie dans le fichier .env");
  }
  return URI;
};
