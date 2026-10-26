import { FAQ_DATA } from "@/lib/faq";
import { SITE, SITE_URL } from "@/lib/site";

/** One JSON-LD `@graph`, so a parser sees one connected description. */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE.name,
        url: SITE_URL,
        description: SITE.description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${SITE.origin}/#org` },
        featureList: [
          "Convert a street address to latitude and longitude",
          "Convert latitude and longitude back to an address",
          "Forward and reverse geocoding",
          "Map preview of the resolved location",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.origin}/#org` },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": `${SITE.origin}/#org`,
        name: "APILayer",
        url: "https://apilayer.com/",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_DATA.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#howto`,
        name: "How to find the latitude and longitude of an address",
        description:
          "Convert a street address into geographic coordinates, or coordinates back into an address.",
        totalTime: "PT10S",
        step: [
          {
            "@type": "HowToStep",
            name: "Enter the address",
            text: "Type a street address, place name or postcode into the search box.",
          },
          {
            "@type": "HowToStep",
            name: "Read the coordinates",
            text: "The latitude and longitude are returned along with the matched address and a map of the location.",
          },
          {
            "@type": "HowToStep",
            name: "Or go the other way",
            text: "Switch to reverse geocoding and enter latitude and longitude to get the readable address back.",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
