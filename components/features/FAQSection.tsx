import { FC } from 'react';
import { FAQ_DATA } from '@/lib/faq';


export const FAQSection: FC = () => {
  return (
    <section aria-labelledby="faq-heading" className="mt-8 overflow-hidden rounded-xl border border-border bg-bg-elev">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="label text-[10px] uppercase tracking-wider text-fg-dim">
            info
          </span>
          <span className="label text-xs text-fg-muted">— faq</span>
        </div>
      </div>
      
      <div className="flex flex-col p-5 md:p-7 gap-8">
        <div className="flex flex-col gap-4">
          <h2
            id="faq-heading"
            className="text-[1.75rem] font-semibold leading-[1.2] text-fg md:text-[2.25rem] md:leading-[2.75rem]"
          >
            Frequently asked questions
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {FAQ_DATA.map((faq, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-fg md:text-[1.1875rem]">
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
