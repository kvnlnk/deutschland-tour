import { useEffect, useRef } from "react";
import L from "leaflet";

interface POI {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  order: number;
}

interface RouteMapProps {
  pois: POI[];
  userLat?: number | null;
  userLng?: number | null;
  activePoiId?: string | null;
  visitedPoiIds?: Set<string>;
  language: "de" | "en";
  onPoiClick?: (poiId: string) => void;
}

export default function RouteMap({
  pois,
  userLat,
  userLng,
  activePoiId,
  visitedPoiIds = new Set(),
  onPoiClick,
}: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const hasFitBounds = useRef(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [52.5163, 13.392],
      zoom: 14,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Add POI markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    const sorted = [...pois].sort((a, b) => a.order - b.order);
    const latlngs: [number, number][] = [];

    sorted.forEach((poi) => {
      latlngs.push([poi.lat, poi.lng]);

      const isVisited = visitedPoiIds.has(poi.id);
      const isActive = poi.id === activePoiId;

      const color = isActive ? "#d4a853" : isVisited ? "#4a9e6b" : "#0f2b3d";
      const size = isActive ? 14 : 10;

      const icon = L.divIcon({
        className: "poi-marker",
        html: `<div style="
          width:${size * 2}px;height:${size * 2}px;
          background:${color};
          border:3px solid white;
          border-radius:50%;
          box-shadow:0 2px 8px rgba(0,0,0,0.3), ${isActive ? `0 0 20px ${color}` : "none"};
          display:flex;align-items:center;justify-content:center;
          color:white;font-size:10px;font-weight:700;
          transition:all 0.3s ease;
          cursor:pointer;
        ">${poi.order}</div>`,
        iconSize: [size * 2, size * 2],
        iconAnchor: [size, size],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon }).addTo(map);
      marker.bindTooltip(poi.name, {
        direction: "top",
        offset: [0, -10],
        className: "poi-tooltip",
      });

      if (onPoiClick) {
        marker.on("click", () => onPoiClick(poi.id));
      }

      markersRef.current.set(poi.id, marker);
    });

    // Route polyline
    if (polylineRef.current) polylineRef.current.remove();
    polylineRef.current = L.polyline(latlngs, {
      color: "#d4a853",
      weight: 3,
      opacity: 0.6,
      dashArray: "10, 6",
    }).addTo(map);

    // Fit bounds to show all POIs — only on first load
    if (latlngs.length > 0 && !hasFitBounds.current) {
      map.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] });
      hasFitBounds.current = true;
    }
  }, [pois, visitedPoiIds, activePoiId, onPoiClick]);

  // User location marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userLat != null && userLng != null) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLat, userLng]);
      } else {
        const icon = L.divIcon({
          className: "user-marker",
          html: `<div style="
            width:16px;height:16px;
            background:#4a90d9;
            border:3px solid white;
            border-radius:50%;
            box-shadow:0 0 0 4px rgba(74,144,217,0.3), 0 2px 8px rgba(0,0,0,0.4);
          "></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });
        userMarkerRef.current = L.marker([userLat, userLng], { icon }).addTo(map);
      }
    }
  }, [userLat, userLng]);

  return (
    <div className="route-map-container">
      <div ref={mapRef} className="route-map" />
    </div>
  );
}
