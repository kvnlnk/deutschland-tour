import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "deutschland-tour-baukasten";

export interface BaukastenModul {
  id: string;
  title: string;
  cat: string | string[];
  location: string;
  desc: string;
  highlights: string[];
  time: string;
  best: string;
  emoji: string;
}

export function useBaukasten() {
  const [selected, setSelected] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
  }, [selected]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const remove = useCallback((id: string) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  }, []);

  return { selected, toggle, clear, remove };
}
