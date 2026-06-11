import { useState, useMemo } from "react";
import { useBaukasten, type BaukastenModul } from "../hooks/useBaukasten";

const CATEGORIES = [
  { key: "stadt", icon: "🏙️", label: "Städte" },
  { key: "natur", icon: "🌲", label: "Natur" },
  { key: "kultur", icon: "🏰", label: "Kultur" },
  { key: "kulinarik", icon: "🍺", label: "Kulinarik" },
  { key: "abenteuer", icon: "🧗", label: "Abenteuer" },
  { key: "party", icon: "🎪", label: "Party" },
  { key: "relax", icon: "🛀", label: "Relax" },
  { key: "unique", icon: "✨", label: "Unique" },
] as const;

const MODULES: BaukastenModul[] = [
  { id: "hamburg", title: "Hamburg", cat: "stadt", location: "Norden", desc: "Elbphilharmonie, Speicherstadt, Szene, Nachtleben", highlights: [], time: "2 Tage", best: "Mai–September", emoji: "🏙️" },
  { id: "berlin", title: "Berlin", cat: "stadt", location: "Osten", desc: "Geschichte, Clubkultur, Street Art, Weltstadt", highlights: [], time: "2–3 Tage", best: "ganzjährig", emoji: "🏙️" },
  { id: "leipzig", title: "Leipzig", cat: "stadt", location: "Osten", desc: "Szene, Industrie-Chic, Kanäle, Kunst", highlights: [], time: "1–2 Tage", best: "Frühling–Herbst", emoji: "🏙️" },
  { id: "dresden", title: "Dresden", cat: "stadt", location: "Osten", desc: "Barock, Elbflorenz, Frauenkirche, Neustadt", highlights: [], time: "1–2 Tage", best: "ganzjährig", emoji: "🏙️" },
  { id: "muenchen", title: "München", cat: "stadt", location: "Süden", desc: "Biergärten, Isar-Floßfahrt, Kunst, Alpenblick", highlights: [], time: "2 Tage", best: "Mai–Oktober", emoji: "🏙️" },
  { id: "koeln", title: "Köln", cat: "stadt", location: "Westen", desc: "Dom, Rheinufer, Brauhaus-Kultur, Szene", highlights: [], time: "1–2 Tage", best: "ganzjährig", emoji: "🏙️" },
  { id: "bamberg", title: "Bamberg", cat: "stadt", location: "Franken", desc: "UNESCO-Altstadt, Rauchbier, 11 Brauereien", highlights: [], time: "1 Tag", best: "ganzjährig", emoji: "🏘️" },
  { id: "frankfurt", title: "Frankfurt", cat: "stadt", location: "Zentrum", desc: "Skyline, Mainufer, Food-Szene, Bankenviertel", highlights: [], time: "1 Tag", best: "ganzjährig", emoji: "🏙️" },
  { id: "saechsische_schweiz", title: "Sächsische Schweiz", cat: "natur", location: "Osten", desc: "Felsen, Malerweg, Basteibrücke — wie eine andere Welt", highlights: [], time: "2–3 Tage", best: "April–Oktober", emoji: "🌲" },
  { id: "schwarzwald", title: "Schwarzwald", cat: "natur", location: "Südwesten", desc: "Wasserfälle, Wälder, Kuckucksuhren, Feldberg", highlights: [], time: "2 Tage", best: "Mai–Oktober", emoji: "🌲" },
  { id: "koenigssee", title: "Königssee", cat: "natur", location: "Berchtesgaden", desc: "Türkisblauer See, von Bergen eingerahmt", highlights: [], time: "1–2 Tage", best: "Mai–September", emoji: "🌲" },
  { id: "seenplatte", title: "Mecklenb. Seenplatte", cat: "natur", location: "Norden", desc: "500+ Seen, Kanu, Hausboot, absolute Stille", highlights: [], time: "2–4 Tage", best: "Mai–September", emoji: "🌲" },
  { id: "spreewald", title: "Spreewald", cat: "natur", location: "Osten", desc: "Kahnfahren, Gurken, Biosphärenreservat", highlights: [], time: "1–2 Tage", best: "Mai–September", emoji: "🌲" },
  { id: "ruegen", title: "Rügen", cat: "natur", location: "Ostsee", desc: "Kreidefelsen, Nationalpark Jasmund, Ostsee", highlights: [], time: "2 Tage", best: "Mai–September", emoji: "🌲" },
  { id: "zugspitze", title: "Zugspitze", cat: "natur", location: "Garmisch", desc: "Höchster Berg DE, Eibsee, Zahnradbahn, Schlucht", highlights: [], time: "1 Tag", best: "Mai–Oktober", emoji: "🏔️" },
  { id: "neuschwanstein", title: "Neuschwanstein", cat: "kultur", location: "Bayern", desc: "Das Märchenschloss. Disney-Vorlage. Tickets vorher buchen!", highlights: [], time: "1 Tag", best: "ganzjährig", emoji: "🏰" },
  { id: "romantische_strasse", title: "Romantische Straße", cat: "kultur", location: "Franken→Bayern", desc: "Rothenburg, Würzburg, Weinberge, Schlösser", highlights: [], time: "2–3 Tage", best: "April–Oktober", emoji: "🏰" },
  { id: "rheinromantik", title: "Rheinromantik", cat: "kultur", location: "Westen", desc: "Burgen, Loreley, Weinberge, schönste Flusslandschaft", highlights: [], time: "2 Tage", best: "Mai–Oktober", emoji: "🏰" },
  { id: "heidelberg", title: "Heidelberg", cat: "kultur", location: "Südwesten", desc: "Romantischste Altstadt, Schloss, Philosophenweg", highlights: [], time: "1 Tag", best: "ganzjährig", emoji: "🏰" },
  { id: "weinstrasse", title: "Deutsche Weinstraße", cat: "kulinarik", location: "Pfalz", desc: "Riesling pur, Winzerdörfer, Pfälzer Küche", highlights: [], time: "1–2 Tage", best: "September–Oktober", emoji: "🍷" },
  { id: "bierkultur", title: "Bierkultur-Tour", cat: "kulinarik", location: "Westen/Franken", desc: "Kölsch, Alt, Rauchbier — Brauereien satt", highlights: [], time: "2 Tage", best: "ganzjährig", emoji: "🍺" },
  { id: "bodensee", title: "Bodensee", cat: "kulinarik", location: "Südwesten", desc: "Wein, Insel Mainau, Alpenpanorama, Fisch", highlights: [], time: "2 Tage", best: "Mai–September", emoji: "🍷" },
  { id: "nationalpark_eifel", title: "Nationalpark Eifel", cat: "abenteuer", location: "Westen", desc: "Wildnis-Trail, Kletterwald, Stauseen, Burg", highlights: [], time: "1–2 Tage", best: "Mai–Oktober", emoji: "🧗" },
  { id: "harz", title: "Harz & Brocken", cat: "abenteuer", location: "Zentrum", desc: "Brocken, Dampflok, Moore, Klippen", highlights: [], time: "1–2 Tage", best: "Mai–Oktober", emoji: "🧗" },
  { id: "berlin_clubs", title: "Berliner Clubs", cat: "party", location: "Berlin", desc: "Berghain, Sisyphos, RSO – elektronische Musik satt", highlights: [], time: "1–3 Nächte", best: "ganzjährig", emoji: "🎪" },
  { id: "hurricane", title: "Hurricane / Southside", cat: "party", location: "Norden/Süden", desc: "Parallel-Festivals im Juni. Camping, Live-Musik", highlights: [], time: "Wochenende", best: "Juni 2026", emoji: "🎪" },
  { id: "leipzig_nacht", title: "Leipzig Nachtleben", cat: "party", location: "Leipzig", desc: "Ilses Erika, distillery, UT Connewitz", highlights: [], time: "1–2 Nächte", best: "ganzjährig", emoji: "🎪" },
  { id: "baden_baden", title: "Baden-Baden", cat: "relax", location: "Schwarzwald", desc: "Caracalla-Therme, römisches Bade-Erlebnis", highlights: [], time: "1 Tag", best: "ganzjährig", emoji: "🛀" },
  { id: "ostsee_strand", title: "Ostseestrände", cat: "relax", location: "Norden", desc: "Timmendorf, Usedom – feiner Sand, kein Nordseewind", highlights: [], time: "1–2 Tage", best: "Juni–August", emoji: "🛀" },
  { id: "miniatur_wunderland", title: "Miniatur Wunderland", cat: "unique", location: "Hamburg", desc: "Größte Modelleisenbahn. 10.000 m² Details", highlights: [], time: "3–4 Std.", best: "vorher buchen", emoji: "✨" },
  { id: "baumhaus", title: "Baumhaushotel", cat: "unique", location: "Allgäu", desc: "In Baumkugeln übernachten – Free Spirit Sphere", highlights: [], time: "1 Nacht", best: "ganzjährig", emoji: "✨" },
  { id: "teufelsbruecke", title: "Teufelsbrücke", cat: "unique", location: "Kromlau", desc: "Brücke die im Wasser einen perfekten Kreis bildet", highlights: [], time: "1–2 Std.", best: "Mai–Juni", emoji: "✨" },
  { id: "flossfahrt", title: "Isar-Floßfahrt", cat: "unique", location: "München", desc: "Floß die Isar runter – Bier, Musik, Sonne", highlights: [], time: "4–6 Std.", best: "Juni–August", emoji: "✨" },
];

function matchesFilter(m: BaukastenModul, filter: string): boolean {
  if (filter === "all") return true;
  const cats = Array.isArray(m.cat) ? m.cat : [m.cat];
  return cats.includes(filter);
}

function catIcon(m: BaukastenModul): string {
  const c = Array.isArray(m.cat) ? m.cat[0] : m.cat;
  return CATEGORIES.find((x) => x.key === c)?.icon || "📍";
}

const CAT_COLORS: Record<string, string> = {
  stadt: "#a29bfe", natur: "#00b894", kultur: "#fdcb6e",
  kulinarik: "#e17055", abenteuer: "#0984e3", party: "#fd79a8",
  relax: "#81ecec", unique: "#f39c12",
};

export default function BaukastenPage() {
  const { selected, toggle, clear, remove } = useBaukasten();
  const [category, setCategory] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const filtered = useMemo(
    () => (category ? MODULES.filter((m) => matchesFilter(m, category)) : []),
    [category]
  );

  const selectedMods = useMemo(
    () => MODULES.filter((m) => selected.includes(m.id)),
    [selected]
  );

  const exportRoute = () => {
    if (selectedMods.length === 0) return;
    const text =
      "🧩 Meine Deutschland Route\n═══════════════════════════\n\n" +
      selectedMods
        .map(
          (m, i) =>
            `${i + 1}. ${m.emoji} ${m.title} (${m.location})\n   ${m.desc} · ⏱ ${m.time}`
        )
        .join("\n\n");
    navigator.clipboard?.writeText(text).then(() => {
      const btn = document.getElementById("bk-export-btn") as HTMLButtonElement;
      if (btn) {
        btn.textContent = "✅ Kopiert!";
        setTimeout(() => (btn.textContent = "📋 Kopieren"), 2000);
      }
    });
  };

  if (!category) {
    return (
      <div className="bk-page">
        <div className="bk-header">
          <h1 className="bk-title">🧩 Reise-Baukasten</h1>
          <p className="bk-sub">Wähl eine Kategorie → dann die Module für deine Route</p>
        </div>
        <div className="bk-cat-grid">
          {CATEGORIES.map((c) => {
            const count = MODULES.filter((m) => matchesFilter(m, c.key)).length;
            return (
              <button
                key={c.key}
                className="bk-cat-btn"
                style={{ "--cat-color": CAT_COLORS[c.key] || "#666" } as React.CSSProperties}
                onClick={() => setCategory(c.key)}
              >
                <span className="bk-cat-icon">{c.icon}</span>
                <span className="bk-cat-label">{c.label}</span>
                <span className="bk-cat-count">{count}</span>
              </button>
            );
          })}
        </div>

        {selectedMods.length > 0 && (
          <button className="bk-fab" onClick={() => setShowSidebar(true)}>
            🧩 Route <span className="bk-fab-count">{selected.length}</span>
          </button>
        )}
        {showSidebar && <Sidebar selectedMods={selectedMods} clear={clear} remove={remove} exportRoute={exportRoute} onClose={() => setShowSidebar(false)} />}
      </div>
    );
  }

  const currentCat = CATEGORIES.find((c) => c.key === category);

  return (
    <div className="bk-page">
      <div className="bk-header">
        <button className="bk-back-btn" onClick={() => setCategory(null)}>← Übersicht</button>
        <h1 className="bk-title" style={{ marginTop: "0.5rem" }}>
          {currentCat?.icon} {currentCat?.label}
        </h1>
        <p className="bk-sub">{filtered.length} Module — klick zum Hinzufügen</p>
      </div>

      <div className="bk-list">
        {filtered.map((m) => {
          const sel = selected.includes(m.id);
          return (
            <div
              key={m.id}
              className={`bk-item ${sel ? "bk-item--sel" : ""}`}
              onClick={() => toggle(m.id)}
            >
              <div className="bk-item-left">
                <div className="bk-item-emoji">{m.emoji}</div>
                <div>
                  <div className="bk-item-title">{m.title}</div>
                  <div className="bk-item-loc">{m.location}</div>
                </div>
              </div>
              <div className="bk-item-desc">{m.desc}</div>
              <div className="bk-item-meta">
                <span>⏱ {m.time}</span>
                <span>📅 {m.best}</span>
              </div>
              {sel && <div className="bk-check">✓</div>}
            </div>
          );
        })}
      </div>

      <button className="bk-fab" onClick={() => setShowSidebar(true)}>
        🧩 Route <span className="bk-fab-count">{selected.length}</span>
      </button>
      {showSidebar && <Sidebar selectedMods={selectedMods} clear={clear} remove={remove} exportRoute={exportRoute} onClose={() => setShowSidebar(false)} />}
    </div>
  );
}

function Sidebar({
  selectedMods,
  clear,
  remove,
  exportRoute,
  onClose,
}: {
  selectedMods: BaukastenModul[];
  clear: () => void;
  remove: (id: string) => void;
  exportRoute: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="bk-overlay" onClick={onClose} />
      <div className="bk-sidebar">
        <div className="bk-sidebar-head">
          <h2>🧩 Meine Route</h2>
          <button className="bk-close" onClick={onClose}>✕</button>
        </div>
        {selectedMods.length === 0 ? (
          <div className="bk-empty">Klick auf Module, um sie hier zu sehen</div>
        ) : (
          <div className="bk-sidebar-list">
            {selectedMods.map((m, i) => (
              <div key={m.id} className="bk-sidebar-item">
                <span className="bk-sidebar-num">{i + 1}</span>
                <span className="bk-sidebar-title">{m.emoji} {m.title}</span>
                <button className="bk-sidebar-rm" onClick={() => remove(m.id)}>✕</button>
              </div>
            ))}
          </div>
        )}
        <div className="bk-sidebar-actions">
          <button id="bk-export-btn" className="bk-btn bk-btn-p" onClick={exportRoute}>📋 Kopieren</button>
          <button className="bk-btn bk-btn-d" onClick={clear}>🗑️ Leeren</button>
        </div>
      </div>
    </>
  );
}
