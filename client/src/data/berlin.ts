import { Route } from "../types";

export const berlinClassicRoute: Route = {
  id: "berlin-classic",
  city: "Berlin",
  name: "Berliner Historischer Rundgang",
  nameEn: "Berlin Historical Walk",
  description:
    "Vom Brandenburger Tor zum Alexanderplatz – erleben Sie 800 Jahre Berlin auf einer 4 km langen Route durch das historische Zentrum. Vorbei an Reichstag, Holocaust-Mahnmal und Museumsinsel.",
  descriptionEn:
    "From Brandenburg Gate to Alexanderplatz – experience 800 years of Berlin on a 4 km walk through the historic center. Past the Reichstag, Holocaust Memorial, and Museum Island.",
  imageUrl: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80",
  durationMinutes: 120,
  distanceKm: 4.2,
  priceCents: 0, // free demo tour
  tags: ["historisch", "architektur", "klassiker"],
  pois: [
    {
      id: "brandenburger-tor",
      name: "Brandenburger Tor",
      nameEn: "Brandenburg Gate",
      description:
        "Stell dich vor das Brandenburger Tor - das wichtigste Symbol der deutschen Einheit. 1791 als Stadttor erbaut, wurde es zum Triumphbogen umgestaltet. Als die Mauer fiel, tanzten hier Menschen auf der Mauer. Heute stehst du genau dort, wo Geschichte geschrieben wurde.",
      descriptionEn:
        "The Brandenburg Gate is Berlin's most famous landmark and a symbol of German unity. Built between 1788 and 1791, it was part of the customs wall and later redesigned as a triumphal arch. During the division, the gate stood in the restricted area – after the fall of the Wall, it became the symbol of reunification.",
      lat: 52.516274,
      lng: 13.377704,
      order: 1,
      imageUrl: "",
      duration: 10,
      audioDe: "/audio/brandenburger-tor_de.mp3",
      audioEn: "/audio/brandenburger-tor_en.mp3",
    },
    {
      id: "reichstag",
      name: "Reichstagsgebäude",
      nameEn: "Reichstag Building",
      description:
        "Der Reichstag beherbergt den Deutschen Bundestag. Die Glaskuppel von Norman Foster bietet einen spektakulären Blick über Berlin. Der Reichstagsbrand 1933 wurde von den Nazis als Vorwand genutzt. 1945 hisste die Rote Armee die Flagge auf dem Gebäude – eine ikonische Kriegsfotografie.",
      descriptionEn:
        "The Reichstag houses the German Bundestag. Norman Foster's glass dome offers spectacular views. The 1933 fire was used by the Nazis as a pretext. In 1945, the Red Army raised the flag over the building – an iconic war photograph.",
      lat: 52.51862,
      lng: 13.376187,
      order: 2,
      imageUrl: "",
      duration: 10,
      audioDe: "/audio/reichstag_de.mp3",
      audioEn: "/audio/reichstag_en.mp3",
    },
    {
      id: "holocaust-mahnmal",
      name: "Denkmal für die ermordeten Juden Europas",
      nameEn: "Holocaust Memorial",
      description:
        "Das Holocaust-Mahnmal besteht aus 2711 Betonstelen auf einem wellenförmigen Gelände. Es erinnert an die sechs Millionen jüdischen Opfer des Nationalsozialismus. Entworfen von Peter Eisenman, vermitteln die enger werdenden Gänge ein Gefühl von Verlorenheit.",
      descriptionEn:
        "The Holocaust Memorial consists of 2,711 concrete stelae on a wave-shaped field. It commemorates six million Jewish victims. Designed by Peter Eisenman, the narrowing corridors convey a sense of disorientation.",
      lat: 52.5137,
      lng: 13.3788,
      order: 3,
      imageUrl: "",
      duration: 15,
      audioDe: "/audio/holocaust-mahnmal_de.mp3",
      audioEn: "/audio/holocaust-mahnmal_en.mp3",
    },
    {
      id: "potsdamer-platz",
      name: "Potsdamer Platz",
      nameEn: "Potsdamer Platz",
      description:
        "In den 1920ern der verkehrsreichste Platz Europas, lag er nach dem Mauerbau im Niemandsland. Heute ist er ein modernes Geschäftsviertel mit dem Sony Center – eines der größten Bauprojekte nach der Wiedervereinigung.",
      descriptionEn:
        "The busiest square in Europe in the 1920s, it lay in no-man's land after the Wall. Today it's a modern business district with the Sony Center – one of Europe's largest post-reunification construction projects.",
      lat: 52.5093,
      lng: 13.3763,
      order: 4,
      imageUrl: "",
      duration: 10,
      audioDe: "/audio/potsdamer-platz_de.mp3",
      audioEn: "/audio/potsdamer-platz_en.mp3",
    },
    {
      id: "checkpoint-charlie",
      name: "Checkpoint Charlie",
      nameEn: "Checkpoint Charlie",
      description:
        "Der berühmteste Grenzübergang des Kalten Krieges. 1961 standen sich amerikanische und sowjetische Panzer auf 50 Meter gegenüber – der Höhepunkt der Berlin-Krise. Das Schild 'You are leaving the American sector' wurde zum Symbol der Teilung.",
      descriptionEn:
        "The most famous Cold War border crossing. In 1961, American and Soviet tanks faced each other at 50 meters – the height of the Berlin Crisis. The sign 'You are leaving the American sector' became a symbol of division.",
      lat: 52.5074,
      lng: 13.3903,
      order: 5,
      imageUrl: "",
      duration: 10,
      audioDe: "/audio/checkpoint-charlie_de.mp3",
      audioEn: "/audio/checkpoint-charlie_en.mp3",
    },
    {
      id: "gendarmenmarkt",
      name: "Gendarmenmarkt",
      nameEn: "Gendarmenmarkt",
      description:
        "Der schönste Platz Berlins, umrahmt vom Französischen und Deutschen Dom und dem Konzerthaus. Der Platz entstand im 17. Jahrhundert – der Französische Dom erinnert an die Hugenotten, die in Berlin Zuflucht fanden.",
      descriptionEn:
        "Berlin's most beautiful square, framed by the French and German Cathedrals and the Concert Hall. Created in the 17th century – the French Cathedral commemorates the Huguenots who found refuge in Berlin.",
      lat: 52.5135,
      lng: 13.3927,
      order: 6,
      imageUrl: "",
      duration: 10,
      audioDe: "/audio/gendarmenmarkt_de.mp3",
      audioEn: "/audio/gendarmenmarkt_en.mp3",
    },
    {
      id: "berliner-dom",
      name: "Berliner Dom",
      nameEn: "Berlin Cathedral",
      description:
        "Die größte evangelische Kirche Deutschlands, ein Meisterwerk des Historismus. Die 85 Meter hohe Kuppel prägt die Stadtsilhouette. Erbaut 1894–1905 als zentrale Kirche der Hohenzollern, schwer beschädigt im Krieg, aufwändig restauriert.",
      descriptionEn:
        "Germany's largest Protestant church, a historicist masterpiece. The 85-meter dome dominates the skyline. Built 1894–1905 as the central church of the Hohenzollerns, heavily damaged in the war, extensively restored.",
      lat: 52.5192,
      lng: 13.4011,
      order: 7,
      imageUrl: "",
      duration: 10,
      audioDe: "/audio/berliner-dom_de.mp3",
      audioEn: "/audio/berliner-dom_en.mp3",
    },
    {
      id: "museumsinsel",
      name: "Museumsinsel",
      nameEn: "Museum Island",
      description:
        "UNESCO-Weltkulturerbe mit fünf Weltklasse-Museen. Das Pergamonmuseum beherbergt den Pergamonaltar – ein 2.200 Jahre altes Meisterwerk hellenistischer Baukunst. Entstanden im 19. Jahrhundert als preußisches 'Eiland der Künste'.",
      descriptionEn:
        "UNESCO World Heritage with five world-class museums. The Pergamon Museum houses the Pergamon Altar – a 2,200-year-old Hellenistic masterpiece. Created in the 19th century as a Prussian 'island of the arts'.",
      lat: 52.5207,
      lng: 13.3968,
      order: 8,
      imageUrl: "",
      duration: 15,
      audioDe: "/audio/museumsinsel_de.mp3",
      audioEn: "/audio/museumsinsel_en.mp3",
    },
    {
      id: "alexanderplatz",
      name: "Alexanderplatz",
      nameEn: "Alexanderplatz",
      description:
        "Einer der bekanntesten Plätze Berlins. Der 368 Meter hohe Fernsehturm ist das höchste Bauwerk Deutschlands. 1969 als Prestigeprojekt der DDR eingeweiht, ist er heute das meistbesuchte Wahrzeichen Berlins.",
      descriptionEn:
        "One of Berlin's most famous squares. The 368-meter TV tower is Germany's tallest building. Inaugurated in 1969 as a GDR prestige project, it's now Berlin's most visited landmark.",
      lat: 52.5219,
      lng: 13.4132,
      order: 9,
      imageUrl: "",
      duration: 10,
      audioDe: "/audio/alexanderplatz_de.mp3",
      audioEn: "/audio/alexanderplatz_en.mp3",
    },
  ],
};

export const routes = [berlinClassicRoute];


