'use client';

import { FC, useState } from 'react';
import { IGeocodingData } from '@/interfaces/geocoding.interface';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IResultCardProps {
  data: IGeocodingData;
  type: 'forward' | 'reverse';
  className?: string;
}

export const ResultCard: FC<IResultCardProps> = ({ data, type, className }) => {
  const [copied, setCopied] = useState(false);

  const coordsString = `${data.latitude}, ${data.longitude}`;
  const addressString =
    data.label ||
    [data.name, data.street, data.locality, data.region, data.country].filter(Boolean).join(', ');

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyTarget = type === 'forward' ? coordsString : addressString;
  const primaryLabel = type === 'forward' ? 'coordinates' : 'address';
  const displayValue = type === 'forward' ? coordsString : addressString;
  const contextValue = type === 'forward' ? addressString : coordsString;
  const contextLabel = type === 'forward' ? 'address' : 'coordinates';

  // Rebuild PositionStack's map_url with a tight bbox so the map zooms in
  // close (~street/building level) regardless of result granularity.
  // bbox order is: lngEast, latNorth, lngWest, latSouth.
  const zoomedMapUrl = (() => {
    if (typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
      return data.map_url;
    }
    const delta = 0.0006; // ~70m half-width — close-up building view
    const { latitude: lat, longitude: lng } = data;
    return (
      `https://positionstack.com/download/map.html` +
      `?bbox=${lng + delta},${lat + delta},${lng - delta},${lat - delta}` +
      `&marker=${lat},${lng}`
    );
  })();

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-bg-elev',
        className
      )}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="mono text-[10px] uppercase tracking-wider text-fg-dim">
            result
          </span>
          <span className="mono text-xs text-fg-muted">— {primaryLabel}</span>
        </div>
        <button
          onClick={() => handleCopy(copyTarget)}
          className="mono inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-bg-elev-2 px-2 text-[11px] text-fg-muted transition hover:text-fg"
        >
          {copied ? (
            <>
              <Check size={12} className="text-info" />
              <span className="text-info">copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6 p-5 md:p-7">
        <div className="flex flex-col gap-2">
          <span className="mono text-[10px] uppercase tracking-wider text-fg-dim">
            {primaryLabel}
          </span>
          <p className="mono text-3xl font-semibold tracking-tight text-fg md:text-4xl break-all leading-tight">
            {displayValue}
          </p>
          <div className="flex items-baseline gap-2 text-fg-muted">
            <span className="mono text-[10px] uppercase tracking-wider text-fg-dim shrink-0">
              {contextLabel}
            </span>
            <span className="text-sm break-words">{contextValue}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
          <div className="flex flex-col gap-1 border-l border-border pl-3 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-wider text-fg-dim">
              country
            </span>
            {data.country ? (
              <div className="flex items-center gap-1.5 min-w-0">
                {data.country_code && (
                  <span
                    role="img"
                    aria-label={`${data.country} flag`}
                    title={`${data.country} (${data.country_code})`}
                    className="block h-[14px] w-[21px] shrink-0 rounded-[2px] border border-border bg-bg-elev-2 bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(https://flagcdn.com/${data.country_code.toLowerCase()}.svg)`,
                      backgroundSize: 'cover',
                    }}
                  />
                )}
                <span className="mono truncate text-sm text-fg">
                  {data.country}
                </span>
              </div>
            ) : (
              <span className="text-fg-dim">—</span>
            )}
          </div>
          <div className="flex flex-col gap-1 border-l border-border pl-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-fg-dim">
              region
            </span>
            <span className="mono truncate text-sm text-fg">
              {data.region || <span className="text-fg-dim">—</span>}
            </span>
          </div>
          <div className="flex flex-col gap-1 border-l border-border pl-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-fg-dim">
              city
            </span>
            <span className="mono truncate text-sm text-fg">
              {data.locality || <span className="text-fg-dim">—</span>}
            </span>
          </div>
          <div className="flex flex-col gap-1 border-l border-border pl-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-fg-dim">
              confidence
            </span>
            <span className="mono truncate text-sm text-fg">
              {data.confidence !== undefined ? (
                `${(data.confidence * 100).toFixed(0)}%`
              ) : (
                <span className="text-fg-dim">—</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Map section — served directly by PositionStack via map_url */}
      {zoomedMapUrl && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] uppercase tracking-wider text-fg-dim">
                map
              </span>
              <span className="mono text-xs text-fg-muted">
                — {data.latitude.toFixed(6)}, {data.longitude.toFixed(6)}
              </span>
            </div>
            <a
              href={zoomedMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-[11px] text-fg-muted transition hover:text-fg"
            >
              open map →
            </a>
          </div>
          <iframe
            src={zoomedMapUrl}
            title={`Map of ${addressString}`}
            className="block h-[360px] w-full border-0"
            style={{ background: '#fff', filter: 'invert(1) hue-rotate(180deg)' }}
            scrolling="no"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
};
