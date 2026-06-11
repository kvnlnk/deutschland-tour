import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import SearchBar from "./components/SearchBar";
import RoutePreview from "./components/RoutePreview";
import "./styles/pricing.css";
import { PurchaseProvider, usePurchase } from "./hooks/usePurchase";
import { useDarkMode } from "./hooks/useDarkMode";
import { useFavorites } from "./hooks/useFavorites";
import { useCustomRoutes } from "./hooks/useCustomRoutes";
import type { CustomRoute } from "./hooks/useCustomRoutes";
import CustomRoutesPage from "./components/CustomRoutesPage";
import RouteEditor from "./components/RouteEditor";
import {
  mergeRoutes,
  getRouteById,
  getRoutes,
  getStats,
} from "./data";
import type { Route } from "./types";

const TourView = lazy(() => import("./components/TourView"));

type Page = "home" | "tours" | "pricing" | "about" | "tour" | "custom";

const FEATURED_CITIES = ["berlin-classic", "muenchen-classic", "hamburg-classic", "koeln-dom", "dresden-altstadt", "heidelberg-schloss"];

export function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const [selectedRouteId, setSelectedRouteId] = useState<string>("berlin-classic");
  const [apiReady, setApiReady] = useState(false);
  const [previewRoute, setPreviewRoute] = useState<Route | null>(null);
  const [virtualMode, setVirtualMode] = useState(false);
  const { dark, toggle: toggleDark } = useDarkMode();
  const { hasAccess, purchaseTour, loading } = usePurchase();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { routes: customRoutes, addRoute } = useCustomRoutes();
  const [showEditor, setShowEditor] = useState(false);

  // Helper: convert CustomRoute to Route format for the tour viewer
  const customRouteToRoute = useCallback((cr: CustomRoute): Route => ({
    id: cr.id,
    city: cr.city,
    name: cr.name,
    nameEn: cr.name,
    description: cr.description,
    descriptionEn: cr.description,
    imageUrl: "",
    durationMinutes: cr.pois.length * 10,
    distanceKm: 0,
    priceCents: 0,
    tags: ["custom"],
    pois: cr.pois.map((p) => ({
      id: p.id,
      name: p.name,
      nameEn: p.name,
      description: p.description,
      descriptionEn: p.description,
      lat: p.lat,
      lng: p.lng,
      order: p.order,
      imageUrl: "",
      duration: 10,
      audioDe: "",
      audioEn: "",
    })),
  }), []);

  // Load from API on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { fetchRoutes, fetchRouteDetails } = await import("./api");
        const routeList = await fetchRoutes();
        const details = await Promise.all(
          routeList.map((r: Route) => fetchRouteDetails(r.id))
        );
        const validDetails = details.filter(Boolean) as Route[];
        mergeRoutes(validDetails.length > 0 ? validDetails : routeList);
        if (!cancelled) setApiReady(true);
      } catch {
        if (!cancelled) setApiReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const routes = getRoutes();
  const stats = getStats();
  const selectedRoute =
    getRouteById(selectedRouteId) ??
    (() => {
      const cr = customRoutes.find((r) => r.id === selectedRouteId);
      return cr ? customRouteToRoute(cr) : undefined;
    })();

  const navigate = (p: string) => {
    if (p === "home" || p === "tours" || p === "pricing" || p === "about" || p === "custom") {
      setPage(p as Page);
      if (p !== "custom") setShowEditor(false);
    }
  };

  const startTour = (routeId: string) => {
    setPreviewRoute(null);
    setSelectedRouteId(routeId);
    setVirtualMode(false);
    setPage("tour");
  };

  const startVirtualTour = (routeId: string) => {
    setPreviewRoute(null);
    setSelectedRouteId(routeId);
    setVirtualMode(true);
    setPage("tour");
  };

  const handleCityClick = (route: Route) => {
    const isFree = route.priceCents === 0;
    const owned = hasAccess(route.id);
    if (isFree || owned) {
      startTour(route.id);
    } else {
      setPreviewRoute(route);
    }
  };

  const SectionTitle = ({ id, title, subtitle }: { id?: string; title: string; subtitle?: string }) => (
    <>
      <h2 className="section-title" id={id}>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </>
  );

  const CityCard = ({ route, canStart, owned, isFree }: {
    route: Route; canStart: boolean; owned: boolean; isFree: boolean;
  }) => {
    const isComingSoon = route.tags?.includes("coming-soon");
    const fav = isFavorite(route.id);

    return (
    <div
      className={`city-card ${canStart ? "" : "city-card--locked"} ${isComingSoon ? "city-card--coming-soon" : ""}`}
      onClick={() => handleCityClick(route)}
    >
      <div className="city-card-image">
        <img src={route.imageUrl} alt={route.city} loading="lazy" />
        <div className="city-card-overlay">
          {isComingSoon ? (
            <span className="city-card-badge city-card-badge--coming-soon">DEMNÄCHST</span>
          ) : isFree ? (
            <span className="city-card-badge city-card-badge--free">KOSTENLOS</span>
          ) : owned ? (
            <span className="city-card-badge city-card-badge--owned">GEKAUFT</span>
          ) : (
            <span className="city-card-badge city-card-badge--paid">
              €{(route.priceCents / 100).toFixed(2)}
            </span>
          )}
        </div>
        {!canStart && !loading && !isComingSoon && (
          <div className="city-card-lock">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        )}
        {/* Favorite toggle */}
        <button
          className={`city-card-fav ${fav ? "city-card-fav--active" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(route.id); }}
          title={fav ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>
      <div className="city-card-body">
        <h3 className="city-card-title">{route.city}</h3>
        <p className="city-card-desc">{route.description}</p>
        <div className="city-card-meta">
          {!isComingSoon && (
            <>
              <span>🚶 {route.distanceKm} km</span>
              <span>⏱ ~{route.durationMinutes} min</span>
              <span>📍 {route.pois.length} Stationen</span>
            </>
          )}
          {route.tags && route.tags.length > 0 && (
            <span className="city-card-tags">
              {route.tags.slice(0, 2).filter(t => t !== "coming-soon").map(t => `#${t}`).join(" ")}
            </span>
          )}
        </div>
        {canStart && !isComingSoon && (
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <button className="btn btn-primary pricing-btn-sm" onClick={(e) => { e.stopPropagation(); startTour(route.id); }}>
              🎧 GPS-Tour
            </button>
            <button className="btn pricing-btn-sm" style={{ color: "var(--color-text)", border: "1px solid var(--color-border)", background: "transparent" }} onClick={(e) => { e.stopPropagation(); startVirtualTour(route.id); }}>
              🖥️ Virtuell
            </button>
          </div>
        )}
        {!canStart && !isComingSoon && (
          <button
            className="btn btn-accent pricing-btn-sm"
            onClick={(e) => { e.stopPropagation(); purchaseTour(route.id); }}
            disabled={loading}
          >
            {loading ? "..." : `€${(route.priceCents / 100).toFixed(2)} kaufen`}
          </button>
        )}
        {isComingSoon && (
          <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "0.5rem" }}>🔜 In Vorbereitung</p>
        )}
      </div>
    </div>
  )};

  return (
    <div className="app">
      {!apiReady && page !== "tour" && (
        <div className="loading-bar"><div className="loading-bar-fill" /></div>
      )}

      {page !== "tour" && (
        <NavBar dark={dark} onToggleDark={toggleDark} onNavigate={navigate} currentPage={page} />
      )}

      {/* Route Preview Modal */}
      {previewRoute && (
        <RoutePreview
          route={previewRoute}
          onStart={() => startTour(previewRoute.id)}
          onClose={() => setPreviewRoute(null)}
          hasAccess={hasAccess(previewRoute.id)}
          onPurchase={() => purchaseTour(previewRoute.id)}
          loading={loading}
        />
      )}

      {/* === HOME PAGE === */}
      {page === "home" && (
        <>
          <Hero
            onStartTour={() => startTour("berlin-classic")}
            onLearnMore={() => setPage("about")}
            onViewAllTours={() => setPage("tours")}
            dark={dark}
            onToggleDark={toggleDark}
          />

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

          <section className="city-preview">
            <SectionTitle
              title="Beliebte Touren"
              subtitle="Kostenlos starten – oder alle 6 Städte entdecken."
            />
            <div className="city-cards">
              {routes.filter(r => FEATURED_CITIES.includes(r.id)).map((route) => {
                const isFree = route.priceCents === 0;
                const owned = hasAccess(route.id);
                return (
                  <CityCard key={route.id} route={route} canStart={isFree || owned} owned={owned} isFree={isFree} />
                );
              })}
            </div>
            <div className="city-preview-footer">
              <button className="btn btn-primary" onClick={() => setPage("tours")}>
                Alle {stats.cities} Städte entdecken →
              </button>
            </div>
          </section>

          <section className="features">
            <SectionTitle title="So funktioniert's" />
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📍</div>
                <h3>GPS-gesteuert</h3>
                <p>Die Audio-Tour startet automatisch, sobald du dich einer Sehenswürdigkeit näherst.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎧</div>
                <h3>Professionelles Audio</h3>
                <p>Hochwertige Sprachaufnahmen in Deutsch und Englisch – mit historischem Hintergrundwissen.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🗺️</div>
                <h3>Interaktive Karte</h3>
                <p>Verfolge deine Position in Echtzeit auf einer detaillierten OpenStreetMap-Karte.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Keine Installation</h3>
                <p>Einfach die Webseite öffnen – keine App, kein Login, kein Download.</p>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="footer-content">
              <div className="footer-brand">
                <span className="footer-logo">🇩🇪 Deutschland Tour</span>
                <p className="footer-text">Self-Guided Walking Tours – Geschichte erleben, Schritt für Schritt.</p>
              </div>
              <div className="footer-links">
                <button className="footer-link" onClick={() => setPage("about")}>Über uns</button>
                <button className="footer-link" onClick={() => setPage("tours")}>Touren</button>
                <button className="footer-link" onClick={() => setPage("pricing")}>Preise</button>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Deutschland Tour. Open Source &amp; kostenlos.</p>
            </div>
          </footer>
        </>
      )}

      {/* === TOURS PAGE === */}
      {page === "tours" && (
        <div className="page-tours">
          <section className="search-section">
            <div className="search-section-content">
              <h2 className="page-heading">Alle Touren</h2>
              <SearchBar
                onSearch={(query) => {
                  const found = routes.find(
                    (r) =>
                      r.city.toLowerCase().includes(query.toLowerCase()) ||
                      r.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
                  );
                  if (found) startTour(found.id);
                }}
              />
              <div className="search-popular">
                <span className="search-popular-label">Beliebt:</span>
                {routes.map((r) => (
                  <button key={r.id} className="search-popular-tag" onClick={() => startTour(r.id)}>
                    {r.city}
                  </button>
                ))}
                {["historisch", "architektur", "kulinarisch"].map((tag) => (
                  <button
                    key={tag}
                    className="search-popular-tag search-popular-tag--tag"
                    onClick={() => {
                      const found = routes.find((r) => r.tags?.includes(tag));
                      if (found) startTour(found.id);
                    }}
                  >#{tag}</button>
                ))}
              </div>
            </div>
          </section>

          <section className="city-preview">
            <div className="city-cards">
              {routes.map((route) => {
                const isFree = route.priceCents === 0;
                const owned = hasAccess(route.id);
                const canStart = isFree || owned;
                return (
                  <CityCard key={route.id} route={route} canStart={canStart} owned={owned} isFree={isFree} />
                );
              })}
            </div>
          </section>

          {/* Gallery */}
          <section className="gallery-section">
            <SectionTitle title="Erlebnis-Eindrücke" subtitle="Ein Vorgeschmack auf das, was dich erwartet." />
            <div className="gallery-grid">
              {routes.filter(r => !r.tags?.includes("coming-soon")).map((route) => (
                <div key={route.id} className="gallery-card" onClick={() => startTour(route.id)}>
                  <img src={route.imageUrl} alt={route.city} loading="lazy" className="gallery-image" />
                  <div className="gallery-overlay">
                    <span className="gallery-city">{route.city}</span>
                    <span className="gallery-cta">Tour entdecken →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <FAQSection />

          <footer className="footer">
            <div className="footer-content">
              <div className="footer-brand">
                <span className="footer-logo">🇩🇪 Deutschland Tour</span>
                <p className="footer-text">Self-Guided Walking Tours – Geschichte erleben, Schritt für Schritt.</p>
              </div>
              <div className="footer-links">
                <button className="footer-link" onClick={() => setPage("about")}>Über uns</button>
                <button className="footer-link" onClick={() => setPage("pricing")}>Preise</button>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Deutschland Tour. Open Source &amp; kostenlos.</p>
            </div>
          </footer>
        </div>
      )}

      {/* === PRICING PAGE === */}
      {page === "pricing" && (
        <div className="page-pricing">
          <PricingSection
            onStartFreeTour={() => startTour("berlin-classic")}
            standalone
          />
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-brand">
                <span className="footer-logo">🇩🇪 Deutschland Tour</span>
                <p className="footer-text">Self-Guided Walking Tours – Geschichte erleben, Schritt für Schritt.</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Deutschland Tour. Open Source &amp; kostenlos.</p>
            </div>
          </footer>
        </div>
      )}

      {/* === ABOUT PAGE === */}
      {page === "about" && (
        <div className="about-page">
          <h1>Über Deutschland Tour</h1>
          <p>
            Deutschland Tour ist ein Open-Source-Projekt für selbstgeführte
            Audio-Walking-Touren durch deutsche Städte. Keine Werbung, kein
            Tracking, keine versteckten Kosten – einfach reines Kulturerlebnis.
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
          <h2>Technologie</h2>
          <ul>
            <li>React + TypeScript Frontend (Vite)</li>
            <li>Express + PostgreSQL Backend</li>
            <li>MinIO für Audio-Dateien</li>
            <li>Edge-TTS für Sprachausgabe</li>
            <li>Leaflet + OpenStreetMap Karten</li>
          </ul>
        </div>
      )}

      {/* === CUSTOM ROUTES PAGE === */}
      {page === "custom" && !showEditor && (
        <CustomRoutesPage
          onStartCustomTour={(routeId) => startTour(routeId)}
          onNewRoute={() => setShowEditor(true)}
        />
      )}

      {/* === CUSTOM ROUTE EDITOR === */}
      {page === "custom" && showEditor && (
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <RouteEditor
            onSave={() => setShowEditor(false)}
            onCancel={() => setShowEditor(false)}
          />
        </div>
      )}

      {/* === TOUR VIEW === */}
      {page === "tour" && selectedRoute && (
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
            onBack={() => setPage("home")}
            virtual={virtualMode}
          />
        </Suspense>
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
