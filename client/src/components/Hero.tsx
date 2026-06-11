interface HeroProps {
  onStartTour: () => void;
  onLearnMore: () => void;
}

export default function Hero({ onStartTour, onLearnMore }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge">SELF-GUIDED WALKING TOURS</div>
        <h1 className="hero-title">
          Entdecke
          <br />
          <span className="hero-title-highlight">Deutschland</span>
        </h1>
        <p className="hero-subtitle">
          Schritt für Schritt. Geschichte hautnah. Kostenlose Audio-Touren
          durch Deutschlands schönste Städte – einfach starten und loslaufen.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onStartTour}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Tour starten
          </button>
          <button className="btn btn-secondary" onClick={onLearnMore}>
            Mehr erfahren
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">9</span>
            <span className="hero-stat-label">Stationen</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">4,2 km</span>
            <span className="hero-stat-label">Strecke</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">~2 h</span>
            <span className="hero-stat-label">Dauer</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">DE/EN</span>
            <span className="hero-stat-label">Sprachen</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
