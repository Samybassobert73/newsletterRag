import { getJson } from "serpapi";
import { getSerpApiApiKey } from "../config/api.config";

export const getNewsUrls = (): string[] => {
  return [
    //"https://finance.yahoo.com/news/japan-antitrust-watchdog-google-violated-081407299.html",
    // "https://www.theverge.com/2024/12/20/24326242/qualcomm-legal-battle-win-arm-chip-licensing",
    // Ajoutez d'autres URLs ici
    "https://www.lemlist.com/blog/lead-nurturing-tools",
  ];
};

export const getNewsUrlsData = async (
  query: string = "",
  country: string
): Promise<string[]> => {
  const response = await getJson({
    engine: "google_news",
    api_key: getSerpApiApiKey(),
    q: `${query} stock market news this week`,
    gl: country,
    hl: "en",
  });
  return response.news_results.map((result: any) => result.link).slice(0, 5);
};

export const getNewsUrlsData2 = async (
  query: string = "",
  country: string
): Promise<any> => {
  const response = await getJson({
    engine: "google_news",
    api_key: getSerpApiApiKey(),
    q: `${query} stock market news this week`,
    gl: country,
    hl: "en",
  });
  return response.news_results
    .map((result: any) => {
      return {
        title: result.title,
        date: result.date,
        url: result.link,
      };
    })
    .slice(0, 5);
};
