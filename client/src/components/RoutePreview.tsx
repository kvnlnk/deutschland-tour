import { useState, useEffect } from "react";
import type { Route, POI } from "../types";

interface RoutePreviewProps {
  route: Route;
  onStart: () => void;
  onClose: () => void;
  hasAccess: boolean;
  onPurchase: () => void;
  loading: boolean;
}

export default function RoutePreview({
  route,
  onStart,
  onClose,
  hasAccess,
  onPurchase,
  loading,
}: RoutePreviewProps) {
  const [activePoi, setActivePoi] = useState<POI | null>(null);
  const [language, setLanguage] = useState<"de" | "en">("de");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const sortedPois = [...route.pois].sort((a, b) => a.order - b.order);
  const selectedPoi = activePoi || sortedPois[0];
  const isFree = route.priceCents === 0;

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="preview-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="preview-header">
          <h2 className="preview-title">{language === "de" ? route.name : route.nameEn}</h2>
          <p className="preview-city">{route.city}</p>
          <div className="preview-meta">
            <span>🚶 {route.distanceKm} km</span>
            <span>⏱ ~{route.durationMinutes} min</span>
            <span>📍 {route.pois.length} Stationen</span>
          </div>
        </div>

        <div className="preview-content">
          <div className="preview-map-placeholder">
            <img
              src={route.imageUrl}
              alt={route.city}
              style={{
                width: "100%", height: "200px", objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <div style={{
              marginTop: "0.5rem", display: "flex", gap: "0.5rem",
              flexWrap: "wrap", justifyContent: "center"
            }}>
              {sortedPois.slice(0, 5).map((poi) => (
                <span key={poi.id} style={{
                  padding: "0.2rem 0.6rem", fontSize: "0.75rem",
                  background: "var(--color-bg)", borderRadius: "100px",
                  border: "1px solid var(--color-border)"
                }}>
                  {poi.order}. {language === "de" ? poi.name : poi.nameEn}
                </span>
              ))}
              {sortedPois.length > 5 && (
                <span style={{
                  padding: "0.2rem 0.6rem", fontSize: "0.75rem",
                  color: "var(--color-text-muted)"
                }}>
                  +{sortedPois.length - 5} weitere
                </span>
              )}
            </div>
          </div>

          <div className="preview-actions">
            {hasAccess || isFree ? (
              <button className="btn btn-primary" onClick={onStart}>
                🎧 Tour starten
              </button>
            ) : (
              <button
                className="btn btn-accent"
                onClick={onPurchase}
                disabled={loading}
              >
                {loading ? "..." : `€${(route.priceCents / 100).toFixed(2)} kaufen`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
