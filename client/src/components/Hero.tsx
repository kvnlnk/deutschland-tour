interface HeroProps {
  onStartTour: () => void;
  onLearnMore: () => void;
  onViewAllTours?: () => void;
  dark?: boolean;
  onToggleDark?: () => void;
  stats?: { pois: number; distance: string; cities: number; languages: number };
}

export default function Hero({ onStartTour, onLearnMore, onViewAllTours, dark, onToggleDark, stats }: HeroProps) {
  const s = stats || { pois: 0, distance: "0", cities: 0, languages: 2 };
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">🇩🇪 Audio Walking Tours</div>
        <h1 className="hero-title">
          Entdecke{' '}
          <span className="hero-title-highlight">Deutschland</span>
          <br />
          Schritt für Schritt
        </h1>
        <p className="hero-subtitle">
          Kostenlose, selbstgeführte Touren durch Deutschlands schönste
          Städte. Mit GPS-gesteuerten Audioguides – in Deutsch und Englisch.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onStartTour}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Kostenlos starten
          </button>
          <button className="btn btn-secondary" onClick={onLearnMore}>
            Mehr erfahren
          </button>
          {onViewAllTours && (
            <button className="btn btn-secondary" onClick={onViewAllTours}>
              Alle Touren
            </button>
          )}
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{s.cities}</span>
            <span className="hero-stat-label">Städte</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{s.pois}</span>
            <span className="hero-stat-label">Stationen</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{s.languages}</span>
            <span className="hero-stat-label">Sprachen</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">0€</span>
            <span className="hero-stat-label">Start</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5" />
          <path d="M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
