import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "deutschland-tour-progress";

interface TourProgress {
  [routeId: string]: {
    visitedPoiIds: string[];
    startedAt: string;
    completedAt: string | null;
  };
}

function loadProgress(): TourProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: TourProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useTourProgress(routeId: string) {
  const [progress, setProgress] = useState<TourProgress>(loadProgress);
  const [isNewlyCompleted, setIsNewlyCompleted] = useState(false);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const visitPoi = useCallback((poiId: string) => {
    setProgress((prev) => {
      const current = prev[routeId] || {
        visitedPoiIds: [],
        startedAt: new Date().toISOString(),
        completedAt: null,
      };

      if (current.visitedPoiIds.includes(poiId)) return prev;

      const updated = {
        ...prev,
        [routeId]: {
          ...current,
          visitedPoiIds: [...current.visitedPoiIds, poiId],
        },
      };
      return updated;
    });
  }, [routeId]);

  const completeTour = useCallback(() => {
    setProgress((prev) => {
      const current = prev[routeId];
      if (!current || current.completedAt) return prev;
      
      const now = new Date().toISOString();
      setIsNewlyCompleted(true);
      
      return {
        ...prev,
        [routeId]: {
          ...current,
          completedAt: now,
        },
      };
    });
  }, [routeId]);

  const resetProgress = useCallback(() => {
    setProgress((prev) => {
      const next = { ...prev };
      delete next[routeId];
      return next;
    });
    setIsNewlyCompleted(false);
  }, [routeId]);

  const routeData = progress[routeId];
  const visitedPoiIds = new Set(routeData?.visitedPoiIds || []);
  const isCompleted = !!routeData?.completedAt;

  return {
    visitedPoiIds,
    isCompleted,
    isNewlyCompleted,
    startedAt: routeData?.startedAt || null,
    completedAt: routeData?.completedAt || null,
    visitPoi,
    completeTour,
    resetProgress,
  };
}

export function getTotalStats() {
  const progress = loadProgress();
  const routeIds = Object.keys(progress);
  const completedCount = routeIds.filter((id) => progress[id].completedAt).length;
  const totalPoisVisited = routeIds.reduce(
    (sum, id) => sum + (progress[id]?.visitedPoiIds?.length || 0),
    0
  );
  return { startedTours: routeIds.length, completedTours: completedCount, totalPoisVisited };
}
