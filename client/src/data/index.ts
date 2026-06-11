import { Route } from "../types";
import { berlinClassicRoute } from "./berlin";
import { muenchenAltstadt } from "./muenchen";
import { hamburgHafen } from "./hamburg";

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
  singleTour: 499,     // €4.99 per tour
  cityBundle: 1499,    // €14.99 all tours in one city
  allAccess: 2999,     // €29.99 all tours forever
};
