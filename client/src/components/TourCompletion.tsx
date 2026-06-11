import { useState } from "react";
import { getStats } from "../data";
import { getTotalStats } from "../hooks/useTourProgress";

interface TourCompletionProps {
  routeId: string;
  routeName: string;
  visitedCount: number;
  totalCount: number;
  startedAt: string | null;
  duration: number; // in minutes
  onRestart: () => void;
  onGoHome: () => void;
}

export default function TourCompletion({
  routeId,
  routeName,
  visitedCount,
  totalCount,
  startedAt,
  duration,
  onRestart,
  onGoHome,
}: TourCompletionProps) {
  const [shared, setShared] = useState(false);

  // Calculate elapsed time
  const elapsedMinutes = startedAt
    ? Math.round(
        (Date.now() - new Date(startedAt).getTime()) / 60000
      )
    : duration;

  const stats = getStats();
  const totalStats = getTotalStats();

  const handleShare = async () => {
    const text =
      `🇩🇪 Ich habe gerade "${routeName}" abgeschlossen!\n` +
      `📍 ${visitedCount}/${totalCount} Stationen erkundet\n` +
      `⏱ ${elapsedMinutes} Minuten unterwegs\n` +
      `\nEntdecke auch du Deutschlands Städte: deutschland-tour.app`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Deutschland Tour", text });
        setShared(true);
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="completion-overlay">
      <div className="completion-modal">
        <div className="completion-badge">🎉</div>
        <h2 className="completion-title">Tour abgeschlossen!</h2>
        <p className="completion-subtitle">{routeName}</p>

        <div className="completion-stats">
          <div className="completion-stat">
            <span className="completion-stat-value">{visitedCount}</span>
            <span className="completion-stat-label">Stationen</span>
          </div>
          <div className="completion-stat">
            <span className="completion-stat-value">{elapsedMinutes}</span>
            <span className="completion-stat-label">Minuten</span>
          </div>
          <div className="completion-stat">
            <span className="completion-stat-value">{totalStats.completedTours}</span>
            <span className="completion-stat-label">Touren ✅</span>
          </div>
        </div>

        <div className="completion-actions">
          <button className="btn btn-primary" onClick={handleShare}>
            {shared ? "✓ Kopiert!" : "📤 Teilen"}
          </button>
          <button className="btn btn-secondary" onClick={onRestart}>
            🔄 Nochmal
          </button>
          <button className="btn btn-secondary" onClick={onGoHome}>
            🏠 Übersicht
          </button>
        </div>
      </div>
    </div>
  );
}
