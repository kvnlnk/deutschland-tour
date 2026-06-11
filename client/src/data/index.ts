import { Route } from "../types";
import { berlinClassicRoute } from "./berlin";
import { muenchenAltstadt } from "./muenchen";
import { hamburgHafen } from "./hamburg";

// Static fallback data
export const routes: Route[] = [
  berlinClassicRoute,
  muenchenAltstadt,
  hamburgHafen,
];

export function getRouteById(id: string): Route | undefined {
  return routes.find((r) => r.id === id);
}

export function getRoutesByCity(city: string): Route[] {
  return routes.filter((r) => r.city === city);
}

export const CITIES = Array.from(new Set(routes.map((r) => r.city)));

export const PRICING = {
  singleTour: 499,
  cityBundle: 1499,
  allAccess: 2999,
};

// API fetcher – fetches additional routes from server
// const API_BASE = "";
// export async function fetchApiRoutes(): Promise<Route[]> {
//   const res = await fetch(`${API_BASE}/api/routes`);
//   if (!res.ok) return [];
//   const data = await res.json();
//   return data.routes || [];
// }
