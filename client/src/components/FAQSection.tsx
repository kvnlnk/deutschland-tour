import { useState } from "react";

interface FAQItem {
  id: number;
  frage: string;
  antwort: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    frage: "Muss ich während der Tour online sein?",
    antwort:
      "Ja, für die Kartenansicht und GPS-Funktion wird eine Internetverbindung benötigt. Die Audio-Dateien werden beim ersten Abspielen geladen und können bei erneuter Wiedergabe aus dem Cache abgespielt werden. Für eine reibungslose Tour empfehlen wir, die Stationen vorab zu laden – ein kurzer Klick auf jede Audio-Datei reicht aus.",
  },
  {
    id: 2,
    frage: "Welche Zahlungsmethoden werden akzeptiert?",
    antwort:
      "Wir akzeptieren Kreditkarte (Visa, Mastercard), Apple Pay und Google Pay – abgewickelt über Stripe, einen der sichersten Zahlungsanbieter weltweit. Ihre Zahlungsdaten werden nicht auf unseren Servern gespeichert. Die Berlin-Tour ist komplett kostenlos und erfordert keine Zahlung.",
  },
  {
    id: 3,
    frage: "Kann ich meine Tour stornieren und bekomme ich mein Geld zurück?",
    antwort:
      "Ja! Bis zu 14 Tage nach dem Kauf können Sie den vollen Kaufpreis zurückbekommen – einfach eine E-Mail an support@deutschland-tour.app. Bei technischen Problemen mit der Tour erstatten wir selbstverständlich immer den vollen Betrag. Keine Fragen, keine Hürden.",
  },
  {
    id: 4,
    frage: "In welchen Sprachen sind die Touren verfügbar?",
    antwort:
      "Aktuell bieten wir alle Touren in Deutsch und Englisch an. Die Sprachumschaltung erfolgt direkt in der Tour-Ansicht oben rechts (DE/EN). Weitere Sprachen wie Französisch oder Spanisch sind für zukünftige Updates geplant.",
  },
  {
    id: 5,
    frage: "Wie lange dauert eine typische Tour?",
    antwort:
      "Jede Tour ist zwischen 60 und 120 Minuten lang, je nach Route und Tempo. Die Berlin-Tour ist mit 4,2 km und ~2 Stunden die längste, München mit 3,1 km (~1,5 h) und Hamburg mit 3,5 km (~1,5 h) etwas kürzer. Sie können jederzeit pausieren und später fortsetzen.",
  },
  {
    id: 6,
    frage: "Sind die Touren für Kinder geeignet?",
    antwort:
      "Ja! Die Touren sind familienfreundlich und für Kinder ab etwa 10 Jahren geeignet. Die Strecken sind flach und gut zu Fuß zu bewältigen. Jüngere Kinder können natürlich mitlaufen – die Audiospiele und die GPS-gesteuerte Entdeckung machen auch kleinen Entdeckern Spaß.",
  },
  {
    id: 7,
    frage: "Kann ich die Tour in einer Gruppe nutzen?",
    antwort:
      "Absolut! Jeder Teilnehmer benötigt ein eigenes Gerät und Kopfhörer. Die Tour startet am gleichen Punkt und folgt der gleichen Route – so erleben Sie die Stadt gemeinsam, aber jeder in seinem eigenen Tempo. Für Gruppen ab 10 Personen bieten wir auf Anfrage Rabatte an.",
  },
  {
    id: 8,
    frage: "Funktioniert die Tour auch ohne GPS?",
    antwort:
      "Ja! GPS ist optional. Ohne GPS können Sie die Audiospiele manuell über die Stationsliste starten. Die automatische Wiedergabe beim Nähern an eine Sehenswürdigkeit entfällt dann, aber alle Inhalte sind vollständig abspielbar. Perfekt zum Vorbereiten oder Nachhören!",
  },
  {
    id: 9,
    frage: "Welche technischen Voraussetzungen brauche ich?",
    antwort:
      "Ein modernes Smartphone oder Tablet mit Internetzugang und Browser (Chrome, Safari, Firefox – aktuelle Version). Kopfhörer werden empfohlen für das beste Audio-Erlebnis. Keine App-Installation, kein Login, kein Speicherplatz nötig – einfach die Webseite öffnen und loslegen.",
  },
  {
    id: 10,
    frage: "Sind die Touren barrierefrei?",
    antwort:
      "Wir bemühen uns um Barrierefreiheit. Die Routen sind größtenteils flach und über Kopfsteinpflaster und Gehwege gut begehbar. Der Berliner Dom und die Münchner Residenz haben Stufen – dies ist in der Stationsbeschreibung vermerkt. Rollstuhlfahrer empfehlen wir die Hamburg-Tour (Speicherstadt, HafenCity) als besonders geeignet.",
  },
  {
    id: 11,
    frage: "Wie lange bleibt mein Kauf gültig?",
    antwort:
      "Einmal gekauft, für immer! Die Touren verfallen nicht und können jederzeit erneut aufgerufen werden. Bei zukünftigen Updates (neue Stationen, verbesserte Audios) profitieren Sie automatisch – ohne zusätzliche Kosten.",
  },
  {
    id: 12,
    frage: "Gibt es Touren in weiteren deutschen Städten?",
    antwort:
      "Ja, wir arbeiten daran! Nächste geplante Städte sind Köln (Kölner Dom, Altstadt, Rhein), Dresden (Frauenkirche, Zwinger, Elbpanorama) und Heidelberg (Schloss, Altstadt, Alte Brücke). Mit einem All Access-Pass erhalten Sie alle zukünftigen Städte automatisch dazu.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-content">
        <h2 className="section-title">Häufige Fragen</h2>
        <p className="section-subtitle">
          Alles, was Sie vor Ihrer Tour wissen müssen.
        </p>

        <div className="faq-list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.frage}</span>
                  <svg
                    className={`faq-chevron ${isOpen ? "faq-chevron--open" : ""}`}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`faq-answer ${isOpen ? "faq-answer--open" : ""}`}
                >
                  <p>{faq.antwort}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
