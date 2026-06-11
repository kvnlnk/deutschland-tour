import { useState, useEffect, useCallback } from "react";
import RouteMap from "./RouteMap";
import POICard from "./POICard";
import AudioPlayer from "./AudioPlayer";
import { useGeolocation } from "../hooks/useGeolocation";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useProximityTracker } from "../hooks/useProximityTracker";
import type { POI } from "../types";

interface TourViewProps {
  pois: POI[];
  routeId: string;
  routeName: string;
  onBack: () => void;
}

export default function TourView({ pois, routeId, routeName, onBack }: TourViewProps) {
  const [language, setLanguage] = useState<"de" | "en">("de");
  const [view, setView] = useState<"map" | "list">("list");
  const [activePoiId, setActivePoiId] = useState<string | null>(null);
  const [showGpsPrompt, setShowGpsPrompt] = useState(true);

  const geo = useGeolocation();
  const audio = useAudioPlayer();

  const { currentPoi, visitedPoiIds, distances } = useProximityTracker(
    pois,
    geo.latitude,
    geo.longitude,
    50
  );

  // Auto-start GPS tracking when tour starts
  useEffect(() => {
    const cleanup = geo.startTracking();
    setShowGpsPrompt(true);
    return cleanup;
  }, []);

  // Auto-play audio when approaching a POI
  useEffect(() => {
    if (currentPoi && currentPoi.id !== audio.currentAudio?.split("/").pop()?.split("_")[0]) {
      const audioUrl = language === "de" ? currentPoi.audioDe : currentPoi.audioEn;
      audio.play(audioUrl);
      setActivePoiId(currentPoi.id);
    }
  }, [currentPoi?.id]);

  const handlePoiPlay = useCallback(
    (poi: POI) => {
      const audioUrl = language === "de" ? poi.audioDe : poi.audioEn;
      if (audio.currentAudio === audioUrl && audio.isPlaying) {
        audio.pause();
      } else {
        audio.play(audioUrl);
        setActivePoiId(poi.id);
      }
    },
    [language, audio]
  );

  const handlePoiLocate = useCallback(
    (poi: POI) => {
      setActivePoiId(poi.id);
      setView("map");
      // Scroll to map and center on POI
      setTimeout(() => {
        document.querySelector(".route-map-container")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    []
  );

  const sortedPois = [...pois].sort((a, b) => a.order - b.order);

  const userLat = geo.latitude ?? undefined;
  const userLng = geo.longitude ?? undefined;

  return (
    <div className="tour-view">
      {/* Header */}
      <header className="tour-header">
        <button className="tour-back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Zurück
        </button>
        <h1 className="tour-title">{routeName}</h1>
        <div className="tour-controls">
          <button
            className={`tour-lang-btn ${language === "de" ? "active" : ""}`}
            onClick={() => setLanguage("de")}
          >
            DE
          </button>
          <button
            className={`tour-lang-btn ${language === "en" ? "active" : ""}`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className={`tour-view-btn ${view === "map" ? "active" : ""}`}
            onClick={() => setView(view === "map" ? "list" : "map")}
            title={view === "map" ? "Liste" : "Karte"}
          >
            {view === "map" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* GPS Status */}
      {showGpsPrompt && !geo.isTracking && !geo.error && (
        <div className="gps-prompt">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Standort aktivieren für automatische Audio-Wiedergabe
          <button className="gps-prompt-btn" onClick={() => geo.startTracking()}>
            Aktivieren
          </button>
        </div>
      )}
      {geo.error && (
        <div className="gps-error">
          GPS: {geo.error} – Audio manuell abspielbar
          <button className="gps-prompt-btn" onClick={() => setShowGpsPrompt(false)}>
            OK
          </button>
        </div>
      )}

      {/* Map */}
      {view === "map" && (
        <div className="tour-map-section">
          <RouteMap
            pois={sortedPois}
            userLat={userLat}
            userLng={userLng}
            activePoiId={activePoiId}
            visitedPoiIds={visitedPoiIds}
            language={language}
            onPoiClick={(id) => {
              const poi = pois.find((p) => p.id === id);
              if (poi) handlePoiPlay(poi);
            }}
          />
        </div>
      )}

      {/* Tour Progress */}
      <div className="tour-progress">
        <div className="tour-progress-bar">
          <div
            className="tour-progress-fill"
            style={{ width: `${(visitedPoiIds.size / pois.length) * 100}%` }}
          />
        </div>
        <span className="tour-progress-text">
          {visitedPoiIds.size} / {pois.length} Stationen erkundet
        </span>
      </div>

      {/* POI List */}
      <div className="tour-poi-list">
        {sortedPois.map((poi) => (
          <POICard
            key={poi.id}
            poi={poi}
            distance={distances[poi.id] || 0}
            isActive={poi.id === activePoiId}
            isVisited={visitedPoiIds.has(poi.id)}
            isPlaying={audio.isPlaying && audio.currentAudio === (language === "de" ? poi.audioDe : poi.audioEn)}
            language={language}
            onPlay={() => handlePoiPlay(poi)}
            onLocate={() => handlePoiLocate(poi)}
          />
        ))}
      </div>

      {/* Audio Player */}
      {audio.currentAudio && (
        <AudioPlayer
          isPlaying={audio.isPlaying}
          currentPoiName={
            (language === "de"
              ? pois.find((p) => (language === "de" ? p.audioDe : p.audioEn) === audio.currentAudio)
              : pois.find((p) => p.audioEn === audio.currentAudio)
            )?.name || ""
          }
          duration={audio.duration}
          currentTime={audio.currentTime}
          onPause={audio.pause}
          onResume={audio.resume}
          onStop={audio.stop}
          onSeek={audio.seek}
        />
      )}
    </div>
  );
}
