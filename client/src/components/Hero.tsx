interface HeroProps {
  onStartTour: () => void;
  onLearnMore: () => void;
  dark?: boolean;
  onToggleDark?: () => void;
}

export default function Hero({ onStartTour, onLearnMore, dark, onToggleDark }: HeroProps) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        {/* Dark Mode Toggle */}
        <button
          className="hero-dark-toggle"
          onClick={onToggleDark}
          title={dark ? "Helles Design" : "Dunkles Design"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {dark ? (
              <>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </>
            ) : (
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            )}
          </svg>
        </button>

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
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">7</span>
            <span className="hero-stat-label">Städte</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">63</span>
            <span className="hero-stat-label">Stationen</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">2</span>
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
