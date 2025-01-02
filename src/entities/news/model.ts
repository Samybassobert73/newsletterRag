import mongoose, { Schema } from "mongoose";

// Interface pour les champs avec embedding
interface EmbeddedField {
  text: string;
  vector?: number[];
}

//mongo schema for news
export interface News {
  title: EmbeddedField;
  url: string;
  content: EmbeddedField;
  date: Date;
}

const embeddedFieldSchema = new Schema<EmbeddedField>({
  text: { type: String, required: true },
  vector: { type: [Number], required: false },
});

export type INews = News & mongoose.Document;

//schema for news
export const newsSchema = new Schema<News>({
  title: {
    type: embeddedFieldSchema,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  content: {
    type: embeddedFieldSchema,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

//model for news
export const NewsModel = mongoose.model<News>("News", newsSchema);
