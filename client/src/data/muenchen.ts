import { Route } from "../types";

export const muenchenAltstadt: Route = {
  id: "muenchen-altstadt",
  city: "München",
  name: "Münchner Altstadt & Kultur",
  nameEn: "Munich Old Town & Culture",
  description:
    "Vom Marienplatz durch die historische Altstadt – erleben Sie bayerische Geschichte, Bierkultur und königliche Pracht auf 3 km durch das Herz Münchens.",
  descriptionEn:
    "From Marienplatz through the historic old town – experience Bavarian history, beer culture and royal splendor on a 3 km walk through the heart of Munich.",
  imageUrl: "https://picsum.photos/seed/muenchen/800/400",
  durationMinutes: 90,
  distanceKm: 3.1,
  priceCents: 499,
  tags: ["kulinarisch", "geschichte", "kultur"],
  pois: [
    {
      id: "muenchen-marienplatz",
      name: "Marienplatz",
      nameEn: "Marienplatz",
      description:
        "Seit 1158 ist der Marienplatz das Herz Muenchens. Um 11 und 12 Uhr tanzen die Figuren des Glockenspiels den Schaefflertanz - ein Spektakel, das taeglich tausende Besucher anzieht. Die Mariensaeule erinnert an die Rettung der Stadt im Dreissigjaehrigen Krieg.",
      descriptionEn:
        "Marienplatz has been Munich's center since 1158. The New Town Hall with its famous Glockenspiel attracts thousands daily. At 11 and 12, the Glockenspiel figures perform the Schäffler dance spectacle.",
      lat: 48.1372,
      lng: 11.5756,
      order: 1,
      imageUrl: "https://picsum.photos/seed/muenchen-marienplatz/600/400",
      duration: 10,
      audioDe: "/audio/muenchen-marienplatz_de.mp3",
      audioEn: "/audio/muenchen-marienplatz_en.mp3",
    },
    {
      id: "muenchen-frauenkirche",
      name: "Frauenkirche",
      nameEn: "Frauenkirche (Cathedral)",
      description:
        "Die Frauenkirche mit ihren markanten Zwiebeltürmen ist das Wahrzeichen Münchens. Die Dom zu Unserer Lieben Frau wurde 1494 fertiggestellt – ihre Türme sind 99 Meter hoch. Der Teufelstritt im Eingangsbereich ist eine berühmte Legende.",
      descriptionEn:
        "The Frauenkirche with its distinctive onion domes is Munich's landmark. Completed in 1494, its towers reach 99 meters. The Devil's Footstep at the entrance is a famous local legend.",
      lat: 48.1386,
      lng: 11.5736,
      order: 2,
      imageUrl: "https://picsum.photos/seed/muenchen-frauenkirche/600/400",
      duration: 10,
      audioDe: "/audio/muenchen-frauenkirche_de.mp3",
      audioEn: "/audio/muenchen-frauenkirche_en.mp3",
    },
    {
      id: "muenchen-viktualienmarkt",
      name: "Viktualienmarkt",
      nameEn: "Viktualienmarkt",
      description:
        "Der Viktualienmarkt ist Münchens berühmtester Lebensmittelmarkt. Seit 1807 werden hier täglich frische Produkte, Blumen und bayerische Spezialitäten angeboten. Der Maibaum mit seinen bunten Wappen ist ein echter Hingucker.",
      descriptionEn:
        "Viktualienmarkt is Munich's most famous food market. Since 1807, fresh produce, flowers and Bavarian specialties are sold here daily. The maypole with its colorful crests is a real eye-catcher.",
      lat: 48.1352,
      lng: 11.5764,
      order: 3,
      imageUrl: "https://picsum.photos/seed/muenchen-viktualienmarkt/600/400",
      duration: 10,
      audioDe: "/audio/muenchen-viktualienmarkt_de.mp3",
      audioEn: "/audio/muenchen-viktualienmarkt_en.mp3",
    },
    {
      id: "muenchen-hofbrauhaus",
      name: "Hofbräuhaus",
      nameEn: "Hofbräuhaus",
      description:
        "Das Hofbräuhaus ist das weltberühmteste Bierlokal Münchens. Gegründet 1589 als herzogliche Brauerei, ist es heute ein Muss für jeden Besucher. Hier wurde 1920 die erste Parteiversammlung der NSDAP abgehalten – ein düsterer Teil der Geschichte.",
      descriptionEn:
        "The Hofbräuhaus is the world's most famous beer hall in Munich. Founded in 1589 as a ducal brewery, it's a must-visit today. In 1920, the NSDAP held its first party meeting here – a dark chapter of history.",
      lat: 48.1376,
      lng: 11.58,
      order: 4,
      imageUrl: "https://picsum.photos/seed/muenchen-hofbrauhaus/600/400",
      duration: 10,
      audioDe: "/audio/muenchen-hofbrauhaus_de.mp3",
      audioEn: "/audio/muenchen-hofbrauhaus_en.mp3",
    },
    {
      id: "muenchen-residenz",
      name: "Münchner Residenz",
      nameEn: "Munich Residence",
      description:
        "Die Residenz war von 1508 bis 1918 Sitz der bayerischen Herzöge, Kurfürsten und Könige. Der Komplex ist einer der größten Innenstadt-Paläste Europas – mit über 130 Prunkräumen, die von der Macht der Wittelsbacher zeugen.",
      descriptionEn:
        "The Residence was the seat of Bavarian dukes, prince-electors and kings from 1508 to 1918. It's one of Europe's largest city palaces – with over 130 state rooms testifying to the power of the Wittelsbach dynasty.",
      lat: 48.1413,
      lng: 11.5783,
      order: 5,
      imageUrl: "https://picsum.photos/seed/muenchen-residenz/600/400",
      duration: 12,
      audioDe: "/audio/muenchen-residenz_de.mp3",
      audioEn: "/audio/muenchen-residenz_en.mp3",
    },
    {
      id: "muenchen-odeonsplatz",
      name: "Odeonsplatz",
      nameEn: "Odeonsplatz",
      description:
        "Der Odeonsplatz ist einer der schönsten Plätze Münchens, umrahmt von der Feldherrnhalle, der Theatinerkirche und der Residenz. Hier spielte sich 1923 der gescheiterte Hitler-Putsch ab, der später von den Nazis glorifiziert wurde.",
      descriptionEn:
        "Odeonsplatz is one of Munich's most beautiful squares, framed by the Feldherrnhalle, Theatiner Church and the Residence. The failed Hitler Putsch of 1923 took place here, later glorified by the Nazis.",
      lat: 48.1427,
      lng: 11.5774,
      order: 6,
      imageUrl: "https://picsum.photos/seed/muenchen-odeonsplatz/600/400",
      duration: 10,
      audioDe: "/audio/muenchen-odeonsplatz_de.mp3",
      audioEn: "/audio/muenchen-odeonsplatz_en.mp3",
    },
    {
      id: "muenchen-englischer-garten",
      name: "Englischer Garten",
      nameEn: "English Garden",
      description:
        "Der Englische Garten ist eine der größten innerstädtischen Parkanlagen der Welt – größer als der Central Park in New York. Der Chinesische Turm, der Biergarten und die Eisbach-Welle mit ihren Surfern sind echte Münchner Institutionen.",
      descriptionEn:
        "The English Garden is one of the world's largest inner-city parks – larger than New York's Central Park. The Chinese Tower, the beer garden and the Eisbach Wave with its surfers are true Munich institutions.",
      lat: 48.1569,
      lng: 11.5914,
      order: 7,
      imageUrl: "https://picsum.photos/seed/muenchen-englischer-garten/600/400",
      duration: 12,
      audioDe: "/audio/muenchen-englischer-garten_de.mp3",
      audioEn: "/audio/muenchen-englischer-garten_en.mp3",
    },
    {
      id: "muenchen-siegestor",
      name: "Siegestor",
      nameEn: "Siegestor (Victory Gate)",
      description:
        "Das Siegestor wurde 1852 von König Ludwig I. erbaut und dem bayerischen Heer gewidmet. Nach dem Zweiten Weltkrieg wurde es wieder aufgebaut – mit der Inschrift 'Dem Sieg geweiht, vom Krieg zerstört, zum Frieden mahnend'.",
      descriptionEn:
        "The Victory Gate was built in 1852 by King Ludwig I and dedicated to the Bavarian army. Rebuilt after WWII with the inscription 'Dedicated to victory, destroyed by war, reminding us of peace'.",
      lat: 48.1521,
      lng: 11.5818,
      order: 8,
      imageUrl: "https://picsum.photos/seed/muenchen-siegestor/600/400",
      duration: 8,
      audioDe: "/audio/muenchen-siegestor_de.mp3",
      audioEn: "/audio/muenchen-siegestor_en.mp3",
    },
    {
      id: "muenchen-pinakotheken",
      name: "Pinakotheken",
      nameEn: "Pinakotheken Museums",
      description:
        "Die Pinakotheken gehören zu den bedeutendsten Kunstmuseen der Welt. Die Alte Pinakothek zeigt Meisterwerke von Dürer bis Rubens, die Neue Pinakothek Kunst des 18. und 19. Jahrhunderts. Ein Paradies für Kunstliebhaber.",
      descriptionEn:
        "The Pinakotheken rank among the world's most important art museums. The Old Pinakothek shows masterpieces from Dürer to Rubens, the New Pinakothek 18th and 19th century art. A paradise for art lovers.",
      lat: 48.1483,
      lng: 11.5706,
      order: 9,
      imageUrl: "https://picsum.photos/seed/muenchen-pinakotheken/600/400",
      duration: 12,
      audioDe: "/audio/muenchen-pinakotheken_de.mp3",
      audioEn: "/audio/muenchen-pinakotheken_en.mp3",
    },
  ],
};
