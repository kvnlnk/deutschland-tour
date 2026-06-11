import { useCustomRoutes } from "../hooks/useCustomRoutes";

interface CustomRoutesPageProps {
  onStartCustomTour: (routeId: string) => void;
  onNewRoute: () => void;
}

export default function CustomRoutesPage({
  onStartCustomTour,
  onNewRoute,
}: CustomRoutesPageProps) {
  const { routes, deleteRoute } = useCustomRoutes();

  return (
    <div
      style={{
        maxWidth: "var(--max-width)",
        margin: "0 auto",
        padding: "2rem 1.5rem",
      }}
    >
      {/* Work in Progress Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.05))",
          border: "1px solid var(--color-accent)",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>🚧</span>
        <div>
          <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.15rem" }}>
            Work in Progress
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
            Routeneditor und Starten-Funktion sind noch in Entwicklung. In Kürze verfügbar.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            color: "var(--color-primary)",
          }}
        >
          🗺️ Meine Touren
        </h2>
        <button className="btn btn-primary" onClick={onNewRoute}>
          + Neue Route
        </button>
      </div>

      {routes.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            color: "var(--color-text-muted)",
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🗺️</p>
          <p>Du hast noch keine eigenen Touren erstellt.</p>
          <button
            className="btn btn-primary"
            onClick={onNewRoute}
            style={{ marginTop: "1rem" }}
          >
            Erste Route erstellen
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {routes.map((route) => (
            <div
              key={route.id}
              style={{
                background: "var(--color-bg-alt)",
                borderRadius: "12px",
                padding: "1.25rem",
                border: "1px solid var(--color-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--color-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {route.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  📍 {route.city} · {route.pois.length} Stationen ·{" "}
                  {new Date(route.createdAt).toLocaleDateString("de-DE")}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => onStartCustomTour(route.id)}
                  style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
                >
                  Starten
                </button>
                <button
                  onClick={() => deleteRoute(route.id)}
                  style={{
                    background: "none",
                    border: "1px solid var(--color-error)",
                    color: "var(--color-error)",
                    borderRadius: "8px",
                    padding: "0.5rem 0.75rem",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
