import { useState, useEffect, useRef } from "react";
import { calculateDistance } from "./useGeolocation";

interface POI {
  id: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
  audioDe: string;
  audioEn: string;
}

export function useProximityTracker(
  pois: POI[],
  userLat: number | null,
  userLng: number | null,
  proximityThreshold: number = 50 // meters
) {
  const [currentPoi, setCurrentPoi] = useState<POI | null>(null);
  const [visitedPoiIds, setVisitedPoiIds] = useState<Set<string>>(new Set());
  const [distances, setDistances] = useState<Record<string, number>>({});
  const lastNotifiedRef = useRef<string | null>(null);

  useEffect(() => {
    if (userLat === null || userLng === null) return;

    const newDistances: Record<string, number> = {};
    let nearest: POI | null = null;
    let nearestDist = Infinity;

    for (const poi of pois) {
      const dist = calculateDistance(userLat, userLng, poi.lat, poi.lng);
      newDistances[poi.id] = Math.round(dist);

      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = poi;
      }

      // Check if within proximity
      if (dist <= proximityThreshold && !visitedPoiIds.has(poi.id)) {
        if (lastNotifiedRef.current !== poi.id) {
          lastNotifiedRef.current = poi.id;
          setCurrentPoi(poi);
          setVisitedPoiIds((prev) => {
            const next = new Set(prev);
            next.add(poi.id);
            return next;
          });
        }
      }
    }

    setDistances(newDistances);
  }, [userLat, userLng, pois, proximityThreshold, visitedPoiIds]);

  const reset = () => {
    setCurrentPoi(null);
    setVisitedPoiIds(new Set());
    setDistances({});
    lastNotifiedRef.current = null;
  };

  return { currentPoi, visitedPoiIds, distances, reset };
}
