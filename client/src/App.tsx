import { useState, useEffect, lazy, Suspense } from "react";
import Hero from "./components/Hero";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import SearchBar from "./components/SearchBar";
import "./styles/pricing.css";
import { PurchaseProvider, usePurchase } from "./hooks/usePurchase";
import {
  mergeRoutes,
  getRouteById,
  getRoutes,
  getStats,
  CITIES,
} from "./data";
import type { Route } from "./types";

const TourView = lazy(() => import("./components/TourView"));

type Screen = "landing" | "tour" | "about";

export function AppContent() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedRouteId, setSelectedRouteId] = useState<string>("berlin-classic");
  const [apiReady, setApiReady] = useState(false);
  const { hasAccess, purchaseTour, loading } = usePurchase();

  // Load from API on mount (silently)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { fetchRoutes, fetchRouteDetails } = await import("./api");
        const routeList = await fetchRoutes();

        // Fetch details for each route (gives POIs)
        const details = await Promise.all(
          routeList.map((r: Route) => fetchRouteDetails(r.id))
        );
        const validDetails = details.filter(Boolean) as Route[];

        // Merge with fallback data
        mergeRoutes(validDetails.length > 0 ? validDetails : routeList);
        if (!cancelled) setApiReady(true);
      } catch {
        // API failed, fallback data already set by mergeRoutes
        if (!cancelled) setApiReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const routes = getRoutes();
  const stats = getStats();
  const selectedRoute = getRouteById(selectedRouteId);

  const startTour = (routeId: string) => {
    setSelectedRouteId(routeId);
    setScreen("tour");
  };

  return (
    <div className="app">
      {screen === "landing" && (
        <>
          {!apiReady && (
            <div className="loading-bar">
              <div className="loading-bar-fill" />
            </div>
          )}

          <Hero
            onStartTour={() => startTour("berlin-classic")}
            onLearnMore={() => setScreen("about")}
          />

          {/* Search Section */}
          <section className="search-section">
            <div className="search-section-content">
              <SearchBar
                onSearch={(query) => {
                  const found = routes.find(
                    (r) =>
                      r.city.toLowerCase().includes(query.toLowerCase()) ||
                      r.tags?.some((t) =>
                        t.toLowerCase().includes(query.toLowerCase())
                      )
                  );
                  if (found) startTour(found.id);
                }}
              />
              <div className="search-popular">
                <span className="search-popular-label">Beliebt:</span>
                {routes.map((r) => (
                  <button
                    key={r.id}
                    className="search-popular-tag"
                    onClick={() => startTour(r.id)}
                  >
                    {r.city}
                  </button>
                ))}
                {["historisch", "architektur", "kulinarisch"].map((tag) => (
                  <button
                    key={tag}
                    className="search-popular-tag search-popular-tag--tag"
                    onClick={() => {
                      const found = routes.find((r) =>
                        r.tags?.includes(tag)
                      );
                      if (found) startTour(found.id);
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Counter Section */}
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats.pois}</span>
                <span className="stat-label">Stationen</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.distance} km</span>
                <span className="stat-label">Routenlänge</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.cities}</span>
                <span className="stat-label">Städte</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.languages}</span>
                <span className="stat-label">Sprachen</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0 €</span>
                <span className="stat-label">Start</span>
              </div>
            </div>
          </section>

          {/* City Preview Section */}
          <section className="city-preview" id="tours">
            <div className="city-preview-content">
              <h2 className="section-title">Verfügbare Touren</h2>
              <p className="section-subtitle">
                Wähle deine Stadt und tauche ein in die Geschichte.
              </p>

              <div className="city-cards">
                {routes.map((route) => {
                  const isFree = route.priceCents === 0;
                  const owned = hasAccess(route.id);
                  const canStart = isFree || owned;

                  return (
                    <div
                      key={route.id}
                      className={`city-card ${canStart ? "" : "city-card--locked"}`}
                      onClick={() => canStart ? startTour(route.id) : purchaseTour(route.id)}
                    >
                      <div className="city-card-image">
                        <img
                          src={route.imageUrl}
                          alt={route.city}
                          loading="lazy"
                        />
                        <div className="city-card-overlay">
                          {isFree ? (
                            <span className="city-card-badge city-card-badge--free">KOSTENLOS</span>
                          ) : owned ? (
                            <span className="city-card-badge city-card-badge--owned">GEKAUFT</span>
                          ) : (
                            <span className="city-card-badge city-card-badge--paid">
                              €{(route.priceCents / 100).toFixed(2)}
                            </span>
                          )}
                        </div>
                        {!canStart && !loading && (
                          <div className="city-card-lock">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="city-card-body">
                        <h3 className="city-card-title">{route.city}</h3>
                        <p className="city-card-desc">
                          {route.description}
                        </p>
                        <div className="city-card-meta">
                          <span>🚶 {route.distanceKm} km</span>
                          <span>⏱ ~{route.durationMinutes} min</span>
                          <span>📍 {route.pois.length} Stationen</span>
                        </div>
                        {!canStart && (
                          <button
                            className="btn btn-accent pricing-btn-sm"
                            onClick={(e) => { e.stopPropagation(); purchaseTour(route.id); }}
                            disabled={loading}
                          >
                            {loading ? "..." : `€${(route.priceCents / 100).toFixed(2)} kaufen`}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="gallery-section">
            <h2 className="section-title">Erlebnis-Eindrücke</h2>
            <p className="section-subtitle">
              Ein Vorgeschmack auf das, was dich erwartet.
            </p>
            <div className="gallery-grid">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className="gallery-card"
                  onClick={() => startTour(route.id)}
                >
                  <img
                    src={route.imageUrl}
                    alt={route.city}
                    loading="lazy"
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-city">{route.city}</span>
                    <span className="gallery-cta">Tour entdecken →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <PricingSection onStartFreeTour={() => startTour("berlin-classic")} />

          {/* FAQ Section */}
          <FAQSection />

          {/* Features Section */}
          <section className="features">
            <h2 className="section-title">So funktioniert's</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📍</div>
                <h3>GPS-gesteuert</h3>
                <p>
                  Die Audio-Tour startet automatisch, sobald du dich einer
                  Sehenswürdigkeit näherst. Oder manuell – wie du magst.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎧</div>
                <h3>Professionelles Audio</h3>
                <p>
                  Hochwertige Sprachaufnahmen in Deutsch und Englisch – mit
                  historischem Hintergrundwissen zu jeder Station.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🗺️</div>
                <h3>Interaktive Karte</h3>
                <p>
                  Verfolge deine Position in Echtzeit und entdecke die Route
                  auf einer detaillierten OpenStreetMap-Karte.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Keine Installation</h3>
                <p>
                  Einfach die Webseite öffnen – keine App, kein Login, kein
                  Download. Läuft in jedem Browser.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-brand">
                <span className="footer-logo">🇩🇪 Deutschland Tour</span>
                <p className="footer-text">
                  Self-Guided Walking Tours – Geschichte erleben, Schritt für
                  Schritt.
                </p>
              </div>
              <div className="footer-links">
                <span className="footer-link" onClick={() => setScreen("about")}>
                  Über uns
                </span>
                <a
                  className="footer-link"
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  FAQ
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Deutschland Tour. Open Source &amp; kostenlos.</p>
            </div>
          </footer>
        </>
      )}

      {screen === "tour" && selectedRoute && (
        <Suspense fallback={
          <div className="loading-screen">
            <div className="loading-spinner" />
            <p>Lade Tour...</p>
          </div>
        }>
          <TourView
            pois={selectedRoute.pois}
            routeId={selectedRoute.id}
            routeName={selectedRoute.name}
            onBack={() => setScreen("landing")}
          />
        </Suspense>
      )}

      {screen === "about" && (
        <div className="about-page">
          <button className="about-back" onClick={() => setScreen("landing")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>
          <h1>Über Deutschland Tour</h1>
          <p>
            Deutschland Tour ist ein Open-Source-Projekt für selbstgeführte
            Audio-Walking-Touren durch deutsche Städte. Keine Werbung, kein
            Tracking, keine versteckten Kosten – einfach reines
            Kulturerlebnis.
          </p>
          <p>
            Jede Tour wird von Historikern und lokalen Experten recherchiert.
            Die Audioguides sind in Deutsch und Englisch verfügbar und werden
            automatisch per GPS an jeder Station abgespielt.
          </p>
          <p>
            Ideal für Individualreisende, Familienausflüge und alle, die
            Städte auf eigene Faust entdecken möchten.
          </p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <PurchaseProvider>
      <AppContent />
    </PurchaseProvider>
  );
}
