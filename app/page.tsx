'use client';

import { useState } from 'react';
import { GeocodeForm, IGeocodeForm } from '@/forms/GeocodeForm';
import { ResultCard } from '@/components/ui/ResultCard';
import { geocodingService } from '@/services/geocoding.service';
import { IGeocodingData } from '@/interfaces/geocoding.interface';
import { AlertCircle } from 'lucide-react';

const GithubIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

export default function Home() {
  const [result, setResult] = useState<IGeocodingData | null>(null);
  const [lastType, setLastType] = useState<'forward' | 'reverse'>('forward');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: IGeocodeForm) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await geocodingService.geocode(data);
      if (response.data && response.data.length > 0) {
        setResult(response.data[0]);
        setLastType(data.type);
      } else {
        setError('No results found for that query.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const statusLabel = isLoading
    ? 'resolving…'
    : error
      ? 'error'
      : result
        ? 'ok'
        : 'ready';
  const statusColor = isLoading
    ? 'text-info'
    : error
      ? 'text-danger'
      : result
        ? 'text-accent'
        : 'text-info';

  return (
    <>
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="mono text-sm font-semibold tracking-tight text-fg">
              WhatIsMyGeoAddress
            </span>
            <span className="hidden sm:inline text-xs text-fg-dim">
              — geocoding by APILayer
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-fg-muted">
            <span className="hidden items-center gap-2 sm:flex">
              {/* <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" /> */}
              {/* <span className="mono">positionstack live</span> */}
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mono inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-bg-elev-2 px-2 text-[11px] text-fg-muted transition hover:text-fg"
            >
              <GithubIcon size={12} />
              <span>github</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-6 md:px-6 md:py-8">
        {/* Hero card */}
        <section className="overflow-hidden rounded-xl border border-border bg-bg-elev">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] uppercase tracking-wider text-fg-dim">
                tool
              </span>
              <span className="mono text-xs text-fg-muted">— geocode</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`mono text-[10px] uppercase tracking-wider ${statusColor}`}>
                ●
              </span>
              <span className="mono text-[10px] uppercase tracking-wider text-fg-dim">
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="grid gap-6 p-5 md:grid-cols-[1.2fr_1fr] md:p-7">
            <div className="flex flex-col gap-4">
              <h1 className="mono text-2xl font-semibold tracking-tight text-fg md:text-3xl leading-[1.2]">
                find precise coordinates
                <br />
                <span className="text-fg-muted">for any address on earth.</span>
              </h1>
              <p className="text-sm text-fg-muted max-w-xl leading-relaxed">
                Convert between street addresses and GPS coordinates in a single
                request. Built on{' '}
                <a
                  href="https://positionstack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  PositionStack
                </a>{' '}
                by{' '}
                <a
                  href="https://apilayer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  APILayer
                </a>
                .
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 self-end">
              <div className="flex flex-col gap-1 border-l border-border pl-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-fg-dim">
                  forward
                </span>
                <span className="mono text-xs text-fg-muted">address → lat,lng</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-border pl-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-fg-dim">
                  reverse
                </span>
                <span className="mono text-xs text-fg-muted">lat,lng → address</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-border pl-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-fg-dim">
                  coverage
                </span>
                <span className="mono text-xs text-fg-muted">global</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-border pl-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-fg-dim">
                  source
                </span>
                <span className="mono text-xs text-fg-muted">positionstack</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <GeocodeForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 overflow-hidden rounded-xl border border-danger/40 bg-danger/10 px-5 py-3 animate-in">
            <AlertCircle className="text-danger shrink-0 mt-0.5" size={16} />
            <p className="mono text-sm text-danger">— {error}</p>
          </div>
        )}

        {/* Result */}
        {result && !isLoading && !error && (
          <div className="animate-in">
            <ResultCard data={result} type={lastType} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-fg-dim">
          <span className="mono">WhatIsMyGeoAddress</span>
          <span className="mono">© PositionStack by APILayer</span>
        </footer>
      </main>
    </>
  );
}
