import type { POI } from "../types";
import ImageWithFallback from "./ImageWithFallback";

interface POICardProps {
  poi: POI;
  distance: number;
  isActive: boolean;
  isVisited: boolean;
  isPlaying: boolean;
  language: "de" | "en";
  onPlay: () => void;
  onLocate: () => void;
}

export default function POICard({
  poi,
  distance,
  isActive,
  isVisited,
  isPlaying,
  language,
  onPlay,
  onLocate,
}: POICardProps) {
  const name = language === "de" ? poi.name : poi.nameEn;
  const description = language === "de" ? poi.description : poi.descriptionEn;

  return (
    <div
      className={`poi-card ${isActive ? "poi-card--active" : ""} ${isVisited ? "poi-card--visited" : ""}`}
      id={`poi-${poi.id}`}
    >
      <div className="poi-card-number">{poi.order}</div>
      <div className="poi-card-image-wrapper">
        <ImageWithFallback
          src={poi.imageUrl}
          alt={name}
          className="poi-card-image"
          aspectRatio="4/3"
        />
        {isVisited && (
          <div className="poi-card-check">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>
      <div className="poi-card-body">
        <div className="poi-card-header">
          <h3 className="poi-card-title">{name}</h3>
          <span className="poi-card-time">{poi.duration} min</span>
        </div>
        <p className="poi-card-description">{description}</p>
        <div className="poi-card-meta">
          {distance > 0 && (
            <span className="poi-card-distance">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {distance > 1000
                ? `${(distance / 1000).toFixed(1)} km`
                : `${distance} m`}
            </span>
          )}
          {isVisited && (
            <span className="poi-card-status">Besucht</span>
          )}
        </div>
        <div className="poi-card-actions">
          <button
            className={`btn btn-sm ${isPlaying ? "btn-playing" : "btn-audio"}`}
            onClick={onPlay}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              {isPlaying ? (
                <>
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </>
              ) : (
                <polygon points="5 3 19 12 5 21 5 3" />
              )}
            </svg>
            {isPlaying ? "Pause" : "Audio"}
          </button>
          <button className="btn btn-sm btn-outline" onClick={onLocate}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Zeigen
          </button>
        </div>
      </div>
    </div>
  );
}
