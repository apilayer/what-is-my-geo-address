# WhatIsMyGeoAddress

A geocoding tool for developers. Convert between street addresses and GPS coordinates in a single request, with a map preview, country flag, and copyable result.

Built on the [PositionStack](https://positionstack.com) API by [APILayer](https://apilayer.com).

## Features

- **Forward geocoding** — address → latitude/longitude
- **Reverse geocoding** — latitude/longitude → address
- **Map preview** — Leaflet + OpenStreetMap (Carto Dark Matter tiles), with a deep-link to OSM
- **Country flag** — SVG flag rendered from the ISO country code
- **Copy-to-clipboard** for the primary result
- Dark, monospace, developer-tool aesthetic

## Stack

- Next.js 16 (App Router, Turbopack) on React 19
- TypeScript, Tailwind CSS v4
- `react-hook-form` + `zod` for form validation
- `react-leaflet` + `leaflet` for the map
- Carto Dark Matter tiles for the map basemap
- [flagcdn.com](https://flagcdn.com) for country flag SVGs

## Getting Started

### 1. Get a PositionStack API key

Sign up at [positionstack.com](https://positionstack.com) and grab your free API key.

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Then edit `.env.local` and replace the placeholder with your key:

```
POSITIONSTACK_API_KEY=your_api_key_here
```

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  api/geocode/route.ts   # Server-side proxy to PositionStack (keeps the API key off the client)
  page.tsx               # Home page — hero, form, result
  layout.tsx             # Root layout, font loading, metadata
  globals.css            # Tailwind v4 theme tokens + Leaflet dark overrides
components/ui/
  ResultCard.tsx         # Result card with metadata grid, flag, and map
  ResultMap.tsx          # Client-only Leaflet map (loaded via next/dynamic)
  LoadingSpinner.tsx
forms/
  GeocodeForm.tsx        # Mode toggle + input + submit
services/
  geocoding.service.ts   # Client-side fetch wrapper for /api/geocode
interfaces/
  geocoding.interface.ts # API response types
lib/
  utils.ts               # cn() helper (clsx + tailwind-merge)
```

## How the API key is protected

The `POSITIONSTACK_API_KEY` is read **only** on the server in [`app/api/geocode/route.ts`](app/api/geocode/route.ts). The client calls our own `/api/geocode` route, which proxies the request to PositionStack with the key attached server-side. The key never reaches the browser bundle.

## Build

```bash
npm run build
npm start
```

## Deploy

This app deploys cleanly to [Vercel](https://vercel.com/new) — just import the repo and set the `POSITIONSTACK_API_KEY` environment variable in the project settings.

## Credits

- Geocoding by [PositionStack](https://positionstack.com) / [APILayer](https://apilayer.com)
- Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors, © [CARTO](https://carto.com/attributions)
- Country flags by [flagcdn.com](https://flagcdn.com)
