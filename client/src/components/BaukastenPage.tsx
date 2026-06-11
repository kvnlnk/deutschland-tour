import { useState, useMemo } from "react";
import { useBaukasten, type BaukastenModul } from "../hooks/useBaukasten";

const ICONS: Record<string, string> = {
  stadt: "🏙️",
  natur: "🌲",
  kultur: "🏰",
  kulinarik: "🍺",
  party: "🎪",
  abenteuer: "🧗",
  relax: "🛀",
  unique: "✨",
};

const CAT_LABELS: Record<string, string> = {
  stadt: "Stadt",
  natur: "Natur",
  kultur: "Kultur",
  kulinarik: "Kulinarik",
  party: "Party",
  abenteuer: "Abenteuer",
  relax: "Relax",
  unique: "Unique",
};

const ALL_MODULES: BaukastenModul[] = [
  // === STÄDTE ===
  { id: "hamburg", title: "Hamburg", cat: "stadt", location: "Norden", desc: "Hafenstadt mit Elbphilharmonie, Speicherstadt, Szenevierteln und Nachtleben.", highlights: ["Elbphilharmonie", "Miniatur Wunderland", "Schanzenviertel", "St. Pauli"], time: "2 Tage", best: "Mai–September", emoji: "🏙️" },
  { id: "berlin", title: "Berlin", cat: "stadt", location: "Osten", desc: "Historisch, kreativ, chaotisch — Clubkultur, Street Art, Weltgeschichte.", highlights: ["East Side Gallery", "Reichstag", "RAW-Gelände", "Markthalle Neun"], time: "2–3 Tage", best: "ganzjährig", emoji: "🏙️" },
  { id: "leipzig", title: "Leipzig", cat: "stadt", location: "Osten", desc: "Unterschätzte Szene-Stadt. Industrie-Chic, Kunst, Kanäle — aufstrebend.", highlights: ["Plagwitz", "Völkerschlachtdenkmal", "Karl-Heine-Kanal", "Auenwald"], time: "1–2 Tage", best: "Frühling–Herbst", emoji: "🏙️" },
  { id: "dresden", title: "Dresden", cat: "stadt", location: "Osten", desc: "Barocke Schönheit, Elbflorenz — Frauenkirche, Zwinger, Neustadt-Szene.", highlights: ["Frauenkirche", "Zwinger", "Neustadt", "Brühlsche Terrasse"], time: "1–2 Tage", best: "ganzjährig", emoji: "🏙️" },
  { id: "muenchen", title: "München", cat: "stadt", location: "Süden", desc: "Biergärten, Kunst, Alpenblick — Isar-Floßfahrt im Sommer!", highlights: ["Englischer Garten", "Isar-Floßfahrt", "Viktualienmarkt", "Pinakotheken"], time: "2 Tage", best: "Mai–Oktober", emoji: "🏙️" },
  { id: "koeln", title: "Köln", cat: "stadt", location: "Westen", desc: "Domstadt mit Rheinufer, Brauhaus-Kultur und belgischem Viertel.", highlights: ["Kölner Dom", "Rheinauen", "Belgisches Viertel", "Brauhäuser"], time: "1–2 Tage", best: "ganzjährig", emoji: "🏙️" },
  { id: "bamberg", title: "Bamberg", cat: ["stadt", "kulinarik"], location: "Franken", desc: "UNESCO-Altstadt, 11 Brauereien — das Rauchbier ist legendär.", highlights: ["Rauchbier", "Klein-Venedig", "Dom", "Brauereigasthöfe"], time: "1 Tag", best: "ganzjährig", emoji: "🏘️" },
  // === NATUR ===
  { id: "saechsische_schweiz", title: "Sächsische Schweiz", cat: "natur", location: "Osten", desc: "Elbsandsteingebirge — Felsen, Schluchten, der Malerweg. Wie eine andere Welt.", highlights: ["Basteibrücke", "Malerweg", "Schrammsteine", "Festung Königstein"], time: "2–3 Tage", best: "April–Oktober", emoji: "🌲" },
  { id: "schwarzwald", title: "Schwarzwald", cat: "natur", location: "Südwesten", desc: "Mittelgebirge mit dichten Wäldern, Wasserfällen und Kuckucksuhren.", highlights: ["Triberger Wasserfälle", "Schluchsee", "Feldberg", "Mummelsee"], time: "2 Tage", best: "Mai–Oktober", emoji: "🌲" },
  { id: "berchtesgaden", title: "Berchtesgaden & Königssee", cat: "natur", location: "Süden", desc: "Türkisblauer See eingekesselt von Bergen — Norwegen-Feeling in DE.", highlights: ["Königssee", "St. Bartholomä", "Jennerbahn", "Eagle's Nest"], time: "1–2 Tage", best: "Mai–September", emoji: "🌲" },
  { id: "mecklenburg", title: "Mecklenburgische Seenplatte", cat: "natur", location: "Norden", desc: "500+ Seen, Kanu, Stille. Dschungel-Kahn-Feeling mitten in Deutschland.", highlights: ["Kanutouren", "Müritz", "Hausboot", "Feldberger Seenlandschaft"], time: "2–4 Tage", best: "Mai–September", emoji: "🌲" },
  { id: "spreewald", title: "Spreewald", cat: ["natur", "abenteuer"], location: "Osten", desc: "Kahnfahren durch verträumte Fließgewässer, Gurken und Biosphärenreservat.", highlights: ["Kahnfahrt", "Spreewaldgurken", "Biosphärenreservat", "Lübbenau"], time: "1–2 Tage", best: "Mai–September", emoji: "🌿" },
  { id: "ruegen", title: "Rügen & Kreidefelsen", cat: "natur", location: "Norden (Ostsee)", desc: "Nationalpark Jasmund, weiße Kreidefelsen, Ostsee-Feeling pur.", highlights: ["Königsstuhl", "Nationalpark Jasmund", "Binz", "Kap Arkona"], time: "2 Tage", best: "Mai–September", emoji: "🌲" },
  { id: "zugspitze", title: "Zugspitze & Garmisch", cat: "natur", location: "Süden", desc: "Deutschlands höchster Berg. Eibsee (türkis!), Partnachklamm.", highlights: ["Zugspitze", "Eibsee", "Partnachklamm", "Zahnradbahn"], time: "1 Tag", best: "Mai–Oktober", emoji: "🏔️" },
  // === KULTUR ===
  { id: "neuschwanstein", title: "Schloss Neuschwanstein", cat: "kultur", location: "Bayern", desc: "Das Märchenschloss. Disney-Vorlage. Tickets vorher buchen!", highlights: ["Schlossführung", "Marienbrücke", "Alpsee", "Hohenschwangau"], time: "1 Tag", best: "ganzjährig", emoji: "🏰" },
  { id: "romantische_strasse", title: "Romantische Straße", cat: "kultur", location: "Franken→Bayern", desc: "Würzburg → Füssen. Mittelalter-Städtchen, Weinberge, Schlösser.", highlights: ["Rothenburg o.d.T.", "Würzburg Residenz", "Dinkelsbühl", "Nördlingen"], time: "2–3 Tage", best: "April–Oktober", emoji: "🏰" },
  { id: "rheinromantik", title: "Rheinromantik", cat: "kultur", location: "Westen", desc: "Köln → Mainz: Burgen, Loreley, Weinberge und die schönste Flusslandschaft.", highlights: ["Loreley", "Marksburg", "Deutsches Eck", "Bacharach"], time: "2 Tage", best: "Mai–Oktober", emoji: "🏰" },
  { id: "heidelberg", title: "Heidelberg", cat: "kultur", location: "Südwesten", desc: "Romantischste Altstadt Deutschlands, Schloss, Philosophenweg.", highlights: ["Heidelberger Schloss", "Altstadt", "Philosophenweg", "Alte Brücke"], time: "1 Tag", best: "ganzjährig", emoji: "🏰" },
  // === KULINARIK ===
  { id: "weinstrasse", title: "Deutsche Weinstraße", cat: "kulinarik", location: "Pfalz", desc: "85km Weinparadies. Riesling, Winzerdörfer, Pfälzer Küche.", highlights: ["Neustadt", "Riesling pur", "Wandern durch Weinberge", "Dürkheimer Wurstmarkt"], time: "1–2 Tage", best: "September–Oktober", emoji: "🍷" },
  { id: "bierkultur", title: "Bierkultur-Tour", cat: "kulinarik", location: "Westen/Franken", desc: "Kölsch in Köln, Alt in Düsseldorf, Rauchbier in Bamberg — Brauereien satt.", highlights: ["Kölner Brauhäuser", "Bamberger Rauchbier", "Düsseldorf Altstadt", "Brauereibesichtigungen"], time: "2 Tage", best: "ganzjährig", emoji: "🍺" },
  { id: "bodensee", title: "Bodensee & Wein", cat: ["kulinarik", "relax"], location: "Südwesten", desc: "Alpenpanorama, See, Insel Mainau, Obstler & Wein vom Bodensee.", highlights: ["Insel Mainau", "Lindau", "Meersburg", "Seehasen"], time: "2 Tage", best: "Mai–September", emoji: "🍷" },
  // === ABENTEUER ===
  { id: "nationalpark_eifel", title: "Nationalpark Eifel", cat: "abenteuer", location: "Westen", desc: "85km Wildnis-Trail, Kletterwald, Stauseen — Deutschlands Wilder Westen.", highlights: ["Wildnis-Trail", "Kletterwald", "Rurseeregion", "NS-Ordensburg Vogelsang"], time: "1–2 Tage", best: "Mai–Oktober", emoji: "🧗" },
  { id: "harz", title: "Harz & Brocken", cat: "abenteuer", location: "Zentrum", desc: "Brocken-Besteigung, Dampflok, Moore, Klippen — deutscher Mittelgebirgs-Klassiker.", highlights: ["Brocken", "Dampflok", "Wollgrasmoore", "Schnarcherklippen"], time: "1–2 Tage", best: "Mai–Oktober", emoji: "🧗" },
  // === PARTY ===
  { id: "berlin_clubs", title: "Berliner Clubkultur", cat: "party", location: "Berlin", desc: "Berghain, ://about blank, Sisyphos, RSO — Hauptstadt der elektronischen Musik.", highlights: ["Berghain", "://about blank", "Sisyphos", "KitKat"], time: "1–3 Nächte", best: "ganzjährig", emoji: "🎪" },
  { id: "hurricane", title: "Hurricane / Southside", cat: "party", location: "Norden/Süden", desc: "Parallel-Festivals — Juni 2026. Live-Musik, Camping, Open Air.", highlights: ["Live-Musik", "Camping", "Open Air", "Line-Up"], time: "Wochenende", best: "Juni 2026", emoji: "🎪" },
  { id: "leipzig_nachtleben", title: "Leipzig Nachtleben", cat: "party", location: "Leipzig", desc: "Ilses Erika, Elipamanoke, distillery — Leipzigs Clubszene ist massiv unterschätzt.", highlights: ["Ilses Erika", "Elipamanoke", "distillery", "UT Connewitz"], time: "1–2 Nächte", best: "ganzjährig", emoji: "🎪" },
  // === RELAX ===
  { id: "baden_baden", title: "Baden-Baden Thermen", cat: "relax", location: "Südwesten", desc: "Caracalla-Therme, Friedrichsbad — römisches Bade-Erlebnis im Schwarzwald.", highlights: ["Caracalla-Therme", "Friedrichsbad", "Lichtentaler Allee", "Kurhaus"], time: "1 Tag", best: "ganzjährig", emoji: "🛀" },
  { id: "ostsee_strand", title: "Ostsee-Strände", cat: "relax", location: "Norden", desc: "Timmendorf, Boltenhagen, Usedom — feine Sandstrände ohne Nordsee-Wind.", highlights: ["Timmendorf", "Usedom", "Boltenhagen", "Fahrrad an der Küste"], time: "1–2 Tage", best: "Juni–August", emoji: "🛀" },
  // === UNIQUE ===
  { id: "miniatur_wunderland", title: "Miniatur Wunderland", cat: "unique", location: "Hamburg", desc: "Größte Modelleisenbahn der Welt. Knapp 10.000 m², unglaubliche Details.", highlights: ["Knuffingen Airport", "Alle Kontinente", "Tag-Nacht-Zyklus", "Lichtshow"], time: "3–4 Std.", best: "vorher buchen!", emoji: "✨" },
  { id: "baumhaus_hotel", title: "Baumhaushotel Allgäu", cat: "unique", location: "Allgäu", desc: "In Baumkugeln übernachten. Free Spirit Sphere Hotel — märchenhaft.", highlights: ["Kugel-Häuser", "Berge", "Sternenhimmel", "Romantik pur"], time: "1 Nacht", best: "ganzjährig", emoji: "✨" },
  { id: "teufelsbruecke", title: "Rakotzbrücke (Teufelsbrücke)", cat: "unique", location: "Kromlau, Sachsen", desc: "Magische Brücke die im Wasser einen perfekten Kreis bildet. Fotomotiv!", highlights: ["Rakotzbrücke", "Azaleenpark", "Spiegelung", "Märchenhaft"], time: "1–2 Std.", best: "Mai–Juni (Azaleenblüte)", emoji: "✨" },
  { id: "flossfahrt_muenchen", title: "Isar-Floßfahrt München", cat: "unique", location: "München", desc: "Mit dem Floß die Isar runter — Bier, Musik, Sonne. Bester Tag in München.", highlights: ["Floßfahren", "Bier", "Baden", "Wirtshaus am Ziel"], time: "4–6 Std.", best: "Juni–August", emoji: "✨" },
];

type FilterKey = string | "all";

const FILTERS: { key: FilterKey; label: string; icon: string }[] = [
  { key: "all", label: "Alle", icon: "🎯" },
  { key: "stadt", label: "Städte", icon: "🏙️" },
  { key: "natur", label: "Natur", icon: "🌲" },
  { key: "kultur", label: "Kultur", icon: "🏰" },
  { key: "kulinarik", label: "Kulinarik", icon: "🍺" },
  { key: "abenteuer", label: "Abenteuer", icon: "🧗" },
  { key: "party", label: "Party", icon: "🎪" },
  { key: "relax", label: "Relax", icon: "🛀" },
  { key: "unique", label: "Unique", icon: "✨" },
];

function matchesFilter(m: BaukastenModul, filter: FilterKey): boolean {
  if (filter === "all") return true;
  const cats = Array.isArray(m.cat) ? m.cat : [m.cat];
  return cats.includes(filter);
}

function catClass(m: BaukastenModul): string {
  const c = Array.isArray(m.cat) ? m.cat[0] : m.cat;
  return c;
}

export default function BaukastenPage() {
  const { selected, toggle, clear, remove } = useBaukasten();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(
    () => ALL_MODULES.filter((m) => matchesFilter(m, filter)),
    [filter]
  );

  const selectedMods = useMemo(
    () => ALL_MODULES.filter((m) => selected.includes(m.id)),
    [selected]
  );

  const exportRoute = () => {
    if (selectedMods.length === 0) return;
    let text = "🧩 Meine Deutschland Route\n";
    text += "═══════════════════════════\n\n";
    selectedMods.forEach((m, i) => {
      const c = Array.isArray(m.cat) ? m.cat[0] : m.cat;
      text += `${i + 1}. ${m.emoji} ${m.title} (${m.location})\n`;
      text += `   ${m.desc}\n`;
      text += `   ⏱ ${m.time} · 📅 ${m.best}\n`;
      text += `   ${m.highlights.join(" · ")}\n\n`;
    });
    navigator.clipboard?.writeText(text).then(() => {
      const btn = document.getElementById("baukasten-export-btn") as HTMLButtonElement;
      if (btn) {
        btn.textContent = "✅ Kopiert!";
        setTimeout(() => { btn.textContent = "📋 Route kopieren"; }, 2000);
      }
    });
  };

  return (
    <div className="baukasten-page">
      {/* Header */}
      <div className="baukasten-header">
        <h1 className="baukasten-title">🧩 Reise-Baukasten</h1>
        <p className="baukasten-subtitle">
          Wähle Module, die dich interessieren → bau dir deine Wunschroute
        </p>
      </div>

      {/* Filter Bar */}
      <div className="baukasten-filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`baukasten-filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.icon} {f.label}
            <span className="baukasten-filter-count">
              {f.key === "all"
                ? ALL_MODULES.length
                : ALL_MODULES.filter((m) => matchesFilter(m, f.key)).length}
            </span>
          </button>
        ))}
      </div>

      {/* Module Grid */}
      <div className="baukasten-grid">
        {filtered.map((m) => {
          const isSelected = selected.includes(m.id);
          const cClass = catClass(m);
          return (
            <div
              key={m.id}
              className={`baukasten-card ${cClass} ${isSelected ? "selected" : ""}`}
              onClick={() => toggle(m.id)}
            >
              {isSelected && <span className="baukasten-selected-badge">✓</span>}
              <span className={`baukasten-tag ${cClass}`}>
                {ICONS[cClass] || "📍"} {CAT_LABELS[cClass] || cClass}
              </span>
              <h3 className="baukasten-card-title">{m.emoji} {m.title}</h3>
              <div className="baukasten-location">{m.location}</div>
              <p className="baukasten-desc">{m.desc}</p>
              <div className="baukasten-highlights">
                {m.highlights.map((h) => (
                  <span key={h} className="baukasten-highlight">
                    #{h.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
              <div className="baukasten-meta">
                <span>⏱ {m.time}</span>
                <span>📅 {m.best}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating sidebar button */}
      <button
        className="baukasten-fab"
        onClick={() => setSidebarOpen(true)}
      >
        🧩 Route
        <span className="baukasten-fab-count">{selected.length}</span>
      </button>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="baukasten-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`baukasten-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="baukasten-sidebar-header">
          <h2>🧩 Meine Route</h2>
          <button className="baukasten-close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {selectedMods.length === 0 ? (
          <div className="baukasten-sidebar-empty">
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👆</p>
            <p>Klick auf Karten, um deine Route zu bauen</p>
          </div>
        ) : (
          <div className="baukasten-route-list">
            {selectedMods.map((m, i) => (
              <div key={m.id} className="baukasten-route-item">
                <span className="baukasten-route-pos">{i + 1}</span>
                <div className="baukasten-route-info">
                  <strong>{m.title}</strong>
                  <span className="baukasten-route-loc">
                    {ICONS[catClass(m)]} {m.location}
                  </span>
                </div>
                <button
                  className="baukasten-route-remove"
                  onClick={() => remove(m.id)}
                  title="Entfernen"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="baukasten-sidebar-actions">
          <button id="baukasten-export-btn" className="baukasten-btn baukasten-btn-primary" onClick={exportRoute}>
            📋 Route kopieren
          </button>
          <button className="baukasten-btn baukasten-btn-danger" onClick={clear}>
            🗑️ Alle entfernen
          </button>
        </div>
      </div>
    </div>
  );
}
