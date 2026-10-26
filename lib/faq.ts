export interface IFaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Shared by the FAQ section and the structured data, so what a reader sees and
 * what an answer engine quotes cannot drift apart. Extracted out of the
 * component because a server component cannot import a value from a
 * "use client" module: it gets a client reference, not the array.
 */
export const FAQ_DATA: IFaqItem[] = [
  {
    id: "faq-1",
    question: "What Is My Geo Address?",
    answer:
      "What Is My Geo Address is a free geocoding tool that converts street addresses into geographic coordinates and coordinates back into readable addresses. It supports both forward and reverse geocoding and is powered by Positionstack.",
  },
  {
    id: "faq-2",
    question: "What is the data source for What Is My Geo Address?",
    answer:
      "What Is My Geo Address is powered by Positionstack API, a global geocoding API from APILayer. Positionstack provides the geocoding data used to convert addresses into latitude and longitude coordinates and to reverse geocode coordinates into location information.",
  },
  {
    id: "faq-3",
    question: "How do I find the latitude and longitude of an address?",
    answer:
      "Enter an address into the What Is My Geo Address tool and select the forward geocoding option. The tool converts the address into geographic coordinates, including its latitude and longitude. Developers can perform the same type of lookup programmatically using the Positionstack API.",
  },
  {
    id: "faq-4",
    question: "What is reverse geocoding?",
    answer:
      "Reverse geocoding is the process of converting geographic coordinates, such as latitude and longitude, into a readable address or location. Positionstack supports reverse geocoding, allowing developers to send coordinates to the API and retrieve associated address and location information.",
  },
  {
    id: "faq-5",
    question: "What is Positionstack API?",
    answer:
      "Positionstack is a real-time geocoding API that lets developers convert addresses into coordinates and coordinates into addresses. It supports forward and reverse geocoding, batch requests, embeddable maps, and global coverage of more than 2 billion addresses and places.",
  },
  {
    id: "faq-6",
    question: "How can I use Positionstack API for address geocoding?",
    answer:
      "Developers can send an address or place name to Positionstack's forward geocoding endpoint to retrieve its geographic coordinates and location details. For reverse geocoding, developers can provide latitude and longitude coordinates to retrieve the corresponding address. Positionstack returns structured location data that can be integrated into websites, mobile apps, maps, and other applications.",
  },
  {
    id: "faq-7",
    question: "What can I build with a geocoding API like Positionstack?",
    answer:
      "Positionstack can be used to build address search and validation tools, location-based applications, mapping interfaces, delivery and logistics platforms, store locators, property applications, and data visualization tools. Its forward and reverse geocoding capabilities make it useful whenever an application needs to convert between human-readable addresses and geographic coordinates.",
  },
];
