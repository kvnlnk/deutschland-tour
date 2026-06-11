import { useState, useMemo, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCustomRoutes, type CustomPOI } from "../hooks/useCustomRoutes";
import { FALLBACK_ROUTES } from "../data";
import type { POI } from "../types";

type PickPoi = Pick<POI, "id" | "name" | "nameEn" | "lat" | "lng" | "description" | "descriptionEn">;

function toCustomPoi(p: PickPoi, order: number): CustomPOI {
  return { id: p.id, name: p.name, description: p.description, lat: p.lat, lng: p.lng, order };
}

// Group POIs by city
const POI_CITIES = (() => {
  const map = new Map<string, PickPoi[]>();
  for (const route of FALLBACK_ROUTES) {
    const list = map.get(route.city) || [];
    for (const p of route.pois) {
      list.push({ id: p.id, name: p.name, nameEn: p.nameEn, lat: p.lat, lng: p.lng, description: p.description, descriptionEn: p.descriptionEn });
    }
    map.set(route.city, list);
  }
  return Array.from(map.entries()).map(([city, pois]) => ({ city, pois }));
})();

export default function POIPicker() {
  const [selectedPois, setSelectedPois] = useState<CustomPOI[]>([]);
  const [activeCity, setActiveCity] = useState<string>(POI_CITIES[0]?.city || "");
  const [routeName, setRouteName] = useState("");
  const [saved, setSaved] = useState(false);
  const { addRoute } = useCustomRoutes();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const currentPois = useMemo(
    () => POI_CITIES.find((c) => c.city === activeCity)?.pois || [],
    [activeCity]
  );

  const selectedIds = useMemo(() => new Set(selectedPois.map((p) => p.id)), [selectedPois]);

  const togglePoi = (poi: PickPoi) => {
    setSelectedPois((prev) => {
      if (prev.find((p) => p.id === poi.id)) {
        const next = prev.filter((p) => p.id !== poi.id);
        return next.map((p, i) => ({ ...p, order: i + 1 }));
      }
      return [...prev, toCustomPoi(poi, prev.length + 1)];
    });
    setSaved(false);
  };

  const removePoi = (id: string) => {
    setSelectedPois((prev) =>
      prev.filter((p) => p.id !== id).map((p, i) => ({ ...p, order: i + 1 }))
    );
    setSaved(false);
  };

  const clearAll = () => {
    setSelectedPois([]);
    setSaved(false);
  };

  const saveRoute = () => {
    if (selectedPois.length < 2 || !routeName.trim()) return;
    const cities = [...new Set(selectedPois.map((p => {
      for (const c of POI_CITIES) {
        if (c.pois.find(pp => pp.id === p.id)) return c.city;
      }
      return "";
    })))].filter(Boolean);
    
    addRoute({
      name: routeName.trim(),
      city: cities.join(", ") || "Eigene Route",
      description: `${selectedPois.length} Stationen · Selbst zusammengestellt`,
      pois: selectedPois,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, {
      center: [51.5, 10.5],
      zoom: 6,
      zoomControl: true,
      attributionControl: false,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);
    mapInstance.current = map;
    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  // Update markers + polyline
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (polylineRef.current) { polylineRef.current.remove(); polylineRef.current = null; }

    if (selectedPois.length === 0) return;

    const latlngs: L.LatLngExpression[] = [];
    selectedPois.forEach((poi, i) => {
      latlngs.push([poi.lat, poi.lng]);
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:28px;height:28px;background:#d4a853;border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#0f2b3d;font-size:11px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${i + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      const marker = L.marker([poi.lat, poi.lng], { icon }).addTo(map);
      marker.bindTooltip(poi.name, { direction: "top" });
      markersRef.current.push(marker);
    });

    polylineRef.current = L.polyline(latlngs, {
      color: "#d4a853",
      weight: 3,
      opacity: 0.7,
    }).addTo(map);

    map.fitBounds(L.latLngBounds(latlngs).pad(0.3));
  }, [selectedPois]);

  return (
    <div className="bk-page">
      <div className="bk-header">
        <h1 className="bk-title">🧩 Route bauen</h1>
        <p className="bk-sub">Wähl Orte aus → Route mit Karte → speichern & nutzen</p>
      </div>

      {/* City tabs */}
      <div className="bk-tabs">
        {POI_CITIES.map((c) => (
          <button
            key={c.city}
            className={`bk-tab ${activeCity === c.city ? "bk-tab--active" : ""}`}
            onClick={() => setActiveCity(c.city)}
          >
            📍 {c.city} <span className="bk-tab-count">{c.pois.length}</span>
          </button>
        ))}
      </div>

      {/* POI list */}
      <div className="bk-section">
        <div className="bk-poi-list">
          {currentPois.map((poi) => {
            const sel = selectedIds.has(poi.id);
            return (
              <div
                key={poi.id}
                className={`bk-poi ${sel ? "bk-poi--sel" : ""}`}
                onClick={() => togglePoi(poi)}
              >
                <div className="bk-poi-left">
                  <span className="bk-poi-name">{poi.name}</span>
                </div>
                <div className="bk-poi-coords">
                  {poi.lat.toFixed(3)}, {poi.lng.toFixed(3)}
                </div>
                {sel && <span className="bk-poi-check">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="bk-section">
        <div className="bk-map" ref={mapRef} />
        {selectedPois.length === 0 && (
          <p className="bk-map-hint">👆 Wähl POIs oben aus — sie erscheinen hier auf der Karte</p>
        )}
      </div>

      {/* Selected list + save */}
      {selectedPois.length > 0 && (
        <div className="bk-section">
          <div className="bk-sel-header">
            <span className="bk-sel-title">Deine Route ({selectedPois.length})</span>
            <button className="bk-clear-link" onClick={clearAll}>Alle löschen</button>
          </div>
          <div className="bk-sel-list">
            {selectedPois.map((p, i) => (
              <div key={p.id} className="bk-sel-item">
                <span className="bk-sel-num">{i + 1}</span>
                <span className="bk-sel-name">{p.name}</span>
                <button className="bk-sel-rm" onClick={() => removePoi(p.id)}>✕</button>
              </div>
            ))}
          </div>
          <div className="bk-save-row">
            <input
              className="bk-name-input"
              placeholder="Routenname (z.B. Meine Berlin-Tour)"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
            />
            <button
              className="bk-save-btn"
              disabled={selectedPois.length < 2 || !routeName.trim()}
              onClick={saveRoute}
            >
              {saved ? "✅ Gespeichert!" : "💾 Als Route speichern"}
            </button>
          </div>
          <p className="bk-hint">Erscheint dann in <strong>Meine Touren</strong> → dort starten (GPS oder Virtuell)</p>
        </div>
      )}

      {selectedPois.length > 0 && selectedPois.length < 2 && (
        <p className="bk-hint" style={{ textAlign: "center", marginTop: "0.5rem" }}>
          Wähl mindestens 2 Stationen, um eine Route zu speichern
        </p>
      )}
    </div>
  );
}
