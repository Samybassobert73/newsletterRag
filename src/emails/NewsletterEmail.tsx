import {
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

const mainTitle = "FINSQUAWK";
const articles = [
  {
    country: "France",
    interest: "Finance ",
    title: "Article Title",
    content: "Article Content",
    sourceUrl: "https://example.com",
  },
  {
    country: "France",
    interest: "Finance",
    title: "Article Title",
    content: "Article Content",
    sourceUrl: "https://example.com",
  },
  {
    country: "France",
    interest: "Finance",
    title: "Article Title",
    content: "Article Content",
    sourceUrl: "https://example.com",
  },
  {
    country: "France",
    interest: "Finance",
    title: "Article Title",
    content: "Article Content",
    sourceUrl: "https://example.com",
  },
  {
    country: "France",
    interest: "Finance",
    title: "Article Title",
    content: "Article Content",
    sourceUrl: "https://example.com",
  },
];
const advertiser = {
  title: "New PEUGEOT 208",
  name: "Peugeot",
  logo: "https://www.logo-voiture.com/wp-content/uploads/2021/02/peugeot-2021-carre-noir-detoure.png",
  adImageUrl:
    "https://i0.wp.com/www.automotive-marketing.fr/wp-content/uploads/2024/01/pub-nouvelle-Peugeot-208.jpg?fit=1948%2C1080&ssl=1",
  adLinkUrl: "https://peugeot.com",
  content: `PEUGEOT 208 city car: the small electric or thermal city car 
With its dynamic silhouette, the PEUGEOT 208 or e-208 city car reveals all its sportiness whatever its engine: petrol, diesel or electric. `,
};

interface Article {
  country: string;
  interest: string;
  title: string;
  content: string;
  sourceUrl: string;
}

interface NewsletterProps {
  mainTitle: string;
  articles: Article[];
  advertiser?: {
    title: string;
    logo: string;
    name: string;
    adImageUrl: string;
    adLinkUrl: string;
    content: string;
  };
}

const NewsletterEmail = ({
  mainTitle,
  articles,
  advertiser,
}: NewsletterProps) => {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#04243C",
            },
          },
        },
      }}
    >
      <Html>
        <Section className=" p-6 text-gray-400">{currentDate}</Section>

        {/* Main Section */}
        <Section className="bg-brand p-6 text-white">
          <Heading className="text-center text-3xl font-bold">
            FINSQUAWK
          </Heading>
        </Section>

        {advertiser && (
          <Section className="flex justify-center p-4">
            <a
              href={advertiser.adLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                src={advertiser.logo}
                alt="Publicité"
                className="w-full max-w-xs h-20 rounded-md object-contain"
              />
            </a>

            <Text className="mt-4 text-gray-800">
            In partnership with {advertiser.name}
            </Text>
          </Section>
        )}

        {/* Section amicale */}
        <Section className="flex justify-center p-4 ">
          <Text className="mt-4 text-gray-800">
            <strong>Hello.</strong> &nbsp; This is our 1st edition, we hope you enjoy it.
          </Text>
        </Section>

        {/* sommaire*/}
        <Section className="p-6">
        <Hr className="my-6 border-t-2 border-gray-300" />
          <Heading className="text-xl font-semibold text-brand">
          Summary
          </Heading>
         
          <ul>
            {articles.map((article, index) => (
              <li key={index}>{article.title}</li>
            ))}
          </ul>
        </Section>

        

        {/* Articles Section */}
        <Section className="p-6">
          {articles.map((article, index) => (
            <React.Fragment key={index}>
              <Hr className="my-6 border-t-2 border-gray-300" />

              <Text className="mt-4 text-gray-800">
                {article.interest} - {article.country}
              </Text>

              <Heading className="text-xl font-semibold text-brand">
                {article.title}
              </Heading>

              <Text className="mt-4 text-gray-800">{article.content}</Text>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm block text-brand no-underline"
              >
                Source: {article.sourceUrl}
              </a>

              {advertiser &&
                (index + 1) % 3 === 0 &&
                index < articles.length - 1 && (
                  <React.Fragment key={index}>
                    <Hr className="my-6 border-t-2 border-gray-300" />
                    <Section className="flex justify-center p-4">
                      <Text className="mt-4 text-gray-800">
                      Commercial collaboration
                      </Text>
                      <Heading className="text-xl font-semibold text-brand">
                        {advertiser.title}
                      </Heading>
                      <a
                        href={advertiser.adLinkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Img
                          src={advertiser.adImageUrl}
                          alt="Publicité"
                          className="w-full max-w-md rounded-md"
                        />
                      </a>
                      <Text className="mt-4 text-gray-400">
                        {advertiser.name}
                      </Text>
                      <Text className="mt-4 text-gray-800">
                        {advertiser.content}
                      </Text>
                      <a
                        href={advertiser.adLinkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 block text-brand underline"
                      >
                        Click here to learn more
                      </a>
                    </Section>
                  </React.Fragment>
                )}
            </React.Fragment>
          ))}
        </Section>


        {/* Footer */}
        <Section className="p-6 bg-gray-100 text-gray-400">
          <Text className="text-center">
          
Go directly to the sources by clicking on the underlined words.

Copyright © 2024 Finsquawk, All rights reserved.
You are receiving this email because you have subscribed to the Finsquawk newsletter.

leave us.
            <a
              href="https://example.com"
              className="text-brand "
            >
              Unsubscribe
            </a>
          </Text>
          </Section>
      </Html>
    </Tailwind>
  );
};

NewsletterEmail.PreviewProps = {
  mainTitle,
  articles,
  advertiser,
};

export default NewsletterEmail;
