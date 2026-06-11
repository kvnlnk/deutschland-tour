import { usePurchase } from "../hooks/usePurchase";
import { PRICING } from "../data";

interface PricingSectionProps {
  onStartFreeTour: () => void;
  standalone?: boolean;
}

export default function PricingSection({ onStartFreeTour, standalone }: PricingSectionProps) {
  const { purchaseTour, purchaseBundle, loading, hasAccess, purchasedTours } = usePurchase();

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(2)}`;

  return (
    <section className="pricing" id="pricing">
      <div className="pricing-content">
        <h2 className="section-title">Wähle dein Erlebnis</h2>
        <p className="section-subtitle">
          Berlin ist kostenlos. München und Hamburg einzeln oder im Bundle.
        </p>

        {purchasedTours.has("all-access") && (
          <div className="pricing-all-access-badge">
            🎉 All Access aktiv – alle Touren freigeschaltet!
          </div>
        )}

        <div className="pricing-grid">
          {/* Free Tier */}
          <div className="pricing-card pricing-card--featured">
            <div className="pricing-badge">KOSTENLOS</div>
            <div className="pricing-header">
              <h3 className="pricing-name">Berlin</h3>
              <div className="pricing-price">
                <span className="pricing-amount">€0</span>
              </div>
              <p className="pricing-desc">
                Historischer Rundgang – 9 Stationen, 4,2 km.
              </p>
            </div>
            <ul className="pricing-features">
              <li className="pricing-feature">✓ 9 Audio-Stationen (DE/EN)</li>
              <li className="pricing-feature">✓ GPS-gesteuerte Wiedergabe</li>
              <li className="pricing-feature">✓ Interaktive Karte</li>
              <li className="pricing-feature">✓ Keine Registrierung</li>
            </ul>
            <button className="btn btn-primary pricing-btn" onClick={onStartFreeTour}>
              Kostenlos starten
            </button>
          </div>

          {/* München */}
          <PricingCard
            city="München"
            routeId="muenchen-altstadt"
            priceCents={PRICING.singleTour}
            description="Bayerische Geschichte &amp; Bierkultur – 9 Stationen."
            features={[
              "9 Audio-Stationen (DE/EN)",
              "GPS-gesteuerte Wiedergabe",
              "Marienplatz bis Pinakotheken",
              "Alle zukünftigen Updates",
            ]}
            onPurchase={purchaseTour}
            hasAccess={hasAccess("muenchen-altstadt")}
            loading={loading}
          />

          {/* Hamburg */}
          <PricingCard
            city="Hamburg"
            routeId="hamburg-hafen"
            priceCents={PRICING.singleTour}
            description="Hafen &amp; hanseatische Geschichte – 9 Stationen."
            features={[
              "9 Audio-Stationen (DE/EN)",
              "GPS-gesteuerte Wiedergabe",
              "Speicherstadt bis HafenCity",
              "Alle zukünftigen Updates",
            ]}
            onPurchase={purchaseTour}
            hasAccess={hasAccess("hamburg-hafen")}
            loading={loading}
          />
        </div>

        {/* Bundle Options */}
        <div className="pricing-bundles">
          <h3 className="pricing-bundles-title">Paket-Angebote</h3>

          <div className="pricing-bundles-grid">
            {/* City Bundle */}
            <div
              className={`pricing-bundle-card ${purchasedTours.has("city-bundle") ? "pricing-bundle-card--owned" : ""}`}
            >
              <div className="pricing-bundle-label">BELIEBT</div>
              <div className="pricing-bundle-inner">
                <h4>Städte-Bundle</h4>
                <p className="pricing-bundle-desc">
                  Alle Touren einer Stadt zum Vorzugspreis.
                </p>
                <div className="pricing-bundle-price">{formatPrice(PRICING.cityBundle)}</div>
                {purchasedTours.has("city-bundle") ? (
                  <div className="pricing-owned-badge">✓ Besitzt du</div>
                ) : (
                  <button
                    className="btn btn-primary pricing-btn"
                    onClick={() => purchaseBundle("city-bundle")}
                    disabled={loading}
                  >
                    Bundle sichern
                  </button>
                )}
              </div>
            </div>

            {/* All Access */}
            <div
              className={`pricing-bundle-card pricing-bundle-card--premium ${purchasedTours.has("all-access") ? "pricing-bundle-card--owned" : ""}`}
            >
              <div className="pricing-bundle-label">BESTER WERT</div>
              <div className="pricing-bundle-inner">
                <h4>All Access</h4>
                <p className="pricing-bundle-desc">
                  Alle Touren – jetzt und in Zukunft. Für immer.
                </p>
                <div className="pricing-bundle-price">{formatPrice(PRICING.allAccess)}</div>
                {purchasedTours.has("all-access") ? (
                  <div className="pricing-owned-badge pricing-owned-badge--light">✓ Aktiv</div>
                ) : (
                  <button
                    className="btn btn-primary pricing-btn"
                    onClick={() => purchaseBundle("all-access")}
                    disabled={loading}
                  >
                    Alle freischalten
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="pricing-note">
          🔒 Sichere Zahlung per Stripe. Keine versteckten Kosten.
        </p>
      </div>
    </section>
  );
}

interface PricingCardProps {
  city: string;
  routeId: string;
  priceCents: number;
  description: string;
  features: string[];
  onPurchase: (routeId: string) => void;
  hasAccess: boolean;
  loading: boolean;
}

function PricingCard({
  city,
  routeId,
  priceCents,
  description,
  features,
  onPurchase,
  hasAccess,
  loading,
}: PricingCardProps) {
  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(2)}`;

  return (
    <div className={`pricing-card ${hasAccess ? "pricing-card--owned" : ""}`}>
      <div className="pricing-header">
        <h3 className="pricing-name">{city}</h3>
        <div className="pricing-price">
          <span className="pricing-amount">{formatPrice(priceCents)}</span>
        </div>
        <p className="pricing-desc">{description}</p>
      </div>
      <ul className="pricing-features">
        {features.map((f) => (
          <li key={f} className="pricing-feature">✓ {f}</li>
        ))}
      </ul>
      {hasAccess ? (
        <div className="pricing-owned-badge">✓ Bereits gekauft</div>
      ) : (
        <button
          className="btn btn-accent pricing-btn"
          onClick={() => onPurchase(routeId)}
          disabled={loading}
        >
          {loading ? "Wird geöffnet..." : "Jetzt kaufen"}
        </button>
      )}
    </div>
  );
}
