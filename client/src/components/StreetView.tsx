import { useEffect, useRef } from "react";

interface StreetViewProps {
  lat: number;
  lng: number;
  name: string;
}

export default function StreetView({ lat, lng, name }: StreetViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const token = import.meta.env.VITE_MAPILLARY_TOKEN || "";

  useEffect(() => {
    if (!token || !containerRef.current) return;

    // Load Mapillary CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/mapillary-js@4.1/dist/mapillary.css";
    document.head.appendChild(link);

    // Load Mapillary JS library
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mapillary-js@4.1/dist/mapillary.js";
    script.onload = () => {
      if (!containerRef.current || viewerRef.current) return;
      try {
        const Viewer = (window as any).mapillary.Viewer;
        const viewer = new Viewer({
          accessToken: token,
          container: containerRef.current,
          closeTo: { lat, lng },
        });
        viewerRef.current = viewer;
      } catch (e) {
        console.warn("Mapillary viewer error:", e);
        // Show error in UI
        const el = containerRef.current;
        if (el) {
          el.innerHTML = `<div style="height:200px;display:flex;align-items:center;justify-content:center;text-align:center;color:var(--color-text-muted);font-size:0.85rem;border:1px dashed var(--color-border);border-radius:12px">
            🌍 Street View nicht verfügbar<br/>
            <span style="font-size:0.75rem">Kein Panorama-Bild an dieser Position</span>
          </div>`;
        }
      }
    };
    script.onerror = () => {
      const el = containerRef.current;
      if (el) {
        el.innerHTML = `<div style="height:200px;display:flex;align-items:center;justify-content:center;text-align:center;color:var(--color-text-muted);font-size:0.85rem;border:1px dashed var(--color-border);border-radius:12px">
          📷 Street View Bibliothek konnte nicht geladen werden
        </div>`;
      }
    };
    document.head.appendChild(script);

    return () => {
      if (viewerRef.current) {
        viewerRef.current.remove();
        viewerRef.current = null;
      }
      link.remove();
      script.remove();
    };
  }, [lat, lng, token]);

  if (!token) {
    return (
      <div className="street-view street-view--missing">
        <div className="street-view-header">📷 Street View – {name}</div>
        <div className="street-view-placeholder" style={{ height: "200px" }}>
          <p>🌍 Kein Mapillary-Token konfiguriert</p>
          <p className="street-view-hint">
            Setze <code>VITE_MAPILLARY_TOKEN</code> in der <code>.env</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="street-view">
      <div className="street-view-header">📷 Street View – {name}</div>
      <div ref={containerRef} className="street-view-container" />
      <p className="street-view-note">🖱️ Ziehen zum umschauen • Mapillary</p>
    </div>
  );
}
