import { Route } from "../types";

export const hamburgHafen: Route = {
  id: "hamburg-hafen",
  city: "Hamburg",
  name: "Hamburger Hafen & Geschichte",
  nameEn: "Hamburg Harbor & History",
  description:
    "Vom Rathaus durch die Speicherstadt zum Hafen – Deutschlands Tor zur Welt. Erleben Sie 3,5 km hanseatische Geschichte und moderne Architektur.",
  descriptionEn:
    "From City Hall through the Speicherstadt to the harbor – Germany's Gateway to the World. Experience 3.5 km of Hanseatic history and modern architecture.",
  imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  durationMinutes: 100,
  distanceKm: 3.5,
  priceCents: 499,
  tags: ["hafen", "architektur", "geschichte"],
  pois: [
    {
      id: "hamburg-rathaus",
      name: "Hamburger Rathaus",
      nameEn: "Hamburg City Hall",
      description:
        "Das Hamburger Rathaus ist ein prächtiger Neorenaissance-Bau von 1897. Mit 647 Räumen ist es größer als der Buckingham Palace. Der Rathausmarkt mit dem Bismarck-Denkmal ist das politische Zentrum der Hansestadt.",
      descriptionEn:
        "Hamburg City Hall is a magnificent Neo-Renaissance building from 1897. With 647 rooms, it's larger than Buckingham Palace. The Rathausmarkt with the Bismarck monument is the political center of the Hanseatic city.",
      lat: 53.5503,
      lng: 9.9929,
      order: 1,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 10,
      audioDe: "/audio/hamburg-rathaus_de.mp3",
      audioEn: "/audio/hamburg-rathaus_en.mp3",
    },
    {
      id: "hamburg-kleine-alster",
      name: "Kleine Alster",
      nameEn: "Kleine Alster (Small Alster)",
      description:
        "Die Kleine Alster ist das Herz der Hamburger Innenstadt. Hier treffen sich Jung und Alt an den Alsterarkaden – den romantischen Bogengängen im italienischen Stil. Die Alster-Schwäne sind ein Symbol der Stadt.",
      descriptionEn:
        "The Kleine Alster is the heart of downtown Hamburg. People gather at the Alster Arcades – romantic arched walkways in Italian style. The Alster swans are a symbol of the city.",
      lat: 53.5512,
      lng: 9.9916,
      order: 2,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 8,
      audioDe: "/audio/hamburg-kleine-alster_de.mp3",
      audioEn: "/audio/hamburg-kleine-alster_en.mp3",
    },
    {
      id: "hamburg-speicherstadt",
      name: "Speicherstadt",
      nameEn: "Speicherstadt (Warehouse District)",
      description:
        "Willkommen in der groessten Lagerhausanlage der Welt! 26 Hektar rote Backsteinbauten auf Eichenpfaehlen - UNESCO-Weltkulturerbe seit 2015. Hier lagerte einst Kaffee, Tee und Gewuerze aus aller Welt. Zwischen den Kanaelen fuehlst du dich wie in einer anderen Zeit.",
      descriptionEn:
        "The Speicherstadt is the world's largest coherent warehouse complex. A UNESCO World Heritage site since 2015, it spans 26 hectares with red brick buildings on oak piles – the heart of Hamburg's port since 1888.",
      lat: 53.5447,
      lng: 9.9915,
      order: 3,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 12,
      audioDe: "/audio/hamburg-speicherstadt_de.mp3",
      audioEn: "/audio/hamburg-speicherstadt_en.mp3",
    },
    {
      id: "hamburg-elbphilharmonie",
      name: "Elbphilharmonie",
      nameEn: "Elbphilharmonie",
      description:
        "Die Elbphilharmonie ist das neue Wahrzeichen Hamburgs. Der 110 Meter hohe Glaskristall auf dem alten Kaispeicher A beherbergt einen der besten Konzertsäle der Welt. Der Plaza-Besuch in 37 Metern Höhe ist kostenlos.",
      descriptionEn:
        "The Elbphilharmonie is Hamburg's new landmark. The 110-meter glass crystal atop the old Kaispeicher A houses one of the world's best concert halls. The Plaza visit at 37 meters is free.",
      lat: 53.5413,
      lng: 9.9843,
      order: 4,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 12,
      audioDe: "/audio/hamburg-elbphilharmonie_de.mp3",
      audioEn: "/audio/hamburg-elbphilharmonie_en.mp3",
    },
    {
      id: "hamburg-landungsbruecken",
      name: "Landungsbrücken",
      nameEn: "Landungsbrücken (Landing Stages)",
      description:
        "Die Landungsbrücken sind das maritime Herz Hamburgs. Seit 1910 legen hier die Hafenrundfahrtschiffe und Fähren ab. Von hier haben Sie den besten Blick auf den Hafen, die Elbphilharmonie und die vorbeiziehenden Containerschiffe.",
      descriptionEn:
        "The Landungsbrücken are Hamburg's maritime heart. Since 1910, harbor tour boats and ferries depart from here. You get the best view of the harbor, the Elbphilharmonie, and passing container ships.",
      lat: 53.5457,
      lng: 9.9696,
      order: 5,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 10,
      audioDe: "/audio/hamburg-landungsbruecken_de.mp3",
      audioEn: "/audio/hamburg-landungsbruecken_en.mp3",
    },
    {
      id: "hamburg-alter-elbtunnel",
      name: "Alter Elbtunnel",
      nameEn: "Old Elbe Tunnel",
      description:
        "Der Alte Elbtunnel (St. Pauli Elbtunnel) von 1911 ist ein technisches Meisterwerk. 426 Meter lang verbindet er auf 24 Metern Tiefe die Landungsbrücken mit der anderen Elbseite. Die originalen Aufzüge befördern Autos und Fußgänger.",
      descriptionEn:
        "The Old Elbe Tunnel (St. Pauli Elbtunnel) from 1911 is an engineering masterpiece. 426 meters long at 24 meters depth, it connects the Landungsbrücken to the other side of the Elbe. The original elevators carry cars and pedestrians.",
      lat: 53.546,
      lng: 9.9668,
      order: 6,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 10,
      audioDe: "/audio/hamburg-alter-elbtunnel_de.mp3",
      audioEn: "/audio/hamburg-alter-elbtunnel_en.mp3",
    },
    {
      id: "hamburg-fischmarkt",
      name: "Fischmarkt & St. Pauli",
      nameEn: "Fish Market & St. Pauli",
      description:
        "Der Fischmarkt ist seit 1703 ein Hamburger Kulturgut. Jeden Sonntagmorgen ab 5 Uhr wird hier lauthals gefeilscht – 'Fischkopp'-Kultur pur. In der benachbarten Großen Freiheit liegen berühmte Musikclubs wie der Kaiserkeller, wo die Beatles spielten.",
      descriptionEn:
        "The Fish Market has been a Hamburg cultural institution since 1703. Every Sunday from 5 AM, loud haggling takes place – pure 'Fischkopp' culture. Nearby Große Freiheit hosts famous music clubs like the Kaiserkeller where the Beatles played.",
      lat: 53.5453,
      lng: 9.9562,
      order: 7,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 10,
      audioDe: "/audio/hamburg-fischmarkt_de.mp3",
      audioEn: "/audio/hamburg-fischmarkt_en.mp3",
    },
    {
      id: "hamburg-planten-blomen",
      name: "Planten un Blomen",
      nameEn: "Planten un Blomen Park",
      description:
        "Planten un Blomen (Plattdeutsch für 'Pflanzen und Blumen') ist ein 47 Hektar großer Park im Herzen Hamburgs. Der japanische Teegarten, die großen Gewächshäuser und die Wasserspiele mit Lichtershows im Sommer sind einzigartig.",
      descriptionEn:
        "Planten un Blomen ('Plants and Flowers' in Low German) is a 47-hectare park in the heart of Hamburg. The Japanese tea garden, large greenhouses and water-light shows in summer are unique.",
      lat: 53.5605,
      lng: 9.9826,
      order: 8,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 10,
      audioDe: "/audio/hamburg-planten-blomen_de.mp3",
      audioEn: "/audio/hamburg-planten-blomen_en.mp3",
    },
    {
      id: "hamburg-hafencity",
      name: "HafenCity",
      nameEn: "HafenCity",
      description:
        "Die HafenCity ist Europas größtes innerstädtisches Stadtentwicklungsprojekt. Auf 157 Hektar entsteht ein komplett neuer Stadtteil mit modernster Architektur. Die Überseequartier und die Marco-Polo-Terrassen sind das neue Gesicht Hamburgs.",
      descriptionEn:
        "HafenCity is Europe's largest inner-city urban development project. A completely new district with cutting-edge architecture is being built on 157 hectares. The Überseequartier and Marco Polo Terraces are Hamburg's new face.",
      lat: 53.5415,
      lng: 9.998,
      order: 9,
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
      duration: 10,
      audioDe: "/audio/hamburg-hafencity_de.mp3",
      audioEn: "/audio/hamburg-hafencity_en.mp3",
    },
  ],
};



