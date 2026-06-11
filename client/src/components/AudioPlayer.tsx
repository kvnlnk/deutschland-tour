import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
  currentPoiName: string;
  duration: number;
  currentTime: number;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSeek: (time: number) => void;
}

export default function AudioPlayer({
  isPlaying,
  currentPoiName,
  duration,
  currentTime,
  onPause,
  onResume,
  onStop,
  onSeek,
}: AudioPlayerProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = Math.max(0, duration - currentTime);
  const remainingStr = `${Math.floor(remaining / 60)}:${String(Math.floor(remaining % 60)).padStart(2, "0")}`;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(ratio * duration);
  };

  if (!currentPoiName) return null;

  return (
    <div className={`audio-player ${isPlaying ? "audio-player--active" : ""}`}>
      <div className="audio-player-info">
        <div className="audio-player-icon">
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12 6.5L9 18z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          )}
        </div>
        <div className="audio-player-text">
          <span className="audio-player-name">{currentPoiName}</span>
          <span className="audio-player-remaining">{remainingStr}</span>
        </div>
      </div>

      <div
        ref={progressRef}
        className="audio-player-progress"
        onClick={handleProgressClick}
      >
        <div className="audio-player-track">
          <div
            className="audio-player-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="audio-player-controls">
        <button className="audio-player-btn" onClick={onStop} title="Stop">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        </button>
        <button
          className="audio-player-btn audio-player-btn--main"
          onClick={isPlaying ? onPause : onResume}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
