'use client';

import 'leaflet/dist/leaflet.css';
import { FC, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

interface IResultMapProps {
  latitude: number;
  longitude: number;
  label?: string;
}

const accentMarker = L.divIcon({
  className: 'wimga-marker',
  html: `
    <span class="wimga-marker-ring"></span>
    <span class="wimga-marker-dot"></span>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const ResultMap: FC<IResultMapProps> = ({ latitude, longitude, label }) => {
  const position = useMemo<[number, number]>(
    () => [latitude, longitude],
    [latitude, longitude]
  );
  const key = `${latitude},${longitude}`;

  return (
    <MapContainer
      key={key}
      center={position}
      zoom={14}
      scrollWheelZoom={false}
      className="h-[320px] w-full"
      attributionControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains={['a', 'b', 'c', 'd']}
        maxZoom={19}
      />
      <Circle
        center={position}
        radius={120}
        pathOptions={{
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.12,
          weight: 1,
        }}
      />
      <Marker position={position} icon={accentMarker}>
        {label && (
          <Popup>
            <span className="mono text-xs">{label}</span>
          </Popup>
        )}
      </Marker>
    </MapContainer>
  );
};
