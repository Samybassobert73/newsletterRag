import React from "react";
import NewsletterEmail from "../../emails/NewsletterEmail";
export interface Article {
  country: string;
  interest: string;
  title: string;
  content: string;
  sourceUrl: string;
}

export interface Advertiser {
  title: string;
  name: string;
  logo: string;
  adImageUrl: string;
  adLinkUrl: string;
  content: string;
}
export const generateEmail = (
  mainTitle: string,
  articles: Article[],
  advertiser?: Advertiser
): React.ReactNode => {
  return NewsletterEmail({ mainTitle, articles, advertiser });
};
