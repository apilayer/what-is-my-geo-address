import { FC } from 'react';

const faqs = [
  {
    question: "What Is My Geo Address?",
    answer: "What Is My Geo Address is a free geocoding tool that converts street addresses into geographic coordinates and coordinates back into readable addresses. It supports both forward and reverse geocoding and is powered by Positionstack."
  },
  {
    question: "What is the data source for What Is My Geo Address?",
    answer: "What Is My Geo Address is powered by Positionstack API, a global geocoding API from APILayer. Positionstack provides the geocoding data used to convert addresses into latitude and longitude coordinates and to reverse geocode coordinates into location information."
  },
  {
    question: "How do I find the latitude and longitude of an address?",
    answer: "Enter an address into the What Is My Geo Address tool and select the forward geocoding option. The tool converts the address into geographic coordinates, including its latitude and longitude. Developers can perform the same type of lookup programmatically using the Positionstack API."
  },
  {
    question: "What is reverse geocoding?",
    answer: "Reverse geocoding is the process of converting geographic coordinates, such as latitude and longitude, into a readable address or location. Positionstack supports reverse geocoding, allowing developers to send coordinates to the API and retrieve associated address and location information."
  },
  {
    question: "What is Positionstack API?",
    answer: "Positionstack is a real-time geocoding API that lets developers convert addresses into coordinates and coordinates into addresses. It supports forward and reverse geocoding, batch requests, embeddable maps, and global coverage of more than 2 billion addresses and places."
  },
  {
    question: "How can I use Positionstack API for address geocoding?",
    answer: "Developers can send an address or place name to Positionstack's forward geocoding endpoint to retrieve its geographic coordinates and location details. For reverse geocoding, developers can provide latitude and longitude coordinates to retrieve the corresponding address. Positionstack returns structured location data that can be integrated into websites, mobile apps, maps, and other applications."
  },
  {
    question: "What can I build with a geocoding API like Positionstack?",
    answer: "Positionstack can be used to build address search and validation tools, location-based applications, mapping interfaces, delivery and logistics platforms, store locators, property applications, and data visualization tools. Its forward and reverse geocoding capabilities make it useful whenever an application needs to convert between human-readable addresses and geographic coordinates."
  }
];

export const FAQSection: FC = () => {
  return (
    <section className="mt-8 overflow-hidden rounded-xl border border-border bg-bg-elev">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="mono text-[10px] uppercase tracking-wider text-fg-dim">
            info
          </span>
          <span className="mono text-xs text-fg-muted">— faq</span>
        </div>
      </div>
      
      <div className="flex flex-col p-5 md:p-7 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="mono text-2xl font-semibold tracking-tight text-fg md:text-3xl leading-[1.2]">
            frequently asked
            <br />
            <span className="text-fg-muted">questions.</span>
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="mono text-sm font-semibold text-fg">
                {faq.question}
              </h3>
              <p className="text-sm text-fg-muted leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
