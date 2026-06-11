export interface POI {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  lat: number;
  lng: number;
  order: number;
  imageUrl: string;
  duration: number;
  audioDe: string;
  audioEn: string;
}

export interface Route {
  id: string;
  city: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  imageUrl: string;
  durationMinutes: number;
  distanceKm: number;
  priceCents: number;
  tags?: string[];
  pois: POI[];
}

export interface Review {
  id: string;
  routeId: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export interface TourState {
  isActive: boolean;
  currentPoiIndex: number;
  visitedPoiIds: string[];
  startedAt: string | null;
  completedAt: string | null;
}
