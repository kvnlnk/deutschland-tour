import { useState, useEffect, useCallback } from "react";
import RouteMap from "./RouteMap";
import POICard from "./POICard";
import AudioPlayer from "./AudioPlayer";
import TourCompletion from "./TourCompletion";
import { useGeolocation } from "../hooks/useGeolocation";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useProximityTracker } from "../hooks/useProximityTracker";
import { useTourProgress } from "../hooks/useTourProgress";
import type { POI } from "../types";

interface TourViewProps {
  pois: POI[];
  routeId: string;
  routeName: string;
  onBack: () => void;
  virtual?: boolean;
}

export default function TourView({ pois, routeId, routeName, onBack, virtual = false }: TourViewProps) {
  const [language, setLanguage] = useState<"de" | "en">("de");
  const [view, setView] = useState<"map" | "list">("list");
  const [activePoiId, setActivePoiId] = useState<string | null>(null);
  const [showGpsPrompt, setShowGpsPrompt] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [virtualPoiIndex, setVirtualPoiIndex] = useState(0);

  const geo = useGeolocation();
  const audio = useAudioPlayer();
  const progress = useTourProgress(routeId);

  const { currentPoi, visitedPoiIds: proxVisited, distances } = useProximityTracker(
    virtual ? [] : pois,
    geo.latitude,
    geo.longitude,
    50
  );

  // Auto-start GPS tracking when tour starts (only in GPS mode)
  useEffect(() => {
    if (!virtual) {
      const cleanup = geo.startTracking();
      setShowGpsPrompt(true);
      return cleanup;
    }
  }, [virtual]);

  // Combine progress from both sources
  const allVisitedPoiIds = new Set([...proxVisited, ...progress.visitedPoiIds]);

  // Auto-play audio when approaching a POI (only in GPS mode)
  useEffect(() => {
    if (virtual) return;
    if (currentPoi && currentPoi.id !== audio.currentAudio?.split("/").pop()?.split("_")[0]) {
      const audioUrl = language === "de" ? currentPoi.audioDe : currentPoi.audioEn;
      audio.play(audioUrl);
      setActivePoiId(currentPoi.id);
      // Save progress
      progress.visitPoi(currentPoi.id);
    }
  }, [currentPoi?.id]);

  // Check for completion on every visit
  useEffect(() => {
    if (allVisitedPoiIds.size >= pois.length && pois.length > 0 && !progress.isCompleted) {
      progress.completeTour();
      setShowCompletion(true);
    }
  }, [allVisitedPoiIds.size, pois.length]);

  const handlePoiPlay = useCallback(
    (poi: POI) => {
      const audioUrl = language === "de" ? poi.audioDe : poi.audioEn;
      if (audio.currentAudio === audioUrl && audio.isPlaying) {
        audio.pause();
      } else {
        audio.play(audioUrl);
        setActivePoiId(poi.id);
        progress.visitPoi(poi.id);
      }
    },
    [language, audio]
  );

  const handlePoiLocate = useCallback(
    (poi: POI) => {
      setActivePoiId(poi.id);
      setView("map");
      setTimeout(() => {
        document.querySelector(".route-map-container")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    []
  );

  const handleRestart = () => {
    progress.resetProgress();
    setShowCompletion(false);
    setActivePoiId(null);
  };

  const handleGoHome = () => {
    setShowCompletion(false);
    onBack();
  };

  const sortedPois = [...pois].sort((a, b) => a.order - b.order);

  // Virtual navigation
  const goNext = () => {
    if (virtualPoiIndex < sortedPois.length - 1) {
      const next = virtualPoiIndex + 1;
      setVirtualPoiIndex(next);
      progress.visitPoi(sortedPois[next].id);
    }
  };
  const goPrev = () => {
    if (virtualPoiIndex > 0) {
      setVirtualPoiIndex(virtualPoiIndex - 1);
    }
  };

  const currentVirtualPoi = virtual ? sortedPois[virtualPoiIndex] : null;

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
        {virtual && (
          <span style={{
            fontSize: "0.65rem", padding: "0.2rem 0.5rem",
            background: "rgba(212,168,83,0.2)", borderRadius: "100px",
            color: "var(--color-accent)", fontWeight: 600,
            whiteSpace: "nowrap", marginLeft: "0.25rem"
          }}>📍 Virtuell</span>
        )}
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
      {!virtual && showGpsPrompt && !geo.isTracking && !geo.error && (
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
            visitedPoiIds={allVisitedPoiIds}
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
            style={{ width: `${(allVisitedPoiIds.size / pois.length) * 100}%` }}
          />
        </div>
        <span className="tour-progress-text">
          {allVisitedPoiIds.size} / {pois.length} Stationen erkundet
        </span>
      </div>

      {/* Virtual POI View */}
      {virtual && currentVirtualPoi && (
        <div className="virtual-poi-view">
          {virtualPoiIndex === 0 && (
            <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
              👆 Tippe auf ▶️ um das Audio abzuspielen, oder navigiere mit ← →
            </p>
          )}
          <div className="virtual-poi-nav">
            <button className="btn btn-sm btn-outline" onClick={goPrev}
              disabled={virtualPoiIndex === 0}>
              ← Vorherige
            </button>
            <span style={{
              fontSize: "0.85rem", fontWeight: 600,
              color: "var(--color-primary)"
            }}>
              {virtualPoiIndex + 1} / {sortedPois.length}
            </span>
            <button className="btn btn-sm btn-outline" onClick={goNext}
              disabled={virtualPoiIndex >= sortedPois.length - 1}>
              Nächste →
            </button>
          </div>

          <div className="virtual-poi-card">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", marginBottom: "0.5rem" }}>
              {language === "de" ? currentVirtualPoi.name : currentVirtualPoi.nameEn}
            </h3>
            {currentVirtualPoi.imageUrl && (
              <img src={currentVirtualPoi.imageUrl} alt={currentVirtualPoi.name}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "0.75rem" }} />
            )}
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-text)" }}>
              {language === "de" ? currentVirtualPoi.description : currentVirtualPoi.descriptionEn}
            </p>
            <div style={{ marginTop: "0.75rem" }}>
              <button
                className={`btn btn-sm ${audio.isPlaying && audio.currentAudio === (language === "de" ? currentVirtualPoi.audioDe : currentVirtualPoi.audioEn) ? "btn-playing" : "btn-audio"}`}
                onClick={() => handlePoiPlay(currentVirtualPoi)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  {audio.isPlaying && audio.currentAudio === (language === "de" ? currentVirtualPoi.audioDe : currentVirtualPoi.audioEn) ? (
                    <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></>
                  ) : (
                    <polygon points="5 3 19 12 5 21 5 3" />
                  )}
                </svg>
                {audio.isPlaying && audio.currentAudio === (language === "de" ? currentVirtualPoi.audioDe : currentVirtualPoi.audioEn) ? "Pause" : "Audio"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POI List */}
      <div className="tour-poi-list">
        {sortedPois.map((poi) => (
          <POICard
            key={poi.id}
            poi={poi}
            distance={distances[poi.id] || 0}
            isActive={poi.id === activePoiId}
            isVisited={allVisitedPoiIds.has(poi.id)}
            isPlaying={audio.isPlaying && audio.currentAudio === (language === "de" ? poi.audioDe : poi.audioEn)}
            language={language}
            onPlay={() => handlePoiPlay(poi)}
            onLocate={() => handlePoiLocate(poi)}
          />
        ))}
      </div>

      {/* Tour Completion Modal */}
      {showCompletion && (
        <TourCompletion
          routeId={routeId}
          routeName={routeName}
          visitedCount={allVisitedPoiIds.size}
          totalCount={pois.length}
          startedAt={progress.startedAt}
          duration={Math.round((pois.reduce((sum, p) => sum + p.duration, 0) + 15))} // walk time buffer
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      )}

      {/* Reviews */}
      <div className="tour-reviews">
        {/* ReviewSection is hidden when completion is showing to avoid conflicts */}
        {!showCompletion && (
          <div className="review-section-placeholder">
            {/*
              ReviewSection is conditionally imported to avoid issues with the completion overlay
              The import happens dynamically to keep bundle size small
            */}
          </div>
        )}
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
