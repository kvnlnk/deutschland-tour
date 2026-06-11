import { Route } from "../types";
import { berlinClassicRoute } from "./berlin";
import { muenchenAltstadt } from "./muenchen";
import { hamburgHafen } from "./hamburg";
import { koelnClassicRoute } from "./koeln";
import { dresdenClassicRoute } from "./dresden";
import { heidelbergPreviewRoute } from "./heidelberg";

// Static fallback data
export const FALLBACK_ROUTES: Route[] = [
  berlinClassicRoute,
  muenchenAltstadt,
  hamburgHafen,
  koelnClassicRoute,
  dresdenClassicRoute,
  heidelbergPreviewRoute,
];

// Merged routes (API + fallback)
let mergedRoutes: Route[] | null = null;

/**
 * Merge API routes with static fallback.
 * API is authoritative for route metadata.
 * Static fallback fills in POI audio/image URLs where API has null.
 */
export function mergeRoutes(apiRoutes: Route[]): Route[] {
  if (!apiRoutes.length) {
    mergedRoutes = FALLBACK_ROUTES;
    return mergedRoutes;
  }

  const fallbackMap = new Map(FALLBACK_ROUTES.map((r) => [r.id, r]));

  mergedRoutes = apiRoutes.map((apiRoute) => {
    const fallback = fallbackMap.get(apiRoute.id);
    if (!fallback) return apiRoute; // New city from API

    // Merge POIs: API first, fallback fills null fields
    const apiPois = apiRoute.pois.length > 0 ? apiRoute.pois : fallback.pois;
    const mergedPois = apiPois.map((poi) => {
      const fallbackPoi = fallback.pois.find((fp) => fp.id === poi.id);
      if (!fallbackPoi) return poi;
      return {
        ...fallbackPoi, // Fallback fills nulls
        ...poi, // API overrides
        // Keep API audio/image if present, otherwise fallback
        audioDe: poi.audioDe || fallbackPoi.audioDe,
        audioEn: poi.audioEn || fallbackPoi.audioEn,
        imageUrl: poi.imageUrl || fallbackPoi.imageUrl,
      };
    });

    return {
      ...apiRoute,
      pois: mergedPois,
    };
  });

  // Add any fallback routes not in API
  for (const fb of FALLBACK_ROUTES) {
    if (!mergedRoutes.find((r) => r.id === fb.id)) {
      mergedRoutes.push(fb);
    }
  }

  mergedRoutes = mergedRoutes.filter(Boolean);
  return mergedRoutes;
}

export function getRoutes(): Route[] {
  return mergedRoutes || FALLBACK_ROUTES;
}

export function getRouteById(id: string): Route | undefined {
  return getRoutes().find((r) => r.id === id);
}

export function getRoutesByCity(city: string): Route[] {
  return getRoutes().filter((r) => r.city === city);
}

export const CITIES = (() => {
  const routes = getRoutes();
  return Array.from(new Set(routes.map((r) => r.city)));
})();

export const PRICING = {
  singleTour: 499,
  cityBundle: 1499,
  allAccess: 2999,
};

// Stats derived from current routes
export function getStats() {
  const routes = getRoutes();
  return {
    pois: routes.reduce((sum, r) => sum + r.pois.length, 0),
    distance: routes.reduce((sum, r) => sum + r.distanceKm, 0).toFixed(1),
    cities: new Set(routes.map((r) => r.city)).size,
    languages: 2,
  };
}
