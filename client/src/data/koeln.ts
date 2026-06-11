import { Route } from "../types";

export const koelnClassicRoute: Route = {
  id: "koeln-classic",
  city: "Köln",
  name: "Kölner Dom & Altstadt",
  nameEn: "Cologne Cathedral & Old Town",
  description:
    "Vom weltberühmten Kölner Dom über die Hohenzollernbrücke durch die lebendige Altstadt – entdecken Sie 2000 Jahre Kölner Geschichte auf 3,8 km am Rhein.",
  descriptionEn:
    "From the world-famous Cologne Cathedral across the Hohenzollern Bridge through the lively Old Town – discover 2000 years of Cologne history on 3.8 km along the Rhine.",
  imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=800&q=80",
  durationMinutes: 110,
  distanceKm: 3.8,
  priceCents: 499,
  tags: ["dom", "rhein", "geschichte", "kultur"],
  pois: [
    {
      id: "koeln-dom",
      name: "Kölner Dom",
      nameEn: "Cologne Cathedral",
      description:
        "Blick hinauf zum Kölner Dom – dem Meisterwerk der gotischen Baukunst und UNESCO-Weltkulturerbe. 157 Meter ragen die Türme in den Himmel, die höchsten Kirchtürme der Welt. 632 Jahre lang wurde gebaut, bis 1880 die Vollendung gefeiert wurde. Seine 10.000 Quadratmeter Glasfenster erzählen biblische Geschichten – und die Reliquie der Heiligen Drei Könige macht ihn zu einem der bedeutendsten Pilgerorte Europas.",
      descriptionEn:
        "Look up at Cologne Cathedral – a masterpiece of Gothic architecture and UNESCO World Heritage. The 157-meter towers are the tallest church towers in the world. Built over 632 years until completion in 1880. Its 10,000 square meters of stained glass windows tell biblical stories – and the relic of the Three Kings makes it one of Europe's most important pilgrimage sites.",
      lat: 50.9413,
      lng: 6.958,
      order: 1,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 15,
      audioDe: "/audio/koeln-dom_de.mp3",
      audioEn: "/audio/koeln-dom_en.mp3",
    },
    {
      id: "koeln-hohenzollernbruecke",
      name: "Hohenzollernbrücke & Liebesschlösser",
      nameEn: "Hohenzollern Bridge & Love Locks",
      description:
        "Stell dich auf die Hohenzollernbrücke – eine der meistbefahrenen Eisenbahnbrücken Europas. Über 1.000 Züge donnern täglich über den Rhein. Unter deinen Füßen glitzern Zehntausende Liebesschlösser, die Paare aus aller Welt hier als Symbol ihrer Liebe angebracht haben. Ein glitzerndes Meer aus Hoffnungen und Versprechen direkt neben den Domtürmen.",
      descriptionEn:
        "Stand on the Hohenzollern Bridge – one of Europe's busiest railway bridges. Over 1,000 trains thunder across the Rhine daily. Beneath you, tens of thousands of love locks glitter – couples from all over the world attached them as symbols of their love. A sparkling sea of hopes and promises right next to the cathedral towers.",
      lat: 50.942,
      lng: 6.964,
      order: 2,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 10,
      audioDe: "/audio/koeln-hohenzollernbruecke_de.mp3",
      audioEn: "/audio/koeln-hohenzollernbruecke_en.mp3",
    },
    {
      id: "koeln-rathaus",
      name: "Historisches Rathaus",
      nameEn: "Historic City Hall",
      description:
        "Das Kölner Rathaus ist das älteste Rathaus Deutschlands – der Rat tagt hier seit mindestens 1135. Der gotische Turm aus dem 15. Jahrhundert zeigt 124 figürliche Konsolen, die Persönlichkeiten der Stadtgeschichte darstellen. Der Rathausplatz war im Mittelalter Schauplatz von Markt- und Gerichtstagen – und heute von fröhlichem Karnevalstrubel.",
      descriptionEn:
        "Cologne's City Hall is Germany's oldest – the council has been meeting here since at least 1135. The Gothic tower from the 15th century features 124 figurative corbels depicting figures from the city's history. The town hall square was once a venue for markets and court days – and today for lively carnival festivities.",
      lat: 50.9377,
      lng: 6.9595,
      order: 3,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 8,
      audioDe: "/audio/koeln-rathaus_de.mp3",
      audioEn: "/audio/koeln-rathaus_en.mp3",
    },
    {
      id: "koeln-alter-markt",
      name: "Alter Markt & Heinzelmännchenbrunnen",
      nameEn: "Old Market & Heinzelmännchen Fountain",
      description:
        "Der Alte Markt ist das Herz der Kölner Altstadt. Hier steht der Heinzelmännchenbrunnen – er erinnert an die berühmte Kölner Sage: Die Heinzelmännchen waren kleine Heinzelwichte, die nachts die Arbeit der Kölner Handwerker erledigten. Bis eine neugierige Schneiderin Erbsen streute, um sie zu sehen – und sie verschwanden für immer. 'Arbeit' macht man heute selbst in den urigen Brauhäusern rund um den Platz!",
      descriptionEn:
        "The Old Market is the heart of Cologne's Old Town. The Heinzelmännchen Fountain commemorates the famous Cologne legend: little house elves who did the craftsmen's work at night – until a curious tailor's wife scattered peas to see them, and they vanished forever. 'Work' is now done yourself in the rustic breweries around the square!",
      lat: 50.9372,
      lng: 6.9575,
      order: 4,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 10,
      audioDe: "/audio/koeln-alter-markt_de.mp3",
      audioEn: "/audio/koeln-alter-markt_en.mp3",
    },
    {
      id: "koeln-gross-st-martin",
      name: "Groß St. Martin",
      nameEn: "Great St. Martin Church",
      description:
        "Groß St. Martin – die mächtige romanische Basilika mit ihrer markanten Kleeblattform. 1260 geweiht, prägt der viergliedrige Turm die Silhouette der Altstadt. Unter der Kirche liegen römische Fundamente aus dem 1. Jahrhundert. Im Zweiten Weltkrieg schwer getroffen, wurde sie liebevoll wieder aufgebaut – ein Symbol für Kölns Überlebenswillen.",
      descriptionEn:
        "Great St. Martin – the mighty Romanesque basilica with its distinctive cloverleaf shape. Consecrated in 1260, the four-part tower shapes the Old Town skyline. Roman foundations from the 1st century lie beneath the church. Heavily damaged in WWII, it was lovingly rebuilt – a symbol of Cologne's will to survive.",
      lat: 50.9345,
      lng: 6.9589,
      order: 5,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 8,
      audioDe: "/audio/koeln-gross-st-martin_de.mp3",
      audioEn: "/audio/koeln-gross-st-martin_en.mp3",
    },
    {
      id: "koeln-fischmarkt",
      name: "Fischmarkt & Rheinuferpromenade",
      nameEn: "Fish Market & Rhine Promenade",
      description:
        "Der Fischmarkt ist einer der malerischsten Plätze Kölns. Die bunten Giebelhäuser spiegeln sich im Wasser – ein Postkartenmotiv par excellence. Hier wurde früher Fisch gehandelt, heute genießen Kölner und Touristen den Blick auf den Rhein und die Kranhäuser am anderen Ufer. Setz dich auf die Rheintreppe und genieß das größte 'Wohnzimmer' der Stadt.",
      descriptionEn:
        "The Fish Market is one of Cologne's most picturesque squares. Colorful gabled houses reflect in the water – a postcard-perfect scene. Fish was once traded here; today locals and tourists enjoy the view of the Rhine and the crane houses on the opposite bank. Sit on the Rhine steps and enjoy the city's largest 'living room'.",
      lat: 50.9328,
      lng: 6.9575,
      order: 6,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 10,
      audioDe: "/audio/koeln-fischmarkt_de.mp3",
      audioEn: "/audio/koeln-fischmarkt_en.mp3",
    },
    {
      id: "koeln-schildergasse",
      name: "Schildergasse & Neumarkt",
      nameEn: "Schildergasse & Neumarkt",
      description:
        "Die Schildergasse ist eine der meistbesuchten Einkaufsstraßen Europas – hier pulsiert das Leben! Von Luxusmarken bis zu großen Kaufhäusern findest du alles. Der angrenzende Neumarkt war im Mittelalter ein wichtiger Handelsplatz vor den Toren der Stadt. Ein perfekter Ort, um das moderne Köln zwischen historischen Mauern zu erleben.",
      descriptionEn:
        "Schildergasse is one of Europe's busiest shopping streets – life pulsates here! From luxury brands to large department stores, you'll find everything. The adjacent Neumarkt was an important trading post in the Middle Ages at the city gates. A perfect place to experience modern Cologne between historic walls.",
      lat: 50.9353,
      lng: 6.947,
      order: 7,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 8,
      audioDe: "/audio/koeln-schildergasse_de.mp3",
      audioEn: "/audio/koeln-schildergasse_en.mp3",
    },
    {
      id: "koeln-philharmonie",
      name: "Kölner Philharmonie & Museum Ludwig",
      nameEn: "Cologne Philharmonie & Museum Ludwig",
      description:
        "Zwischen Dom und Rhein liegt das Kulturzentrum Kölns. Die Kölner Philharmonie ist einer der akustisch besten Konzertsäle der Welt – ihr Zeltdach ist unverkennbar. Direkt daneben beherbergt das Museum Ludwig eine der bedeutendsten Pop-Art-Sammlungen Europas, mit Werken von Warhol, Lichtenstein und Picasso.",
      descriptionEn:
        "Between the cathedral and the Rhine lies Cologne's cultural center. The Cologne Philharmonie is one of the world's acoustically best concert halls – its tent roof is unmistakable. Right next door, the Museum Ludwig houses one of Europe's most important Pop Art collections, with works by Warhol, Lichtenstein and Picasso.",
      lat: 50.9403,
      lng: 6.9596,
      order: 8,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 10,
      audioDe: "/audio/koeln-philharmonie_de.mp3",
      audioEn: "/audio/koeln-philharmonie_en.mp3",
    },
    {
      id: "koeln-rheinauhafen",
      name: "Rheinauhafen & Kranhäuser",
      nameEn: "Rheinauhafen & Crane Houses",
      description:
        "Der Rheinauhafen ist das moderne Köln am Wasser. Drei markante Kranhäuser ragen wie rote Riesen in den Himmel – architektonische Hingucker, die an die alten Hafenkräne erinnern. Hier treffen sich Schickeria und Kulturschaffende in schicken Restaurants und Galerien. Das Schokoladenmuseum direkt am Wasser ist eine süße Versuchung für alle Sinne.",
      descriptionEn:
        "The Rheinauhafen is modern Cologne on the water. Three striking crane houses rise like red giants into the sky – architectural eye-catchers reminiscent of old harbor cranes. The chic crowd and artists meet in stylish restaurants and galleries. The Chocolate Museum right on the water is a sweet temptation for all senses.",
      lat: 50.9227,
      lng: 6.9667,
      order: 9,
      imageUrl: "https://images.unsplash.com/photo-1567154972527-d5d7f88a1d0f?w=600&q=80",
      duration: 12,
      audioDe: "/audio/koeln-rheinauhafen_de.mp3",
      audioEn: "/audio/koeln-rheinauhafen_en.mp3",
    },
  ],
};

