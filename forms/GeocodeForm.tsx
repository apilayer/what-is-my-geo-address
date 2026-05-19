'use client';

import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const geocodeSchema = z.object({
  query: z.string().min(2, 'Please enter a valid search query'),
  type: z.enum(['forward', 'reverse']),
});

export type IGeocodeForm = z.infer<typeof geocodeSchema>;

interface IGeocodeFormProps {
  onSubmit: (data: IGeocodeForm) => Promise<void>;
  isLoading: boolean;
}

export const GeocodeForm: FC<IGeocodeFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<IGeocodeForm>({
    resolver: zodResolver(geocodeSchema),
    defaultValues: {
      query: '',
      type: 'forward',
    },
  });

  const currentType = useWatch({
    control,
    name: 'type',
  });

  const placeholder =
    currentType === 'forward'
      ? '1600 Pennsylvania Ave NW, Washington DC'
      : '40.7638435, -73.9729691';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-xl border border-border bg-bg-elev"
    >
      {/* Header strip */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="mono text-[10px] uppercase tracking-wider text-fg-dim">
            input
          </span>
          <span className="mono text-xs text-fg-muted">
            — {currentType === 'forward' ? 'address → coordinates' : 'coordinates → address'}
          </span>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setValue('type', 'forward');
              setValue('query', '');
            }}
            className={cn(
              'mono inline-flex h-7 items-center rounded-md border px-2 text-[11px] transition',
              currentType === 'forward'
                ? 'border-accent/40 bg-accent/15 text-accent'
                : 'border-border bg-bg-elev-2 text-fg-muted hover:text-fg'
            )}
          >
            forward
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('type', 'reverse');
              setValue('query', '');
            }}
            className={cn(
              'mono inline-flex h-7 items-center rounded-md border px-2 text-[11px] transition',
              currentType === 'reverse'
                ? 'border-accent/40 bg-accent/15 text-accent'
                : 'border-border bg-bg-elev-2 text-fg-muted hover:text-fg'
            )}
          >
            reverse
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1 group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-dim group-focus-within:text-accent transition-colors">
              {currentType === 'forward' ? <Search size={14} /> : <MapPin size={14} />}
            </div>
            <input
              {...register('query')}
              type="text"
              placeholder={placeholder}
              disabled={isLoading}
              className="mono block h-10 w-full rounded-md border border-border bg-bg-elev-2 pl-9 pr-3 text-sm text-fg placeholder:text-fg-dim focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mono inline-flex h-10 min-w-[130px] items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/15 px-4 text-sm font-medium text-accent transition hover:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" className="text-accent" />
            ) : (
              <>
                <span>convert</span>
                <span aria-hidden>→</span>
              </>
            )}
          </button>
        </div>

        {errors.query && (
          <p className="mono text-xs text-danger">— {errors.query.message}</p>
        )}
      </div>
    </form>
  );
};
