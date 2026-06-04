'use client';

import { useEffect, useState } from 'react';
import { GeocodeForm, IGeocodeForm } from '@/forms/GeocodeForm';
import { ResultCard } from '@/components/ui/ResultCard';
import { geocodingService } from '@/services/geocoding.service';
import { IGeocodingData } from '@/interfaces/geocoding.interface';
import { AlertCircle } from 'lucide-react';

const WimgaLogo = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    className="shrink-0"
  >
    {/* Sonar rings — outer faint, inner solid */}
    <circle cx="12" cy="12" r="10.5" strokeOpacity={0.18} strokeWidth={1} />
    <circle cx="12" cy="12" r="7" strokeOpacity={0.4} strokeWidth={1} />
    <circle cx="12" cy="12" r="3.75" strokeOpacity={0.9} strokeWidth={1} />
    {/* Question mark at the sonar source */}
    <text
      x="12"
      y="14.6"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
      fontSize="6.5"
      fontWeight={700}
      fontFamily="var(--font-geist-mono), ui-monospace, monospace"
    >
      ?
    </text>
  </svg>
);

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

function HeroBanner() {
  return (
    <a
      href="https://positionstack.com/signup/free"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-48 w-full select-none overflow-hidden border-b border-[#0052CC]/30 bg-[#070b18] transition hover:border-[#0052CC]/60"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25 transition-opacity group-hover:opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1c44]/85 via-[#070b18]/80 to-[#0052CC]/25" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/positionstack-white.png"
            alt="PositionStack"
            className="h-4 w-auto"
          />
          <span className="h-4 w-px bg-white/25" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/apilayer-footer.svg"
            alt="APILayer"
            className="h-4 w-auto"
          />
        </div>

        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#6AA0FF]">
            Free geocoding API
          </p>
          <h3 className="text-xl font-extrabold leading-tight tracking-tight text-white md:text-2xl">
            Geocode any address,
            <br />
            anywhere on Earth.
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0052CC] px-3.5 py-2 text-xs font-bold text-white shadow-lg transition group-hover:bg-[#0066FF]">
            Get Your API Key
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
          <span className="font-sans text-[10px] text-white/55">
            PositionStack, powered by APILayer
          </span>
        </div>
      </div>
    </a>
  );
}

function AttributionBanner() {
  return (
    <a
      href="https://positionstack.com/signup/free"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 group block w-[420px] max-w-[calc(100vw-2rem)] h-[42px] rounded-lg overflow-hidden shadow-2xl border border-[#0052CC]/30 hover:border-[#0052CC]/70 transition select-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25 transition-opacity group-hover:opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c44]/90 via-[#070b18]/85 to-[#0052CC]/30" />

      <div className="relative z-10 flex h-full items-center justify-between gap-2 px-3">
        <div className="flex shrink-0 items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/positionstack-white.png"
            alt="PositionStack"
            className="h-3.5 w-auto"
          />
          <span className="h-3 w-px bg-white/25" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/apilayer-footer.svg"
            alt="APILayer"
            className="h-3 w-auto"
          />
        </div>
        <span className="hidden truncate font-sans text-[10px] text-white/65 sm:inline">
          Free geocoding API
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#0052CC] px-2.5 py-1 text-[10px] font-bold text-white shadow transition group-hover:bg-[#0066FF]">
          Get API Key
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const [result, setResult] = useState<IGeocodingData | null>(null);
  const [lastType, setLastType] = useState<'forward' | 'reverse'>('forward');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoQuery, setAutoQuery] = useState<string>('');

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

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        if (cancelled) return;
        try {
          const reverse = await geocodingService.geocode({
            query: `${pos.coords.latitude},${pos.coords.longitude}`,
            type: 'reverse',
          });
          const addr = reverse.data?.[0]?.label;
          if (cancelled || !addr) return;

          setAutoQuery(addr);
          await handleSubmit({ query: addr, type: 'forward' });
        } catch {
          /* silent — leave the page in its initial empty state */
        }
      },
      () => {
        /* permission denied or error — silent */
      },
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 0 }
    );

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div className="flex items-center gap-2 text-fg">
              <WimgaLogo size={20} />
              <span className="mono text-sm font-semibold tracking-tight">
                WhatIsMyGeoAddress
              </span>
            </div>
            <span className="hidden h-4 w-px bg-border sm:inline-block" />
            <span className="hidden items-center gap-1.5 text-xs text-fg-dim sm:inline-flex">
              <span>by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/apilayer-footer.svg"
                alt="APILayer"
                className="h-3 w-auto opacity-80"
              />
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

      <HeroBanner />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 pb-24 pt-6 md:px-6 md:pb-28 md:pt-8">
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
                request.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="mono text-[10px] uppercase tracking-wider text-fg-dim">
                  powered by
                </span>
                <a
                  href="https://positionstack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center opacity-80 transition hover:opacity-100"
                  aria-label="PositionStack"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/positionstack-white.png"
                    alt="PositionStack"
                    className="h-4 w-auto"
                  />
                </a>
                <span className="h-3 w-px bg-border" />
                <a
                  href="https://apilayer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center opacity-80 transition hover:opacity-100"
                  aria-label="APILayer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/apilayer-footer.svg"
                    alt="APILayer"
                    className="h-3.5 w-auto"
                  />
                </a>
              </div>
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
        <GeocodeForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          initialQuery={autoQuery}
        />

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

      <AttributionBanner />
    </>
  );
}
