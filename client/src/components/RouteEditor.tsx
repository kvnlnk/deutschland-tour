import { useState, useRef, useEffect, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCustomRoutes, CustomPOI } from "../hooks/useCustomRoutes";

interface RouteEditorProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function RouteEditor({ onSave, onCancel }: RouteEditorProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [pois, setPois] = useState<CustomPOI[]>([]);
  const [editingPoi, setEditingPoi] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [poiName, setPoiName] = useState("");
  const [poiDesc, setPoiDesc] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const { addRoute } = useCustomRoutes();

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current, {
      center: [51.5, 10.5],
      zoom: 6,
      zoomControl: true,
      attributionControl: false,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setEditingPoi({ lat, lng });
      setPoiName("");
      setPoiDesc("");
    });

    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when POIs change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    pois.forEach((poi, i) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:28px;height:28px;background:#d4a853;border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#0f2b3d;font-size:11px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${
          i + 1
        }</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      const marker = L.marker([poi.lat, poi.lng], { icon }).addTo(map);
      marker.bindTooltip(poi.name, { direction: "top" });
      marker.on("click", () => {
        setEditingPoi({ lat: poi.lat, lng: poi.lng });
        setPoiName(poi.name);
        setPoiDesc(poi.description);
      });
      markersRef.current.push(marker);
    });
  }, [pois]);

  const addPoi = useCallback(() => {
    if (!editingPoi || !poiName.trim()) return;
    const newPoi: CustomPOI = {
      id: `poi-${Date.now()}`,
      name: poiName.trim(),
      description: poiDesc.trim(),
      lat: editingPoi.lat,
      lng: editingPoi.lng,
      order: pois.length + 1,
    };
    setPois((prev) => [...prev, newPoi]);
    setEditingPoi(null);
    setPoiName("");
    setPoiDesc("");
  }, [editingPoi, poiName, poiDesc, pois]);

  const removePoi = useCallback((id: string) => {
    setPois((prev) =>
      prev.filter((p) => p.id !== id).map((p, i) => ({ ...p, order: i + 1 }))
    );
  }, []);

  const handleSave = () => {
    if (!name.trim() || pois.length < 2) return;
    addRoute({
      name: name.trim(),
      city: city.trim() || "Eigene Route",
      description: description.trim(),
      pois,
    });
    onSave();
  };

  return (
    <div className="route-editor">
      <div className="route-editor-form">
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            marginBottom: "1rem",
          }}
        >
          Neue Route erstellen
        </h2>
        <input
          className="search-input"
          placeholder="Routenname *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "0.5rem", width: "100%" }}
        />
        <input
          className="search-input"
          placeholder="Stadt"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginBottom: "0.5rem", width: "100%" }}
        />
        <textarea
          className="review-textarea"
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: "1rem", width: "100%" }}
          rows={2}
        />
      </div>

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "300px",
          borderRadius: "8px",
          marginBottom: "0.75rem",
        }}
      />
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--color-text-muted)",
          marginBottom: "0.75rem",
        }}
      >
        👆 Klicke auf die Karte, um eine Station zu setzen
      </p>

      {editingPoi && (
        <div className="poi-edit-form" style={{ marginBottom: "0.75rem" }}>
          <input
            className="search-input"
            placeholder="Name der Station *"
            value={poiName}
            onChange={(e) => setPoiName(e.target.value)}
            style={{ marginBottom: "0.3rem", width: "100%" }}
          />
          <textarea
            className="review-textarea"
            placeholder="Beschreibung"
            value={poiDesc}
            onChange={(e) => setPoiDesc(e.target.value)}
            style={{ marginBottom: "0.3rem", width: "100%" }}
            rows={2}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="btn btn-primary"
              onClick={addPoi}
              disabled={!poiName.trim()}
              style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
            >
              + Station hinzufügen
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditingPoi(null)}
              style={{
                fontSize: "0.8rem",
                padding: "0.5rem 1rem",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* POI-Liste */}
      <div style={{ marginBottom: "1rem" }}>
        {pois.length === 0 && (
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              textAlign: "center",
            }}
          >
            Noch keine Stationen
          </p>
        )}
        {pois.map((poi, i) => (
          <div
            key={poi.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.5rem",
              background: "var(--color-bg)",
              borderRadius: "8px",
              marginBottom: "0.3rem",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "var(--color-accent)",
                minWidth: "24px",
              }}
            >
              {i + 1}.
            </span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "0.85rem" }}>{poi.name}</strong>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                  marginLeft: "0.5rem",
                }}
              >
                {poi.lat.toFixed(4)}, {poi.lng.toFixed(4)}
              </span>
            </div>
            <button
              onClick={() => removePoi(poi.id)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-error)",
                cursor: "pointer",
                fontSize: "1rem",
                padding: "0.25rem",
              }}
              title="Entfernen"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={!name.trim() || pois.length < 2}
          style={{ flex: 1, justifyContent: "center" }}
        >
          💾 Route speichern ({pois.length} Stationen)
        </button>
        <button
          className="btn btn-secondary"
          onClick={onCancel}
          style={{
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
          }}
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
