import { useEffect, useRef } from "react";

interface StreetViewProps {
  lat: number;
  lng: number;
  name: string;
}

// Get a free token at https://www.mapillary.com/dashboard/developers
// Then set window.__MAPILLARY_TOKEN__ in index.html or via env

export default function StreetView({ lat, lng, name }: StreetViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const token = (typeof window !== "undefined")
    ? (window as any).__MAPILLARY_TOKEN__
    : null;

  useEffect(() => {
    if (!token || !containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/mapillary-js@4.1/dist/mapillary.js";
    script.onload = () => {
      if (!containerRef.current) return;
      const { Viewer } = (window as any).mapillary;
      try {
        const viewer = new Viewer({
          accessToken: token,
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
  }, [lat, lng, token]);

  if (!token) {
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
