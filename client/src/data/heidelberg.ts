import { Route } from "../types";

export const heidelbergPreviewRoute: Route = {
  id: "heidelberg-preview",
  city: "Heidelberg",
  name: "Heidelberger Romantik",
  nameEn: "Heidelberg Romance",
  description:
    "Entdecke die romantische Universitätsstadt am Neckar – mit Deutschlands berühmtestem Schloss und der malerischen Altstadt.",
  descriptionEn:
    "Discover the romantic university town on the Neckar River – with Germany's most famous castle and the picturesque Old Town.",
  imageUrl: "https://picsum.photos/seed/heidelberg/800/400",
  durationMinutes: 60,
  distanceKm: 2.0,
  priceCents: 0, // free demo tour
  tags: ["schloss", "romantik", "neckar", "altstadt"],
  pois: [
    {
      id: "heidelberg-schloss",
      name: "Heidelberger Schloss",
      nameEn: "Heidelberg Castle",
      description:
        "Blick hinauf zum Heidelberger Schloss – Deutschlands berühmteste Burgruine. Hoch über der Stadt thront sie auf dem Königstuhl und erzählt von Macht und Glanz der Kurpfalz. 1764 vom Blitz getroffen, wurde sie nie wieder aufgebaut – und wurde gerade dadurch zur malerischen Ikone der Romantik. Dichter wie Goethe, Victor Hugo und Mark Twain waren von diesem Anblick zutiefst bewegt.",
      descriptionEn:
        "Look up at Heidelberg Castle – Germany's most famous castle ruin. Perched high above the city on the Königstuhl, it tells of the power and splendor of the Electoral Palatinate. Struck by lightning in 1764, it was never rebuilt – and precisely that made it the picturesque icon of Romanticism. Poets like Goethe, Victor Hugo and Mark Twain were deeply moved by this sight.",
      lat: 49.41,
      lng: 8.7156,
      order: 1,
      imageUrl: "https://picsum.photos/seed/heidelberg-schloss/600/400",
      duration: 15,
      audioDe: "/audio/heidelberg-schloss_de.mp3",
      audioEn: "/audio/heidelberg-schloss_en.mp3",
    },
    {
      id: "heidelberg-alte-bruecke",
      name: "Alte Brücke & Brückentor",
      nameEn: "Old Bridge & Bridge Gate",
      description:
        "Die Alte Brücke (Karl-Theodor-Brücke) von 1788 ist eines der schönsten Fotomotive Deutschlands. Das markante Brückentor mit den beiden Spitztürmen gehört zur mittelalterlichen Stadtbefestigung. Auf der Brücke stand einst der 'Brückenzoll' – und die berühmte Brückenaffe-Figur erinnert an das alte Sprichwort: 'Sieh dich vor, wer über die Brücke geht...' Der Blick flussaufwärts zum Schloss ist atemberaubend.",
      descriptionEn:
        "The Old Bridge (Karl Theodor Bridge) from 1788 is one of Germany's most beautiful photo motifs. The distinctive bridge gate with its two pointed towers was part of the medieval city fortifications. The famous monkey figure recalls the old proverb: 'Watch out, whoever crosses the bridge...' The view upstream to the castle is breathtaking.",
      lat: 49.414,
      lng: 8.7099,
      order: 2,
      imageUrl: "https://picsum.photos/seed/heidelberg-alte-bruecke/600/400",
      duration: 10,
      audioDe: "/audio/heidelberg-alte-bruecke_de.mp3",
      audioEn: "/audio/heidelberg-alte-bruecke_en.mp3",
    },
    {
      id: "heidelberg-marktplatz",
      name: "Marktplatz & Heiliggeistkirche",
      nameEn: "Market Square & Church of the Holy Spirit",
      description:
        "Der Marktplatz ist das Herz der Heidelberger Altstadt. Die Heiliggeistkirche, erbaut ab 1398, ist die größte gotische Kirche der Kurpfalz. Hier wurden einst die berühmten Bücher der 'Bibliotheca Palatina' aufbewahrt – heute schmücken sie den Vatikan. Der Marktbrunnen und das Rathaus aus dem 18. Jahrhundert laden zum Verweilen ein.",
      descriptionEn:
        "The Market Square is the heart of Heidelberg's Old Town. The Church of the Holy Spirit, built from 1398, is the largest Gothic church in the Electoral Palatinate. The famous books of the 'Bibliotheca Palatina' were once kept here – today they adorn the Vatican. The market fountain and the 18th-century town hall invite you to linger.",
      lat: 49.4122,
      lng: 8.7101,
      order: 3,
      imageUrl: "https://picsum.photos/seed/heidelberg-marktplatz/600/400",
      duration: 10,
      audioDe: "/audio/heidelberg-marktplatz_de.mp3",
      audioEn: "/audio/heidelberg-marktplatz_en.mp3",
    },
    {
      id: "heidelberg-philosophenweg",
      name: "Philosophenweg",
      nameEn: "Philosopher's Walk",
      description:
        "Der Philosophenweg ist der romantischste Spaziergang Heidelbergs. Hoch oben am Neckarhang gelegen, bietet er den berühmtesten Blick auf die Altstadt, das Schloss und den Neckar. Hier spazierten einst Dichter und Denker – von Eichendorff bis Max Weber. Der Name kommt nicht von ungefähr: Die Ruhe und der Ausblick laden zum Nachdenken und Träumen ein.",
      descriptionEn:
        "The Philosopher's Walk is Heidelberg's most romantic stroll. Perched high on the Neckar slope, it offers the most famous view of the Old Town, the castle and the Neckar River. Poets and thinkers once walked here – from Eichendorff to Max Weber. The name is no coincidence: the tranquility and the view invite contemplation and dreaming.",
      lat: 49.4172,
      lng: 8.7069,
      order: 4,
      imageUrl: "https://picsum.photos/seed/heidelberg-philosophenweg/600/400",
      duration: 12,
      audioDe: "/audio/heidelberg-philosophenweg_de.mp3",
      audioEn: "/audio/heidelberg-philosophenweg_en.mp3",
    },
  ],
};
