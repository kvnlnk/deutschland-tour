import type { Route, POI, Review } from "./types";

const API_BASE = "/api";

// Cache for routes
let cachedRoutes: Route[] | null = null;
let cachedRouteDetails: Record<string, Route> = {};

/** Map snake_case DB field names to camelCase frontend types */
function mapRoute(raw: any): Route {
  const tags: string[] = Array.isArray(raw.tags)
    ? raw.tags
    : typeof raw.tags === "string"
      ? raw.tags.replace(/[{}"]/g, "").split(",").filter(Boolean)
      : [];

  return {
    id: raw.id || "",
    city: raw.city || "",
    name: raw.name || "",
    nameEn: raw.name_en || raw.nameEn || "",
    description: raw.description || "",
    descriptionEn: raw.description_en || raw.descriptionEn || "",
    imageUrl: raw.image_url || raw.imageUrl || "",
    durationMinutes: raw.duration_min ?? raw.durationMinutes ?? 0,
    distanceKm: raw.distance_km ?? raw.distanceKm ?? 0,
    priceCents: raw.price_cents ?? raw.priceCents ?? 0,
    tags,
    pois: Array.isArray(raw.pois) ? raw.pois.map(mapPoi) : [],
  };
}

function mapPoi(raw: any): POI {
  return {
    id: raw.id || "",
    name: raw.name || "",
    nameEn: raw.name_en || raw.nameEn || "",
    description: raw.description || "",
    descriptionEn: raw.description_en || raw.descriptionEn || "",
    lat: raw.lat ?? 0,
    lng: raw.lng ?? 0,
    order: raw.order ?? raw.display_order ?? 0,
    imageUrl: raw.image_url || raw.imageUrl || "",
    duration: raw.duration ?? 0,
    audioDe: raw.audio_url_de || raw.audioDe || "",
    audioEn: raw.audio_url_en || raw.audioEn || "",
  };
}

/** Map a review from DB format */
function mapReview(raw: any): Review {
  return {
    id: String(raw.id || ""),
    routeId: raw.route_id || "",
    rating: raw.rating ?? 0,
    comment: raw.comment || "",
    author: raw.author || "Anonym",
    date: raw.created_at
      ? new Date(raw.created_at).toLocaleDateString("de-DE")
      : "",
  };
}

/** Fetch all routes (without POIs) */
export async function fetchRoutes(): Promise<Route[]> {
  if (cachedRoutes) return cachedRoutes;

  try {
    const res = await fetch(`${API_BASE}/routes`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const routes = (data.routes || []).map(mapRoute);
    cachedRoutes = routes;
    return routes;
  } catch (err) {
    console.warn("API fetchRoutes failed:", err);
    return [];
  }
}

/** Fetch a single route with full POI data */
export async function fetchRouteDetails(id: string): Promise<Route | null> {
  if (cachedRouteDetails[id]) return cachedRouteDetails[id];

  try {
    const res = await fetch(`${API_BASE}/routes/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.route) return null;
    const route = mapRoute(data.route);
    cachedRouteDetails[id] = route;
    return route;
  } catch (err) {
    console.warn(`API fetchRouteDetails(${id}) failed:`, err);
    return null;
  }
}

/** Post a review */
export async function postReview(
  routeId: string,
  author: string,
  rating: number,
  comment: string
): Promise<{ success: boolean; id?: number }> {
  try {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ routeId, author, rating, comment }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { success: true, id: data.id };
  } catch (err) {
    console.warn("API postReview failed:", err);
    return { success: false };
  }
}

/** Fetch reviews for a route */
export async function fetchReviews(
  routeId: string
): Promise<{ reviews: Review[]; stats: { avg: number; count: number } }> {
  try {
    const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(routeId)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      reviews: (data.reviews || []).map(mapReview),
      stats: data.stats || { avg: 0, count: 0 },
    };
  } catch (err) {
    console.warn("API fetchReviews failed:", err);
    return { reviews: [], stats: { avg: 0, count: 0 } };
  }
}

/** Create checkout session */
export async function createCheckoutSession(
  routeId?: string,
  bundle?: string
): Promise<{ url?: string; demo?: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        bundle ? { bundle } : { routeId }
      ),
    });
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}

/** Log a purchase */
export async function logPurchase(
  routeId: string,
  type: string,
  amountCents: number
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/purchases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ routeId, type, amountCents }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Clear cache (useful for refresh) */
export function clearCache() {
  cachedRoutes = null;
  cachedRouteDetails = {};
}

/** Get audio URL (handles both relative and absolute) */
export function getAudioUrl(path: string | null | undefined): string {
  if (!path) return "";
  // Already absolute
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  // Relative path on same server (proxied to MinIO)
  return path;
}
