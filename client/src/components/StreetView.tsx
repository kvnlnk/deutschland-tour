import { useEffect, useRef } from "react";

interface StreetViewProps {
  lat: number;
  lng: number;
  name: string;
}

// Get a free token at https://www.mapillary.com/dashboard/developers
const MAPILLARY_TOKEN = "MLY|27445116845148820|927edcad8f9e706d5c0330683746bc81";

export default function StreetView({ lat, lng, name }: StreetViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!MAPILLARY_TOKEN || !containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/mapillary-js@4.1/dist/mapillary.js";
    script.onload = () => {
      if (!containerRef.current) return;
      const { Viewer } = (window as any).mapillary;
      try {
        const viewer = new Viewer({
          accessToken: MAPILLARY_TOKEN,
          container: containerRef.current,
          closeTo: { lat, lng },
        });
        viewerRef.current = viewer;
      } catch (e) {
        console.warn("Mapillary viewer error:", e);
      }
    };
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapillary-js@4.1/dist/mapillary.css";
    document.head.appendChild(link);

    return () => {
      if (viewerRef.current) {
        viewerRef.current.remove();
        viewerRef.current = null;
      }
      script.remove();
      link.remove();
    };
  }, [lat, lng, MAPILLARY_TOKEN]);

  if (!MAPILLARY_TOKEN) {
    return (
      <div className="street-view street-view--missing">
        <div className="street-view-header">
          📷 Street View – {name}
        </div>
        <div className="street-view-placeholder">
          <p>🌍 Street View kommt später</p>
          <p className="street-view-hint">
            Hol dir einen kostenlosen Mapillary-Token auf<br />
            <a href="https://www.mapillary.com/dashboard/developers" target="_blank" rel="noopener noreferrer">
              mapillary.com/dashboard/developers
            </a>
            <br />und setze <code>window.__MAPILLARY_TOKEN__</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="street-view">
      <div className="street-view-header">
        📷 Street View – {name}
      </div>
      <div ref={containerRef} className="street-view-container" />
      <p className="street-view-note">🖱️ Ziehen zum umschauen • Mapillary</p>
    </div>
  );
}
