"use client";

import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
  radius: number;
  onChange: (lat: number, lng: number) => void;
}

export default function MapPicker({ lat, lng, radius, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markerRef = useRef<import("leaflet").Marker | null>(null);
  const circleRef = useRef<import("leaflet").Circle | null>(null);

  /* Initialize map once */
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      const container = containerRef.current as HTMLElement & { _leaflet_id?: number };
      if (container._leaflet_id) return;

      type IconWithPrivate = typeof L.Icon.Default.prototype & { _getIconUrl?: unknown };
      delete (L.Icon.Default.prototype as IconWithPrivate)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const hasCoords = Boolean(lat && lng);
      const map = L.map(container).setView(
        [lat || 48.7758, lng || 9.1829],
        hasCoords ? 14 : 4,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      if (hasCoords) {
        markerRef.current = L.marker([lat, lng]).addTo(map);
        circleRef.current = L.circle([lat, lng], {
          radius: radius || 100,
          color: "var(--sage, #3d736b)",
          fillColor: "var(--sage, #3d736b)",
          fillOpacity: 0.12,
          weight: 1.5,
        }).addTo(map);
      }

      map.on("click", (e) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;

        if (markerRef.current) {
          markerRef.current.setLatLng([clickLat, clickLng]);
        } else {
          markerRef.current = L.marker([clickLat, clickLng]).addTo(map);
        }

        const r = radius || 100;
        if (circleRef.current) {
          circleRef.current.setLatLng([clickLat, clickLng]);
          circleRef.current.setRadius(r);
        } else {
          circleRef.current = L.circle([clickLat, clickLng], {
            radius: r,
            color: "var(--sage, #3d736b)",
            fillColor: "var(--sage, #3d736b)",
            fillOpacity: 0.12,
            weight: 1.5,
          }).addTo(map);
        }

        onChange(clickLat, clickLng);
      });

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
      circleRef.current = null;
      if (document.head.contains(link)) document.head.removeChild(link);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Update circle radius live as the prop changes */
  useEffect(() => {
    if (!circleRef.current) return;
    circleRef.current.setRadius(radius || 100);
  }, [radius]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "420px",
        borderRadius: "0.8rem",
        overflow: "hidden",
        border: "1px solid var(--ink-20)",
      }}
    />
  );
}
