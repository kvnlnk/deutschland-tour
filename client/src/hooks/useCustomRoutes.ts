import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "deutschland-tour-custom";

export interface CustomPOI {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  order: number;
}

export interface CustomRoute {
  id: string;
  name: string;
  description: string;
  city: string;
  pois: CustomPOI[];
  createdAt: string;
}

function loadRoutes(): CustomRoute[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useCustomRoutes() {
  const [routes, setRoutes] = useState<CustomRoute[]>(loadRoutes);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
  }, [routes]);

  const addRoute = useCallback(
    (route: Omit<CustomRoute, "id" | "createdAt">) => {
      const newRoute: CustomRoute = {
        ...route,
        id: `custom-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setRoutes((prev) => [newRoute, ...prev]);
      return newRoute;
    },
    []
  );

  const deleteRoute = useCallback((id: string) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const updateRoute = useCallback((id: string, updates: Partial<CustomRoute>) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  }, []);

  return { routes, addRoute, deleteRoute, updateRoute };
}
